import {APIResponse, expect, test} from "@playwright/test"

let AUTH_TOKEN={
    Authorization:"Bearer 89c8b214d943a6b46f95f8915d86dbc6ada150f97930bcec7ce69be2a40e1d0d"
}

test("get All users test",async({request})=>{
    let response:APIResponse=await request.get('https://gorest.co.in/public/v2/users',{headers:AUTH_TOKEN})
  
    expect(response.status()).toBe(200)
    // console.log(response);
    let jsonres= await response.json()
    console.log(jsonres);
    console.log(response.status());
    console.log(response.statusText());
})

test("Create an user POST test",async({request})=>{
    let user={
        name:"Pavan@12",
        email:`automation${Date.now()}open@gmail.com`,
        gender:"male",
        status:"active"
    }

    let response:APIResponse=await request.post('https://gorest.co.in/public/v2/users'
        ,{headers:AUTH_TOKEN,data:user})
  
    expect(response.status()).toBe(201) 
    // console.log(response);
    let jsonres= await response.json()
    console.log(jsonres);
    console.log(response.status()); //201
    console.log(response.statusText()); //created
})


// 8628914

test.skip("Update an user using PUT test",async({request})=>{
    let user={
        name:"PavanManikanta",
        email:`automation1789799796389open@gmail.com`,
        gender:"male",
        status:"active"
    }

    let response:APIResponse=await request.put('https://gorest.co.in/public/v2/users/8628914'
        ,{headers:AUTH_TOKEN,data:user})
  
    expect(response.status()).toBe(200) 
    // console.log(response);
    let jsonres= await response.json()
    console.log(jsonres);
    console.log(response.status()); //200
    console.log(response.statusText()); //ok
})

//For to change partial data
test.skip("Update an user using Patch test",async({request})=>{
    let user={
        status:"Inactive"
    }

    let response:APIResponse=await request.patch('https://gorest.co.in/public/v2/users/8628914'
        ,{headers:AUTH_TOKEN,data:user})
  
    expect(response.status()).toBe(200) 
    // console.log(response);
    let jsonres= await response.json()
    console.log(jsonres);
    console.log(response.status()); //200
    console.log(response.statusText()); //ok
})


test.skip("Get a Specific user test",async({request})=>{
    let response:APIResponse=await request.get('https://gorest.co.in/public/v2/users/8628941'
        ,{headers:AUTH_TOKEN})
    expect(response.status()).toBe(200) 
    let jsonres= await response.json()
    console.log(jsonres);
    console.log(response.status()); //200
    console.log(response.statusText()); //No Content 
})