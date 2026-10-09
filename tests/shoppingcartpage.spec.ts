import {test,expect} from '../src/fixtures/pagefixtures'

test.beforeEach(async({loginpage})=>{  
    await loginpage.gotoLoginPage()
    await loginpage.dologin(process.env.Un!,process.env.Pw!)
})

test('@regression Verify title test',async({homepage,searchresultspage,productinfopage,shoppingcartpage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    expect(await productinfopage.getProductheader()).toBe('MacBook Pro')
    await productinfopage.addingToCart('1')
    expect(await shoppingcartpage.verifyTitle()).toBe("Shopping Cart")
})


test.skip('@regression Verify Product Quantity',async({homepage,searchresultspage,productinfopage,shoppingcartpage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    expect(await productinfopage.getProductheader()).toBe('MacBook Pro')
    await productinfopage.addingToCart('1')
    expect(await shoppingcartpage.verifyproductQuantity()).toBe("1")
})


//common Features
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