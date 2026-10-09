import {test,expect} from "@playwright/test"

let email=process.env.WEB_API_EMAIL!;
let password=process.env.WEB_API_PASSWORD!
let accesstoken:string;

test.beforeAll('To create the Bearer Token',async({request})=>{
    let response=await request.post('https://thinking-tester-contact-list.herokuapp.com/users/login',
      {
        data:{
             "email": `${email}`,
             "password": `${password}`
        }
      }
    )
    expect( response.status()).toBe(200)
    let jsonres= await response.json()
    accesstoken=jsonres.token;
    console.log(accesstoken);
})

test("@regression WEB and API test",async({page,request})=>{
 
   let postresponse=await request.post('https://thinking-tester-contact-list.herokuapp.com/contacts',{
        headers:{
            'Authorization':`Bearer ${accesstoken}`
        },
        data:{
            "firstName": "John",
            "lastName": "Doe",
            "birthdate": "1970-01-01",
            "email": "jdoe@fake.com",
            "phone": "8005555555",
            "street1": "1 Main St.",
            "street2": "Apartment A",
            "city": "Anytown",
            "stateProvince": "KS",
            "postalCode": "12345",
            "country": "USA"
       }
    })
   
    expect(postresponse.status()).toBe(201)

 
    //WEB TESTING
   await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
   await page.getByRole('textbox', { name: 'Email' }).fill(email)
   await page.getByPlaceholder('Password').fill(password)
   await page.getByRole('button', { name: 'Submit' }).click()

   let name=page.getByText('John Doe').first()
   await expect(name).toBeVisible()
   

   //delete
   let delresponse=await request.delete('https://thinking-tester-contact-list.herokuapp.com/contacts',{
        headers:{
            'Authorization':`Bearer ${accesstoken}`
        }
    })

   await page.pause()
})
