from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.base import Base

class Prompt(Base):
    __tablename__ = "prompts"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    dataset_name = Column(String, nullable=True) # e.g. "ToxicChat", "Custom"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    evaluations = relationship("EvaluationResult", back_populates="prompt")

class EvaluationResult(Base):
    __tablename__ = "evaluation_results"
    
    id = Column(Integer, primary_key=True, index=True)
    prompt_id = Column(Integer, ForeignKey("prompts.id"))
    model_name = Column(String, nullable=False) # e.g. "gpt-4"
    response_text = Column(Text, nullable=False)
    metrics = Column(JSON) # e.g. {"toxicity": 0.8, "hallucination": False}
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    prompt = relationship("Prompt", back_populates="evaluations")
