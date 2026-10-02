import { Locator,Page } from "@playwright/test";
import { Basepage } from "./Basepage";


export class Shoppingcartpage extends Basepage{

    //1.Private Locators 
    private readonly Productquantity:Locator;

   
    //2.Constructor
    constructor(page:Page){
        super(page)
       this.Productquantity=page.locator("div#content td input")
    }

    async verifyTitle(){
        return await this.page.title()
    }

    async verifyproductQuantity(){
        return await this.Productquantity.inputValue()
    }

}