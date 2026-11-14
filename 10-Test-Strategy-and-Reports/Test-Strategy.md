# Test Strategy – TodoMVC Application

## 1. Introduction

This document defines the testing strategy for the TodoMVC web application.

Application URL: https://demo.playwright.dev/todomvc/

The application supports creating, editing, completing, deleting and filtering todo items.

## 2. Testing Approach

We will follow a risk-based testing approach.

### Functional Testing
Validate all business functionalities:
- Create todo
- Edit todo
- Delete todo
- Complete todo
- Clear completed todos
- Filter todos

### UI Testing
- Verify application heading.
- Verify todo input field.
- Verify todo list visibility.
- Verify action buttons.
- Verify filter links.
- Verify item counter.

### Boundary Testing
- Single todo item.
- Multiple todo items.
- Long todo descriptions.
- Leading and trailing spaces.
- Empty input.
- Whitespace-only input.

### Regression Testing
- Add and delete multiple todos.
- Complete and uncomplete todos.
- Filter after completing todos.
- Refresh after adding todos.
- Clear completed todos and verify active items remain.

## 3. Test Design Techniques

- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- State Transition Testing
- Exploratory Testing

## 4. Test Execution Strategy

| Testing Phase | Activity |
|---|---|
| Phase 1 | Requirement analysis |
| Phase 2 | Test scenario identification |
| Phase 3 | Test case preparation |
| Phase 4 | Manual execution |
| Phase 5 | Defect identification |
| Phase 6 | Automation development |
| Phase 7 | Regression execution |
| Phase 8 | Test reporting |

## 5. Priority Classification

### High
Critical functionality such as adding, completing and deleting todos.

### Medium
Editing, filtering and persistence functionality.

### Low
UI alignment, visual presentation and minor usability improvements.

## 6. Automation Strategy

Playwright with TypeScript will be used to automate:
- Smoke testing
- Functional testing
- Regression testing
- UI validation
- Cross-browser testing

## 7. Reporting

Execution results will be documented with:
- Total test cases
- Passed test cases
- Failed test cases
- Blocked test cases
- Defects identified
- Automation execution status

## 8. Conclusion

The objective is to ensure that the TodoMVC application behaves correctly across its core functionalities and supported browser environments.
