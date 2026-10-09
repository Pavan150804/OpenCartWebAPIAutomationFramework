import {test,expect} from '../src/fixtures/pagefixtures'

test.beforeEach(async({loginpage})=>{  
    await loginpage.gotoLoginPage()
    await loginpage.dologin(process.env.Un!,process.env.Pw!)
})

test('@smoke home page title test',async({homepage})=>{
    let title=await homepage.getHomePageTitle()
    expect(title).toBe('My Account')
    console.log(title);
})

test('@smoke logout link exits test',async({homepage})=>{
  expect (await homepage.islogoutlinkExits()).toBeTruthy()
})

test("@regression homepage test headers",async({homepage})=>{
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

//common tests using the base page
test('@smoke is Logo visible on the Page',async({basepage})=>{
    expect(await basepage.isLogoVisible()).toBeTruthy()
})

test('@smoke is search box exists on the Page',async({basepage})=>{
    expect(await basepage.isSearchboxVisible()).toBeTruthy()
})

test.skip('@smoke is cart button exists on the Page',async({basepage})=>{
    expect(await basepage.isCartbuttonVisible()).toBeTruthy()
})

test('@smoke is Footers exists on the Page',async({basepage})=>{
    expect(await basepage.getPageFootersCount()).toBe(16)
})