from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Any
from app.db.session import get_db
from app.models.prompt import EvaluationResult
from pydantic import BaseModel
from datetime import datetime

class EvaluationListResponse(BaseModel):
    id: int
    prompt_id: int | None
    model_name: str
    response_text: str
    metrics: Any
    created_at: datetime

    class Config:
        from_attributes = True

router = APIRouter()

@router.get("/", response_model=List[EvaluationListResponse])
async def read_evaluations(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(EvaluationResult)
        .order_by(EvaluationResult.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()
