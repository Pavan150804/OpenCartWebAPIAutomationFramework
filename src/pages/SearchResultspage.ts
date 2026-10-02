import { Locator,Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class SearchResultsPage extends Basepage{

    private readonly searchresults:Locator;
    constructor(page:Page){
         super(page)
       this.searchresults=page.locator('div.product-layout')
    }

    async getProductsSearchResultCount():Promise<number>{
        return this.searchresults.count()
    }

    async selectProduct(productname:string){
        console.log("Product Name : ",productname);
       await this.page.getByRole('link', { name: productname,exact:true }).first().click()
    }

}