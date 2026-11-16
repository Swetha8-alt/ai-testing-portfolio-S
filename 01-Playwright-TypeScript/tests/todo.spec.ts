
import { test, expect } from '@playwright/test';

import { TodoPage } from '../pages/TodoPage';

import { todoData } from '../test-Data/todoData';

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {

  todoPage = new TodoPage(page);

  await todoPage.navigateToApplication();

});


// ==========================================
// AC01 & AC02 - ADD TODO ITEMS
// ==========================================

test('TC001 - Add a new todo item', async () => {

  await todoPage.addTodo(todoData.singleTodo);

  await todoPage.verifyTodoVisible(todoData.singleTodo);

  await todoPage.verifyTodoCount(1);

});

test('TC002 - Add multiple todo items', async () => {

  await todoPage.addMultipleTodos(todoData.multipleTodos);

  for (const todo of todoData.multipleTodos) {

    await todoPage.verifyTodoVisible(todo);
  }

  await todoPage.verifyTodoCount(3);

});


test('TC003 - Add todos with different text lengths', async () => {

  await todoPage.addTodo(todoData.shortTodo);

  await todoPage.addTodo(todoData.longTodo);

  await todoPage.verifyTodoVisible(todoData.shortTodo);

  await todoPage.verifyTodoVisible(todoData.longTodo);

  await todoPage.verifyTodoCount(2);

});


test('TC004 - Add todo with special characters and numbers', async () => {

  await todoPage.addTodo(todoData.specialCharacterTodo);

  await todoPage.verifyTodoVisible(todoData.specialCharacterTodo);

});

test('TC005 - Add duplicate todo descriptions', async () => {

  await todoPage.addMultipleTodos(todoData.duplicateTodos);

  await todoPage.verifyTodoCount(3);

  await expect(
    todoPage.getTodo('API Testing')
  ).toHaveCount(2);

  await todoPage.verifyTodoVisible('UI Testing');

});


// ==========================================
// AC03 & AC04 - TODO STATUS MANAGEMENT
// ==========================================

test('TC007 - Mark an active todo as completed', async () => {

  const todo = todoData.completionTodos[0];

  await todoPage.addTodo(todo);

  await todoPage.markTodoCompleted(todo);

  await todoPage.verifyCompleted(todo);

});


test('TC008 - Mark multiple todos as completed', async () => {

  await todoPage.addMultipleTodos(todoData.completionTodos);

  await todoPage.markTodoCompleted(
    todoData.completionTodos[0]
  );

  await todoPage.markTodoCompleted(
    todoData.completionTodos[1]
  );

  await todoPage.verifyCompleted(
    todoData.completionTodos[0]
  );

  await todoPage.verifyCompleted(
    todoData.completionTodos[1]
  );

  await todoPage.verifyActive(
    todoData.completionTodos[2]
  );

});


test('TC009 - Mark a completed todo as active', async () => {

  const todo = todoData.completionTodos[1];

  await todoPage.addTodo(todo);

  await todoPage.markTodoCompleted(todo);

  await todoPage.markTodoActive(todo);

  await todoPage.verifyActive(todo);

});


test('TC010 - Toggle todo status multiple times', async () => {

  const todo = todoData.completionTodos[2];

  await todoPage.addTodo(todo);

  await todoPage.markTodoCompleted(todo);

  await todoPage.verifyCompleted(todo);

  await todoPage.markTodoActive(todo);

  await todoPage.verifyActive(todo);

  await todoPage.markTodoCompleted(todo);

  await todoPage.verifyCompleted(todo);

});


// ==========================================
// AC05 - DELETE TODO
// ==========================================

test('TC012 - Delete a single todo item', async () => {

  await todoPage.addMultipleTodos(
    todoData.deletionTodos
  );

  await todoPage.deleteTodo(
    todoData.deletionTodos[0]
  );

  await todoPage.verifyTodoNotVisible(
    todoData.deletionTodos[0]
  );

  await todoPage.verifyTodoVisible(
    todoData.deletionTodos[1]
  );

  await todoPage.verifyTodoCount(1);

});


test('TC013 - Delete a completed todo item', async () => {

  const todo = 'Verify Payment Module';

  await todoPage.addTodo(todo);

  await todoPage.markTodoCompleted(todo);

  await todoPage.deleteTodo(todo);

  await todoPage.verifyTodoNotVisible(todo);

  await todoPage.verifyTodoCount(0);

});


// ==========================================
// AC06 - ACTIVE FILTER
// ==========================================

test('TC015 - Active filter with mixed todo statuses', async () => {

  await todoPage.addMultipleTodos(todoData.filterTodos);

  await todoPage.markTodoCompleted(
    todoData.filterTodos[0]
  );

  await todoPage.markTodoCompleted(
    todoData.filterTodos[1]
  );

  await todoPage.selectActiveFilter();

  await todoPage.verifyTodoVisible(
    todoData.filterTodos[2]
  );

  await todoPage.verifyTodoNotVisible(
    todoData.filterTodos[0]
  );

  await todoPage.verifyTodoNotVisible(
    todoData.filterTodos[1]
  );

  await todoPage.verifyTodoCount(1);

});


test('TC016 - Active filter with all active todos', async () => {

  await todoPage.addMultipleTodos(todoData.filterTodos);

  await todoPage.selectActiveFilter();

  await todoPage.verifyTodoCount(3);

});


// ==========================================
// AC07 - COMPLETED FILTER
// ==========================================

test('TC017 - Completed filter with mixed statuses', async () => {

  await todoPage.addMultipleTodos(todoData.filterTodos);

  await todoPage.markTodoCompleted(
    todoData.filterTodos[0]
  );

  await todoPage.markTodoCompleted(
    todoData.filterTodos[1]
  );

  await todoPage.selectCompletedFilter();

  await todoPage.verifyTodoVisible(
    todoData.filterTodos[0]
  );

  await todoPage.verifyTodoVisible(
    todoData.filterTodos[1]
  );

  await todoPage.verifyTodoNotVisible(
    todoData.filterTodos[2]
  );

  await todoPage.verifyTodoCount(2);

});


test('TC018 - Completed filter with all completed todos', async () => {

  await todoPage.addMultipleTodos(todoData.filterTodos);

  for (const todo of todoData.filterTodos) {

    await todoPage.markTodoCompleted(todo);
  }

  await todoPage.selectCompletedFilter();

  await todoPage.verifyTodoCount(3);

});


test('TC019 - Switch between Active and Completed filters', async () => {

  await todoPage.addMultipleTodos(todoData.filterTodos);

  await todoPage.markTodoCompleted(
    todoData.filterTodos[0]
  );

  await todoPage.selectActiveFilter();

  await todoPage.verifyTodoCount(2);

  await todoPage.selectCompletedFilter();

  await todoPage.verifyTodoCount(1);

});


// ==========================================
// AC08 - CLEAR COMPLETED
// ==========================================

test('TC020 - Clear one completed todo', async () => {

  await todoPage.addTodo('Active Todo');

  await todoPage.addTodo('Completed Todo');

  await todoPage.markTodoCompleted('Completed Todo');

  await todoPage.clearCompleted();

  await todoPage.verifyTodoVisible('Active Todo');

  await todoPage.verifyTodoNotVisible('Completed Todo');

  await todoPage.verifyTodoCount(1);

});


test('TC021 - Clear multiple completed todos', async () => {

  await todoPage.addMultipleTodos(
    todoData.clearCompletedTodos
  );

  await todoPage.markTodoCompleted('Test Case 1');

  await todoPage.markTodoCompleted('Test Case 2');

  await todoPage.markTodoCompleted('Test Case 3');

  await todoPage.clearCompleted();

  await todoPage.verifyTodoCount(2);

  await todoPage.verifyTodoVisible('Test Case 4');

  await todoPage.verifyTodoVisible('Test Case 5');

});


test('TC022 - Clear completed when all todos are completed', async () => {

  const todos = todoData.filterTodos;

  await todoPage.addMultipleTodos(todos);

  for (const todo of todos) {

    await todoPage.markTodoCompleted(todo);
  }

  await todoPage.clearCompleted();

  await todoPage.verifyTodoCount(0);

});


// ==========================================
// REGRESSION TESTING
// ==========================================

test('TC024 - Verify operations after deleting a todo', async () => {

  await todoPage.addMultipleTodos(todoData.filterTodos);

  await todoPage.deleteTodo(todoData.filterTodos[1]);

  await todoPage.markTodoCompleted(
    todoData.filterTodos[0]
  );

  await todoPage.selectActiveFilter();

  await todoPage.verifyTodoCount(1);

  await todoPage.verifyTodoVisible(
    todoData.filterTodos[2]
  );

  await todoPage.selectCompletedFilter();

  await todoPage.verifyTodoCount(1);

  await todoPage.verifyTodoVisible(
    todoData.filterTodos[0]
  );

});


test('TC025 - Verify all major todo operations together', async () => {

  const todos = todoData.filterTodos;

  await todoPage.addMultipleTodos(todos);

  // Complete first and second todos

  await todoPage.markTodoCompleted(todos[0]);

  await todoPage.markTodoCompleted(todos[1]);

  // Mark first todo active again

  await todoPage.markTodoActive(todos[0]);

  // Delete third todo

  await todoPage.deleteTodo(todos[2]);

  // Verify active item

  await todoPage.selectActiveFilter();

  await todoPage.verifyTodoCount(1);

  await todoPage.verifyTodoVisible(todos[0]);

  // Verify completed item

  await todoPage.selectCompletedFilter();

  await todoPage.verifyTodoCount(1);

  await todoPage.verifyTodoVisible(todos[1]);

  // Clear completed

  await todoPage.clearCompleted();

  await todoPage.verifyTodoCount(0);

});

