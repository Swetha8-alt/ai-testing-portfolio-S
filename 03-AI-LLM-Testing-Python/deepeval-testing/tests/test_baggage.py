import json
from pathlib import Path

import pytest

from deepeval import assert_test  
from deepeval.test_case import LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.models import OllamaModel  

from src.airline_chatbot import ask_airline_chatbot



test_data_path = Path(__file__).resolve().parents[1] / "data" / "baggage_test_data.json"
with test_data_path.open("r", encoding="utf-8") as file:
    test_data = json.load(file)


# Configure Ollama evaluation model
judge_model = OllamaModel(
    model="llama3.2:latest",
    base_url="http://localhost:11434",
    temperature=0
)


@pytest.mark.parametrize("test_case_data", test_data)
def test_baggage_policy(test_case_data, record_property):

    question = test_case_data["question"]
    expected_answer = test_case_data["expected_answer"]

    actual_answer = ask_airline_chatbot(question)
    record_property("Question", question)
    record_property("Expected answer", expected_answer)
    record_property("Model answer", actual_answer)

    normalized_answer = actual_answer.casefold()
    for alternatives in test_case_data["required_fact_groups"]:
        assert any(
            fact in normalized_answer
            for fact in alternatives
        ), f"Answer is missing a required policy fact: {alternatives}"

    test_case = LLMTestCase(
        input=question,
        actual_output=actual_answer,
        expected_output=expected_answer
    )

    relevancy_metric = AnswerRelevancyMetric(
        threshold=0.7,
        model=judge_model
    )

    assert_test(test_case, [relevancy_metric])