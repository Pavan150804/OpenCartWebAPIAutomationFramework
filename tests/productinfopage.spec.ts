import {test,expect} from '../src/fixtures/pagefixtures'

test.beforeEach(async({loginpage})=>{  
    await loginpage.gotoLoginPage()
    await loginpage.dologin(process.env.Un!,process.env.Pw!)
})


test('Verify Product Header',async({homepage,searchresultspage,productinfopage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    expect(await productinfopage.getProductheader()).toBe('MacBook Pro')
})

test('Verify Product Images Count',async({homepage,searchresultspage,productinfopage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    expect(await productinfopage.getImagesCount()).toBe(4);
})

test('Verify Product Info',async({homepage,searchresultspage,productinfopage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    let info=await productinfopage.getProductInfo()
    console.log("Actual details: ",info);
   expect.soft(info.get("Product header")).toBe('MacBook Pro')
   expect.soft(info.get("Product Images count")).toBe(4)
   expect.soft(info.get('Brand')).toBe("Apple")
   expect.soft(info.get('Product Code')).toBe("Product 18")
   expect.soft(info.get('Reward Points')).toBe("800")
   expect.soft(info.get('Availability')).toBe("Out Of Stock")
   expect.soft(info.get('Price:')).toBe("$2,000.00")
   expect.soft(info.get('tax:')).toBe("$2,000.00")
})

test("Adding to cart",async({homepage,searchresultspage,productinfopage,page})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    await productinfopage.addingToCart("2")
    await page.pause()
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