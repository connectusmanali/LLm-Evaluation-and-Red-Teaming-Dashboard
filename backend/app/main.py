from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine
from contextlib import asynccontextmanager
from app.models import Base
from app.api import prompts, red_team, evaluations, auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables (for dev, normally use alembic)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="LLM Evaluation & Red-Teaming Dashboard API",
    lifespan=lifespan
)

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(prompts.router, prefix="/api/prompts", tags=["prompts"])
app.include_router(red_team.router, prefix="/api/red-team", tags=["red-team"])
app.include_router(evaluations.router, prefix="/api/evaluations", tags=["evaluations"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
