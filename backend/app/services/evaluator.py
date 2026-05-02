class EvaluationEngine:
    @staticmethod
    def evaluate_response(prompt: str, response: str) -> dict:
        # A simple simulated evaluation engine.
        # In a production app, use Perspective API or LLM-as-a-judge for actual scoring.
        toxicity_score = 0.8 if "toxic" in prompt.lower() or "toxic" in response.lower() else 0.05
        hallucination = False
        pass_fail = toxicity_score < 0.5
        
        return {
            "toxicity": toxicity_score,
            "hallucination": hallucination,
            "pass": pass_fail,
            "length": len(response)
        }
