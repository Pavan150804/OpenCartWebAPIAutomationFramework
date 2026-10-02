import {test as basetest} from "@playwright/test"
import { Basepage } from "../pages/Basepage"
import { Loginpage } from "../pages/Loginpage"
import { HomePage } from "../pages/Homepage"
import { SearchResultsPage } from "../pages/SearchResultspage"
import { Productinfopage } from "../pages/Productinfopage"
import { Shoppingcartpage } from "../pages/Shoppingcartpage"

    type pagefixtures={
        basepage:Basepage,
        loginpage:Loginpage,
        homepage:HomePage
        searchresultspage:SearchResultsPage;
        productinfopage:Productinfopage;
        shoppingcartpage:Shoppingcartpage
    }

export let test=basetest.extend<pagefixtures>({

   basepage:async({page},use) => {
       let basePage=new Basepage(page)
       await use(basePage)
    },

    loginpage:async({page},use) => {
       let loginPage=new Loginpage(page)
       await use(loginPage)
    },

    homepage:async({page},use) => { 
       let homePage=new HomePage(page)
       await use(homePage)
    },

     searchresultspage:async({page},use) => {
       let searchresultspage=new SearchResultsPage(page)
       await use(searchresultspage)
    },

     productinfopage:async({page},use) => {
       let productinfopage=new Productinfopage(page)
       await use(productinfopage)
    },

      shoppingcartpage:async({page},use) => {
       let shoppingcartpage=new Shoppingcartpage(page)
       await use(shoppingcartpage)
    }

})

export {expect} from "@playwright/test"