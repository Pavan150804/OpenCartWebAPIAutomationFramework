import {test,expect} from "../../src/fixtures/apifixtures"

let AuthToken=process.env.Auth_Tokens
let authheader={
    Authorization:`Bearer ${AuthToken}`
}

let userid:Number | undefined;

test.describe.serial("Crud Operations Test",()=>{

    test.skip("get All users test",async({apihelper})=>{
        let response= await apihelper.get('/public/v2/users',authheader)
        expect(response.status).toBe(200)
    })


     test("@smoke Post the data test",async({apihelper})=>{
         let user={
        name:"Rahul",
        email:`automation${Date.now()}open@gmail.com`,
        gender:"male",
        status:"active"
    }
        let response= await apihelper.post('/public/v2/users',user,authheader)
        expect(response.status).toBe(201)
        userid=response.body.id;
        console.log(userid);
    })

     test("@smoke Update the data test",async({apihelper})=>{
        let user={
        name:"Rakul",
        gender:"female",
        
    }
        let response= await apihelper.put(`/public/v2/users/${userid}`,user,authheader)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(user.name)
        expect(response.body.gender).toBe(user.gender)
  
    })

      test("@smoke delete the data test",async({apihelper})=>{
        let response= await apihelper.delete(`/public/v2/users/${userid}`,authheader)
        expect(response.status).toBe(204)
    })
})