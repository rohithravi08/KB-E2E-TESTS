import { expect, Page } from "@playwright/test"

export class HelperBase{
    readonly page:Page

    constructor(page: Page){
        this.page = page
    }

    async verifyURL(url:string) {
        const currentUrl=this.page.url() 
        expect(currentUrl).toContain(url)
    }

}