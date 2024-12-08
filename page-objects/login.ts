import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase";


export class loginPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    // Function to login with username and password from environment variables
    async loginTrello() {
        // Get the username and password from environment variables
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        // Check if the environment variables are provided
        if (!username || !password) {
            throw new Error('Username and password must be provided as environment variables.');
        }
        
        await this.page.waitForSelector('[data-testid="username"]');

        //Fill the login form with username and password
        await this.page.fill('[data-testid="username"]', username);
        
        await this.page.locator(`button:has(span:has-text("Continue"))`).isVisible();
        await this.page.locator(`button:has(span:has-text("Continue"))`).click();
        await this.page.fill('[data-testid="password"]', password);
        await this.page.locator(`button#login-submit:has(span:has-text("Log in"))`).click();

        // Wait for a successful login
        (await this.page.waitForSelector('a[aria-label="Back to home"]'));
    }


}