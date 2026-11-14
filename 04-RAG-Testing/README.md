# RAG Pipeline Testing

## Project Overview
This project demonstrates testing of Retrieval-Augmented Generation (RAG) architecture.

The application retrieves relevant legal documents from a knowledge base and generates responses using an LLM.

## RAG Architecture
1. User submits a query.
2. Query embedding is generated.
3. Vector database searches relevant documents.
4. Retrieved documents are passed to the LLM.
5. LLM generates a contextual response.
6. Response is displayed to the user.

## Technologies
- Python
- LangChain
- OpenAI / Azure OpenAI
- Vector Database
- Embeddings
- Playwright
- Pytest

## Test Scenarios
1. Validate document ingestion.
2. Verify document chunking.
3. Validate embedding generation.
4. Verify vector similarity search.
5. Validate retrieval accuracy.
6. Verify context relevance.
7. Validate answer grounding.
8. Test missing document scenarios.
9. Validate source citations.
10. Test retrieval performance.

## Key Metrics
- Retrieval Precision
- Retrieval Recall
- Faithfulness
- Answer Relevance
- Context Relevance
- End-to-End Latency

## Expected Deliverables
- RAG test scripts
- Retrieval evaluation reports
- Grounding validation reports
- Test datasets
- Performance results
