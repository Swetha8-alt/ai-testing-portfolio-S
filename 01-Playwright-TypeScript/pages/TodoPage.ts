
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {

  readonly page: Page;

  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {

    this.page = page;

    this.todoInput =
      page.getByPlaceholder('What needs to be done?');

    this.todoItems =
      page.locator('.todo-list li');

    this.activeFilter =
      page.getByRole('link', { name: 'Active' });

    this.completedFilter =
      page.getByRole('link', { name: 'Completed' });

    this.clearCompletedButton =
      page.getByRole('button', { name: 'Clear completed' });
  }

  async navigateToApplication() {

    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addTodo(todo: string) {

    await this.todoInput.fill(todo);

    await this.todoInput.press('Enter');
  }

  async addMultipleTodos(todos: string[]) {

    for (const todo of todos) {

      await this.addTodo(todo);
    }
  }

  getTodo(todo: string): Locator {

    return this.todoItems.filter({
      has: this.page.getByText(todo, { exact: true })
    });
  }

  async markTodoCompleted(todo: string) {

    await this.getTodo(todo)
      .locator('.toggle')
      .check();
  }

  async markTodoActive(todo: string) {

    await this.getTodo(todo)
      .locator('.toggle')
      .uncheck();
  }

  async deleteTodo(todo: string) {

    const todoItem = this.getTodo(todo);

    await todoItem.hover();

    await todoItem.locator('.destroy').click();
  }

  async selectActiveFilter() {

    await this.activeFilter.click();
  }

  async selectCompletedFilter() {

    await this.completedFilter.click();
  }

  async clearCompleted() {

    await this.clearCompletedButton.click();
  }

  async verifyTodoVisible(todo: string) {

    await expect(this.getTodo(todo)).toBeVisible();
  }

  async verifyTodoNotVisible(todo: string) {

    await expect(this.getTodo(todo)).toHaveCount(0);
  }

  async verifyTodoCount(count: number) {

    await expect(this.todoItems).toHaveCount(count);
  }

  async verifyCompleted(todo: string) {

    await expect(this.getTodo(todo))
      .toHaveClass(/completed/);
  }

  async verifyActive(todo: string) {

    await expect(this.getTodo(todo))
      .not.toHaveClass(/completed/);
  }

}
