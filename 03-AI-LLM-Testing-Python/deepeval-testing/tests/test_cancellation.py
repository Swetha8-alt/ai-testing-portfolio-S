
import json
import pytest

from deepeval import assert_test
from deepeval.test_case import LLMTestCase, LLMTestCaseParams
from deepeval.metrics import GEval, AnswerRelevancyMetric
from deepeval.models import OllamaModel

from src.airlinecancel_chatbot import ask_airlinecancel_chatbot


# Read test data
with open(
    "data/cancellation_test_data.json",
    "r",
    encoding="utf-8"
) as file:
    test_data = json.load(file)


# Configure Ollama judge
judge_model = OllamaModel(
    model="llama3.2:latest",
    base_url="http://localhost:11434",
    temperature=0
)


# Metric 1: Answer Relevancy
relevancy_metric = AnswerRelevancyMetric(
    threshold=0.7,
    model=judge_model
)


# Metric 2: Cancellation Policy Correctness
correctness_metric = GEval(
    name="Cancellation Policy Correctness",

    criteria="""
    Evaluate whether the chatbot response correctly
    follows the expected airline cancellation policy.

    Check:
    1. Cancellation fee must be accurate.
    2. Refund timeline must be accurate.
    3. Non-refundable tickets must not promise a full refund.
    4. The chatbot must not invent policy information.
    5. Unavailable information must be acknowledged.

    Penalize incorrect or unsupported answers.
    """,

    evaluation_params=[
        LLMTestCaseParams.INPUT,
        LLMTestCaseParams.ACTUAL_OUTPUT,
        LLMTestCaseParams.EXPECTED_OUTPUT
    ],

    threshold=0.7,
    model=judge_model
)


# Execute test cases
@pytest.mark.parametrize("data", test_data)
def test_cancellation_policy(data):

    question = data["question"]
    expected_answer = data["expected_answer"]

    # Get chatbot response
    actual_answer = ask_airlinecancel_chatbot(question)

    print("\nTest ID:", data["id"])
    print("Question:", question)
    print("Expected:", expected_answer)
    print("Actual:", actual_answer)

    # Create DeepEval test case
    test_case = LLMTestCase(
        input=question,
        actual_output=actual_answer,
        expected_output=expected_answer
    )

    # Run evaluation
    assert_test(
        test_case,
        [
            relevancy_metric,
            correctness_metric
        ]
    )
