import {test,expect} from '@playwright/test'
import { Loginpage } from '../src/pages/Loginpage'
import { HomePage } from '../src/pages/Homepage'

let loginpage:Loginpage;
let homepage:HomePage;

test.beforeEach(async({page})=>{
    loginpage=new Loginpage(page)
    await loginpage.gotoLoginPage()
    await loginpage.dologin('kk@gmail.com','1234')
    homepage=new HomePage(page)
})

test.skip('home page title test',async()=>{
    let title=await homepage.getHomePageTitle()
    expect(title).toBe('My Account')
    console.log(title);
})

test.skip('logout link exits test',async()=>{
  expect (await homepage.islogoutlinkExits()).toBeTruthy()
})

test.skip("homepage test headers",async()=>{
    let allheaders=await homepage.getHomePageHeaders()
    console.log(allheaders);
    expect.soft(allheaders).toHaveLength(4)
    expect.soft(allheaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
})