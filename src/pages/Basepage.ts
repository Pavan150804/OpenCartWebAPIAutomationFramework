import {Locator, Page } from "@playwright/test";

export class Basepage{

    
    protected readonly page:Page;

    //common Locators across all the pages
    protected readonly logo:Locator;
    protected readonly searchBox:Locator;
    protected readonly searchIcon:Locator;
    protected readonly footerLinks:Locator;
    protected readonly currency:Locator;
    protected readonly cartButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.logo=page.getByRole('img', { name: 'naveenopencart' })
        this.searchBox=page.getByRole('textbox', { name: 'Search' })
        this.searchIcon=page.locator('div#search button')
        this.footerLinks=page.locator('footer a')
        this.currency=page.locator('#form-currency')
        this.cartButton=page.locator('#cart button')
    }

    //page actions

    async isLogoVisible():Promise<boolean>{
        return await this.logo.isVisible()
    }

    async isSearchboxVisible():Promise<boolean>{
        return await this.searchBox.isVisible()
    }

    async isSearchiconVisible():Promise<boolean>{
        return await this.searchIcon.isVisible()
    }

    async isCurrencyVisible():Promise<boolean>{
        return await this.currency.isVisible()
    }

    async isCartbuttonVisible():Promise<boolean>{
        return await this.cartButton.isVisible()
    }

    async getPageFootersCount():Promise<Number>{
        return await this.footerLinks.count()
    }

    async getPageFooterNames():Promise<string[]>{
        return await this.footerLinks.allInnerTexts()
    }

    //page level generic actions

   async getTitle():Promise<string>{
      return await this.page.title()
   }

   getCurrentUrl():string{
      return this.page.url()
   }

   async waitForPage(){
      return await this.page.waitForLoadState('load')
   }

   async takeScreenshot(name:string){
      return await this.page.screenshot({
         fullPage:true,
         path:`reports/screenshots/${name}`
      })
   }
}