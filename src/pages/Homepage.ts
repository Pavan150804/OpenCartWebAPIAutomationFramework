import { Locator,Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class HomePage extends Basepage{

    private readonly logoutlink:Locator;
    private readonly headers:Locator;
    private readonly searchfield:Locator;
    private readonly searchbutton:Locator;


    constructor(page:Page){
         super(page)

         this.logoutlink=page.getByRole('link', { name: 'Logout' })
         this.headers=page.getByRole('heading', {  level: 2 })
         this.searchfield=page.getByRole('textbox', { name: 'Search' })
         this.searchbutton=page.locator('#search button')

    }

    async islogoutlinkExits():Promise<boolean>{
        return await this.logoutlink.isVisible()
    }

    async getHomePageHeaders():Promise<string[]>{
        return await this.headers.allInnerTexts()
    }

    async getHomePageTitle():Promise<string>{
        return await this.page.title()
    }

    async doSearch(searchkey:string){
        console.log("Search Key",searchkey);
        await this.searchfield.fill(searchkey);
        await this.searchbutton.click()
    }
}