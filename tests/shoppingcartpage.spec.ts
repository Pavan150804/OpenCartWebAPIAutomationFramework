import {test,expect} from '../src/fixtures/pagefixtures'

test.beforeEach(async({loginpage})=>{  
    await loginpage.gotoLoginPage()
    await loginpage.dologin(process.env.Un!,process.env.Pw!)
})

test('Verify title test',async({homepage,searchresultspage,productinfopage,shoppingcartpage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    expect(await productinfopage.getProductheader()).toBe('MacBook Pro')
    await productinfopage.addingToCart('1')
    expect(await shoppingcartpage.verifyTitle()).toBe("Shopping Cart")
})


test('Verify Product Quantity',async({homepage,searchresultspage,productinfopage,shoppingcartpage})=>{
    await homepage.doSearch('macbook')
    await searchresultspage.selectProduct('MacBook Pro')
    expect(await productinfopage.getProductheader()).toBe('MacBook Pro')
    await productinfopage.addingToCart('1')
    expect(await shoppingcartpage.verifyproductQuantity()).toBe("1")
})
