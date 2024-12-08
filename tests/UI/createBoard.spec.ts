import { test, expect } from '@playwright/test';
import { loginPage } from '../../page-objects/login';
import { homePage } from '../../page-objects/home';
import { environment } from '../../playwright.config';

test.beforeEach(async ({ page }) => {
  await page.goto(`${environment.baseUrl}`+`/login`);
})

test.describe('Trello Board', () => {
  test('Board creation and close flow @regression @smoke @ui', async ({ page }) => {
    const login = new loginPage(page)
    const home = new homePage(page)
    await login.loginTrello();
    await home.clickCreateMenu();
    await home.createBoard("board");
    await home.closeBoard()
  }
  );
});
