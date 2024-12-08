import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase";
import { environment } from '../playwright.config';
import { APIRequestContext } from '@playwright/test';

export class homePage extends HelperBase {
    private boardName: string;
    private id: number;
    constructor(page: Page) {
        super(page)
    }

    async clickCreateMenu() {
        await this.page.locator('[data-testid="header-create-menu-button"]').click()
    }

    async createBoard(title: string) {
        const randomSuffix = Math.floor(Math.random() * 10000)
        this.boardName = `${title}-${randomSuffix}`
        //console.log(`Creating board with title: ${this.boardName}`)
        await this.page.locator('[data-testid="header-create-board-button"]').click()
        await this.page.locator('[data-testid="create-board-title-input"]').isVisible()
        await this.page.locator('[data-testid="create-board-title-input"]').fill(this.boardName)
        await this.page.locator('[data-testid="create-board-submit-button"]').click()
        const response = await this.page.waitForResponse('**/boards')
        expect(response.status()).toBe(200);
        const responseBody = await response.json()
        this.id=responseBody.id
        expect(responseBody.name).toBe(this.boardName)
        const currentUrl = this.page.url()
        expect(currentUrl).toContain(this.boardName)
    }

    async closeBoard() {
        // Extract cookies from the current page context
        const cookies = await this.page.context().cookies();
        // Filter trello cookies
        const trelloCookies = cookies.filter(cookie => cookie.domain === 'trello.com');
        // save dsc value cookie 
        const dscCookie = trelloCookies.find(cookie => cookie.name === 'dsc');
        const request: APIRequestContext = await this.page.context().request;
        const response = await request.put(`${environment.baseUrl}/1/boards/${this.id}`, {
            data:{
                closed: true,
                dsc: dscCookie?.value
            }
        });
        expect(response.status()).toBe(200)
        const ResponseBody = await response.json();
        expect(ResponseBody.closed).toBe(true)

    }

}
