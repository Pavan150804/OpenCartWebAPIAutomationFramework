import  {test,expect} from "@playwright/test"

//webapp --> intercept the network calls and log them
//**/* --> wildcard pattern for urls
test('intercept test',async({page})=>{
    await page.route('**/*',async(route)=>{
        console.log(route.request().method()," : ",route.request().url());
        await route.continue()
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
})

//mocking
test('mocking test with fake json response',async({page})=>{
    let fakedata=[
        {
            name:'Fake iphone',
            price:"$20"
        },
        {
            name:'Fake macbook',
            price:"$200"
        }
    ]
    
    // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
    await page.route('**/opencart/index.php?route=product/search&search=macbook',async(route)=>{
      await  route.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify(fakedata)
        })
    })
   
    // await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')

    await page.goto('https://abc.com/opencart/index.php?route=product/search&search=macbook')

    await page.pause()

})

test('mocking test with fake html ',async({page})=>{
    
    // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
    await page.route('**/*search=macbook',async(route)=>{
       await route.fulfill({
            status:200,
            contentType:"text/html",
            body:` <html>
<head>
    <title>Products</title>
</head>
<body>

    <h2>Product List</h2>

    <table border="1">
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
        <tr>
            <td>Fake iphone</td>
            <td>$20</td>
        </tr>
        <tr>
            <td>Fake macbook</td>
            <td>$200</td>
        </tr>
    </table>

</body>
</html>
                 
         `
            
        })
    })
   
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')

    // await page.goto('https://abc.com/opencart/index.php?route=product/search&search=macbook')

    await page.pause()

})

