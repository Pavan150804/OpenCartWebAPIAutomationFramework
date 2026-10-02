
import { meta,log,testData } from "reporting-labs";
import {test,expect} from "../src/fixtures/pagefixtures"
import { CSVHelper } from "../src/utils/Csvhelper";
import { ExcelHelper } from "../src/utils/Excelhelper";
import { JsonHelper } from "../src/utils/Jsonhelper";

test.beforeEach(async({loginpage})=>{
        await loginpage.gotoLoginPage()
})

test("login page title test",async({loginpage})=>{
    meta({priority:'P1',severity:"minor",feature:"f1",owner:"pavan" ,story:"us1",issue:'bug1'})
    let title=await loginpage.getTitle()
    console.log('title:',title);
    await  log('title: ',title)
    console.log( await loginpage.getLoginPageDetails());
    expect(await loginpage.getLoginPageDetails()).toBe('Account Login')
})

test("forgot pwd link exists test",async({loginpage})=>{
    meta({priority:'P2',severity:"critical",feature:"f3",owner:"Kumar" ,story:"us3"})
    expect(await loginpage.isforgotPwdexists()).toBeTruthy()
})

test("is user able to login",async({loginpage,homepage})=>{
    meta({priority:'P2',severity:"major",feature:"f2",owner:"Kumar" ,story:"us2"})
    await testData({username:process.env.Un!,password:process.env.Pw!},"Login data")
    await loginpage.dologin(process.env.Un!,process.env.Pw!)
    expect.soft(await homepage.islogoutlinkExits()).toBeTruthy()
    expect.soft(await homepage.getHomePageTitle()).toBe("My Account")
    console.log(process.env);
})

//Data Driven 1 -CSV
let testdata=CSVHelper.readcsv('src/testdata/logindata.csv')
for(let row of testdata){
    test(`Login with invalid credentials using csv ${row.username}-${row.password}`,async({loginpage})=>{
       await testData(testdata,"Invalid credentials")
      await loginpage.dologin(row.username!,row.password!)
      expect(await loginpage.invalidLoginErrorMessage()).toBeTruthy()
   })
}

//Data Driven 2 -xlsx
let testdataExcel=ExcelHelper.readExcel('src/testdata/logindata.xlsx','Sheet1')
for(let row of testdataExcel){
    test(`Login with invalid credentials using Excel ${row.username}-${row.password}`,async({loginpage})=>{
        await testData(testdataExcel,"Invalid credentials")
      await loginpage.dologin(row.username!,row.password!)
      expect(await loginpage.invalidLoginErrorMessage()).toBeTruthy()
   })
}

//Data Driven 3-JSON
let testdataJson=JsonHelper.readJSON('src/testdata/logindata.json')
for(let row of testdataJson){
    test(`Login with invalid credentials using Json ${row.username}-${row.password}`,async({loginpage})=>{
        await testData(testdataJson,"Invalid credentials")
      await loginpage.dologin(row.username!,row.password!)
      expect(await loginpage.invalidLoginErrorMessage()).toBeTruthy()
   })
}


//ALuure Decorations

import * as allure from "allure-js-commons";
import { Basepage } from "../src/pages/Basepage";
test("user is able to login to app test", async ({ loginpage, homepage }) => {

    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description(
        "Verify user can login with valid credentials"
    );

    await allure.step("Go to login page", async () => {
        await loginpage.gotoLoginPage();
    });

    await allure.step("Login with valid creds", async () => {
        await loginpage.dologin(process.env.Un!,process.env.Pw!);
    });

    await allure.step("Verify logout link is visible", async () => {
        expect( await homepage.islogoutlinkExits()).toBeTruthy();
    });

});

//common tests using base page

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