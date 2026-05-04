from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LLM Evaluation Dashboard"
    # Using SQLite for local dev
    DATABASE_URL: str = "sqlite+aiosqlite:///./llm_eval.db"
    OPENAI_API_KEY: str | None = None
    ANTHROPIC_API_KEY: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
