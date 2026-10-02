import { Locator,Page } from "@playwright/test";
import { Basepage } from "./Basepage";


export class Loginpage extends Basepage{

    //1.Private Locators
    private readonly email:Locator;
    private readonly password:Locator;
    private readonly login:Locator;
    private readonly forgottenPassword:Locator;
    private readonly invalidloginerrormessage:Locator;
   
    //2.Constructor
    constructor(page:Page){
        super(page)
       this.email=page.getByRole('textbox', { name: 'E-Mail Address' })
       this.password=page.getByRole('textbox', { name: 'Password' })
       this.login=page.getByRole('button', { name: 'Login' })
       this.forgottenPassword=page.getByRole('link', { name: 'Forgotten Password' }).first()
       this.invalidloginerrormessage=page.locator('.alert.alert-danger.alert-dismissible')
    }

    //3.public page actions(Methods)
    async gotoLoginPage():Promise<void>{
        await this.page.goto("/opencart/index.php?route=account/login")
    }

    async getLoginPageDetails():Promise<string>{
        return await this.page.title()
    }

    async isforgotPwdexists():Promise<boolean>{
         return await this.forgottenPassword.isVisible()
    }

    async dologin(username:string,pwd:string){
        console.log("User credentials",username,pwd);
         await this.email.fill(username)
         await this.password.fill(pwd)
         await this.login.click()
    }

    async invalidLoginErrorMessage(){
        return await this.invalidloginerrormessage.isVisible()
    }
}   
