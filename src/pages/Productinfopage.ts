import { Locator,Page } from "@playwright/test";
import { Basepage } from "./Basepage";


export class Productinfopage extends Basepage{

    //1.Private Locators
    private readonly heading:Locator;
    private readonly images:Locator;
    private readonly Productmetadata:Locator;
    private readonly ProductPricing:Locator;
    private productinfomap:Map<string,string | number>
    private readonly addquantity:Locator;
    private readonly addToCart:Locator
    private readonly switchshoppingcart:Locator
   
    //2.Constructor
    constructor(page:Page){
        super(page)
       this.heading=page.getByRole('heading', { name: 'MacBook Pro', level: 1 })
       this.images=page.locator('div#content  li img')
       this.Productmetadata=page.locator("div#content ul.list-unstyled:nth-of-type(1) li")
       this.ProductPricing=page.locator("div#content ul.list-unstyled:nth-of-type(2) li")
       this.productinfomap=new Map<string,string | number >()
       this.addquantity=page.getByRole('textbox', { name: 'Qty' })
       this.addToCart=page.getByRole('button', { name: 'Add to Cart' })
       this.switchshoppingcart=page.getByRole('link', { name: 'shopping cart' })
    }

    //3.actions

    async getProductheader():Promise<string>{
        return await this.heading.innerText()
    }

    async getImagesCount(){
        await this.images.first().waitFor({state:'visible'})
        return await this.images.count()
    }
    
    async getProductInfo(){
        this.productinfomap.set("Product header",await this.getProductheader())
        this.productinfomap.set("Product Images count",await this.getImagesCount())
        await this.getProductMetaData()
        await this.getProductPricingData()
        return this.productinfomap;
    }

    //  Brand: Apple
    //  Product Code: Product 18
    //  Reward Points: 800
    //  Availability: Out Of Stock
    private  async getProductMetaData(){
        let allmetadata=await this.Productmetadata.allInnerTexts()
        for(let ele of allmetadata){
           let meta= ele.split(":")
          let metakey= meta[0]!.trim()
          let metavalue= meta[1]!.trim()
          this.productinfomap.set(metakey,metavalue)
        }
    }


    // $2,000.00
    // Ex Tax: $2,000.00
     private async getProductPricingData(){
        let allmetadata=await this.ProductPricing.allInnerTexts()
        let productprice=allmetadata[0]!.trim()
        let tax=allmetadata[1]!.split(":")[1]!.trim()
        this.productinfomap.set('Price:',productprice)
        this.productinfomap.set('tax:',tax)
    }

    async addingToCart(num:string){
        await this.addquantity.fill(num)
        await this.addToCart.click()
        await this.switchshoppingcart.click()
    }
}