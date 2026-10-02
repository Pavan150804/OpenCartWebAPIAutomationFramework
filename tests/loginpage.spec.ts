import {test,expect} from '@playwright/test'
import { Loginpage } from '../src/pages/Loginpage'
import { HomePage } from '../src/pages/Homepage';

let loginpage:Loginpage;
let homepage:HomePage;

test.beforeEach(async({page})=>{
     loginpage=new Loginpage(page)
    await loginpage.gotoLoginPage()
    homepage=new HomePage(page)
})

test.skip("login page title test",async()=>{
    console.log( await loginpage.getLoginPageDetails());
    expect(await loginpage.getLoginPageDetails()).toBe('Account Login')
})

test.skip("forgot pwd link exists test",async()=>{
    expect(await loginpage.isforgotPwdexists()).toBeTruthy()
})

test.skip("is user able to login",async()=>{
    await loginpage.dologin("kk@gmail.com","1234")
    expect.soft(await homepage.islogoutlinkExits()).toBeTruthy()
    expect.soft(await homepage.getHomePageTitle()).toBe("My Account")
})