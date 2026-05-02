from openai import AsyncOpenAI
from app.core.config import settings

class LLMService:
    def __init__(self):
        self.openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

    async def generate_response(self, prompt: str, model_name: str = "gpt-4o-mini") -> str:
        if self.openai_client and "gpt" in model_name.lower():
            response = await self.openai_client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=1024
            )
            return response.choices[0].message.content or "Empty Response"
        
        # Fallback simulated response
        return f"[Simulated Output for {model_name}] Response to: {prompt}"

llm_service = LLMService()
