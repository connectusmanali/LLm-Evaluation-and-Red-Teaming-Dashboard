from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.session import get_db, AsyncSessionLocal
from app.models.prompt import Prompt, EvaluationResult
from app.services.llm_client import llm_service
from app.services.evaluator import EvaluationEngine
from pydantic import BaseModel

class PromptCreate(BaseModel):
    content: str
    dataset_name: str | None = None

class PromptResponse(BaseModel):
    id: int
    content: str
    dataset_name: str | None

    class Config:
        from_attributes = True

router = APIRouter()

@router.post("/", response_model=PromptResponse)
async def create_prompt(prompt: PromptCreate, db: AsyncSession = Depends(get_db)):
    db_prompt = Prompt(content=prompt.content, dataset_name=prompt.dataset_name)
    db.add(db_prompt)
    await db.commit()
    await db.refresh(db_prompt)
    return db_prompt

@router.get("/", response_model=List[PromptResponse])
async def read_prompts(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Prompt).offset(skip).limit(limit))
    prompts = result.scalars().all()
    return prompts

class EvaluateRequest(BaseModel):
    model_name: str = "gpt-4o-mini"

@router.post("/{prompt_id}/evaluate")
async def evaluate_prompt(prompt_id: int, req: EvaluateRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Prompt).where(Prompt.id == prompt_id))
    db_prompt = result.scalars().first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
        
    response_text = await llm_service.generate_response(db_prompt.content, req.model_name)
    metrics = EvaluationEngine.evaluate_response(db_prompt.content, response_text)
    
    eval_result = EvaluationResult(
        prompt_id=db_prompt.id,
        model_name=req.model_name,
        response_text=response_text,
        metrics=metrics
    )
    db.add(eval_result)
    await db.commit()
    await db.refresh(eval_result)
    
    return {
        "id": eval_result.id,
        "metrics": eval_result.metrics,
        "response_text": eval_result.response_text,
        "model": eval_result.model_name
    }

class BatchEvaluateRequest(BaseModel):
    prompts: List[str]
    model_name: str = "gpt-4o-mini"
    dataset_name: str = "Batch"

async def background_batch_eval(prompt_list: List[str], model_name: str, dataset_name: str):
    async with AsyncSessionLocal() as db:
        for p in prompt_list:
            db_prompt = Prompt(content=p, dataset_name=dataset_name)
            db.add(db_prompt)
            await db.commit()
            await db.refresh(db_prompt)
            
            response_text = await llm_service.generate_response(db_prompt.content, model_name)
            metrics = EvaluationEngine.evaluate_response(db_prompt.content, response_text)
            
            eval_result = EvaluationResult(
                prompt_id=db_prompt.id,
                model_name=model_name,
                response_text=response_text,
                metrics=metrics
            )
            db.add(eval_result)
            await db.commit()

@router.post("/batch")
async def batch_evaluate(req: BatchEvaluateRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(background_batch_eval, req.prompts, req.model_name, req.dataset_name)
    return {"status": "Batch processing started in background...", "count": len(req.prompts)}
