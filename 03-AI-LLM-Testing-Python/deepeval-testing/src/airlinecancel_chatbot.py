
import requests
from pathlib import Path

from deepeval.models import OllamaModel


# Configure Ollama judge
judge_model = OllamaModel(
    model="llama3.2:latest",
    base_url="http://localhost:11434",
    temperature=0
)


cancellation_policy_path = (
    Path(__file__).resolve().parents[1] / "data" / "cancellation_policy.txt"
)
cancellation_policy = cancellation_policy_path.read_text(encoding="utf-8")


# Chatbot function
def ask_airlinecancel_chatbot(question):

    system_prompt = f"""
    You are a SkyFly airline customer support chatbot.

    Answer customer questions using only the following airline policy.
    Use a stated rule whenever it answers the question. Do not ask for a
    ticket number or other details unless the policy requires them.

    AIRLINE POLICY:
    {cancellation_policy}

    Instructions:
    - Answer the exact question directly and concisely.
    - Do not invent information.
    - If the policy does not provide the answer, say:
      "The available airline policy does not provide this information."
    """

    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "llama3.2:latest",
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            "stream": False,
            "options": {
                "temperature": 0
            }
        },
        timeout=120
    )

    response.raise_for_status()

    actual_answer = response.json()["message"]["content"]

    return actual_answer
