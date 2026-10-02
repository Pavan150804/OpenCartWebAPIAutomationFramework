import {test,expect} from '../src/fixtures/pagefixtures'
import { CSVHelper } from '../src/utils/Csvhelper'

test.beforeEach(async({loginpage})=>{  
    await loginpage.gotoLoginPage()
    await loginpage.dologin(process.env.Un!,process.env.Pw!)
})

let productdata=CSVHelper.readcsv('src/testdata/productdata.csv')
for (let row of productdata){
test(`Verify Search -${row.searchkey}`,async({homepage,searchresultspage})=>{
     await homepage.doSearch(row.searchkey!)
     let resultscount= await searchresultspage.getProductsSearchResultCount()
     console.log(resultscount);
     expect(resultscount).toBe(Number(row.count))
 })
}

for(let row of productdata){
test(`Verify user is able to land on Prodcut Page ${row.searchkey}`,async({homepage,searchresultspage,page})=>{
     await homepage.doSearch(row.searchkey!)
     await searchresultspage.selectProduct(row.productname!)
     expect(await page.title()).toBe(row.productname)
})
}

//common tests using the base page
test('is Logo visible on the Page',async({basepage})=>{
    expect(await basepage.isLogoVisible()).toBeTruthy()
})

test('is search box exists on the Page',async({basepage})=>{
    expect(await basepage.isSearchboxVisible()).toBeTruthy()
})

test('is cart button exists on the Page',async({basepage})=>{
    expect(await basepage.isCartbuttonVisible()).toBeTruthy()
})

test('is Footers exists on the Page',async({basepage})=>{
    expect(await basepage.getPageFootersCount()).toBe(16)
})