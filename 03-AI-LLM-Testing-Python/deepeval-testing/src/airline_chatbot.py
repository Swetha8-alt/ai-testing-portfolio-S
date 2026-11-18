import requests

POLICY = """
SkyFly Airline Baggage Policy:

Domestic check-in baggage: 15 kg.
International check-in baggage: 23 kg.
Cabin baggage: 7 kg.
Personal item: One small laptop bag.
Extra baggage: Rs. 500 per additional kg.
Dangerous goods: Not permitted.
Spare lithium batteries: Not permitted in checked baggage; cabin baggage only.
Sports equipment: Subject to additional charges.
Lost baggage: Report at airport baggage desk.
"""


def ask_airline_chatbot(question):

    url = "http://localhost:11434/api/chat"

    payload = {
        "model": "llama3.2:latest",
        "messages": [
            {
                "role": "system",
                "content": f"""
                You are a SkyFly airline customer support chatbot.

                Answer using only this policy:

                {POLICY}

                Answer the exact question directly. For baggage restrictions,
                explicitly say whether the item is allowed in checked baggage.
                For spare lithium batteries, state both that they are not
                permitted in checked baggage and are allowed in cabin baggage only.
                Do not invent information.
                If the policy does not contain the answer,
                clearly say that the information is unavailable.
                """
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
    }

    response = requests.post(
        url,
        json=payload,
        timeout=180
    )

    response.raise_for_status()

    result = response.json()

    return result["message"]["content"]
