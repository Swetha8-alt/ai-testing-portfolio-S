# AI and LLM Testing – Airline Policy Assistant

## 1. Project Overview

This project demonstrates how to test an AI-powered Airline Policy Assistant.

The assistant answers passenger questions using airline policy information.

**Example questions:**
- What is the cabin baggage allowance?
- Can I cancel my flight?
- What is the refund policy?
- Can I change my flight date?
- What is the excess baggage charge?

## 2. Objective

Validate whether the AI assistant provides:

- Correct answers based on airline policies.
- Relevant answers to passenger questions.
- Accurate information without making up policies.
- Clear answers for unclear or incomplete questions.

## 3. Tools Used

| Tool | Purpose |
|---|---|
| Promptfoo | Prompt and response testing |
| DeepEval | LLM response evaluation |
| Python | DeepEval test automation |
| TypeScript | Playwright automation |
| GitHub | Source code management |

## 4. Sample Airline Policy

For this practice project, use the following sample policy:

| Policy | Rule |
|---|---|
| Cabin baggage | 7 kg |
| Check-in baggage | 15 kg |
| Flight cancellation | Cancellation charges may apply |


*These are fictional sample rules for testing, not actual airline policies.*

## 5. Sample Test Scenarios

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| LLM_001 | Ask cabin baggage allowance | Assistant should answer 7 kg |
| LLM_002 | Ask check-in baggage allowance | Assistant should answer 15 kg |
| LLM_003 | Ask cancellation policy | Assistant should mention cancellation charges may apply |
| LLM_004 | Ask refund policy | Assistant should explain that refund depends on ticket type |
| LLM_005 | Ask flight change policy | Assistant should mention availability |
| LLM_006 | Ask about an unknown policy | Assistant should not invent an answer |
| LLM_007 | Ask an unrelated question | Assistant should respond appropriately |
| LLM_008 | Ask the same question differently | Assistant should provide a consistent answer |

## 6. Types of AI Testing

### Prompt Testing – Promptfoo
- Validate different user prompts.
- Check whether responses follow the expected policy.
- Identify incorrect or irrelevant responses.

### LLM Evaluation – DeepEval
- Answer Relevancy: Is the answer relevant to the question?
- Faithfulness: Is the answer supported by the policy?
- Hallucination: Does the assistant invent information?

## 7. Execution

### Promptfoo
```bash
npx promptfoo eval
```

### DeepEval
```bash
deepeval test run tests/
```

## 8. Expected Outcome

- Identify incorrect AI responses.
- Detect hallucinated policy information.
- Validate answer relevance and faithfulness.
- Generate test execution results.
- Improve the reliability of the Airline Policy Assistant.

## 9. Learning Outcome

Hands-on practice in AI testing, prompt testing, LLM evaluation, hallucination detection, and Python-based test automation.