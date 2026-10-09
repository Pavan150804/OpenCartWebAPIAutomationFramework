import {test,expect} from "../../src/fixtures/apifixtures"

let AuthToken=process.env.Auth_Tokens
let authheader={
    Authorization:`Bearer ${AuthToken}`
}

// to Create a user --> generic function

async function createUser(apihelper:any) {
      let user={
        name:"RahulAutomations",
        email:`automation${Date.now()}open@gmail.com`,
        gender:"male",
        status:"active"
    }

  let response =await apihelper.post(`/public/v2/users`,user,authheader)
    expect(response.status).toBe(201)
    return response.body
}


//1.test --> create user --> get user --> with AAA pattern
test.skip("get User test",async({apihelper})=>{
     let response=await createUser(apihelper)
     let getresponse=await apihelper.get(`/public/v2/users/${response.id}`,authheader)
     expect(getresponse.status).toBe(200)
     expect(getresponse.body.name).toBe('RahulAutomations')
})

//2.update user test--> create user --> get user --> update --> with AAA pattern
test.skip('update user test',async({apihelper})=>{
     let userdata={
        name:"NaveenAutomations",
        status:"Inactive"
    }
    //1.create user
    let response=await createUser(apihelper)
    //2.get user
    let getresponse=await apihelper.get(`/public/v2/users/${response.id}`,authheader)
    expect(getresponse.status).toBe(200)
    expect(getresponse.body.name).toBe('RahulAutomations')
    //3.update user
    let putresponse=await apihelper.put(`/public/v2/users/${response.id}`,userdata,authheader)
    expect(putresponse.status).toBe(200)
    expect(putresponse.body.name).toBe(userdata.name)
})

//3.Delete user test--> create user --> get user --> delete(204) --> get user (404 )with AAA pattern
test.skip('Delete user test',async({apihelper})=>{
    //1.create user
    let response=await createUser(apihelper)
    
    //2.get user
    let getresponse=await apihelper.get(`/public/v2/users/${response.id}`,authheader)
    expect(getresponse.status).toBe(200)
    expect(getresponse.body.name).toBe('RahulAutomations')

    //3.delete user
    let delresponse=await apihelper.delete(`/public/v2/users/${response.id}`,authheader)
    expect(delresponse.status).toBe(204)

    //4.getuser
    getresponse=await apihelper.get(`/public/v2/users/${response.id}`,authheader)
    expect(getresponse.status).toBe(404)
    expect(getresponse.body.message).toBe('Resource not found')

})