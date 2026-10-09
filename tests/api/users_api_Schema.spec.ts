import {test,expect} from "../../src/fixtures/apifixtures"
import Ajv from "ajv" //npm install ajv
import fs from 'fs'

let AuthToken=process.env.Auth_Tokens
let authheader={
    Authorization:`Bearer ${AuthToken}`
}

//predefined class
let ajv=new Ajv()

let userSchema=
{
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}

let getusersSchema=
{
  "type": "array",
  "items":userSchema  
}

test.skip("get a user test",async({apihelper})=>{
          let user={
            name:"Rahul",
            email:`automation${Date.now()}open@gmail.com`,
            gender:"male",
            status:"active"
        }
          let response= await apihelper.post('/public/v2/users',user,authheader)
            expect(response.status).toBe(201)
            let userid=response.body.id;

          let getresponse= await apihelper.get(`/public/v2/users/${userid}`,authheader)
       
          //  let validate= ajv.compile(userSchema)
          let validate=ajv.compile(JSON.parse(fs.readFileSync(`./src/schema/userschema.json`,'utf-8')))

           let validSchema= validate(getresponse.body)

           if(!validSchema){
            console.log("Schema Errors :",validate.errors);
           }

           expect(validSchema).toBeTruthy()

})

test.skip("get all users test",async({apihelper})=>{
          
        let getresponse= await apihelper.get(`/public/v2/users`,authheader)

           let validate= ajv.compile(getusersSchema)
           let validSchema= validate(getresponse.body)

           if(!validSchema){
            console.log("Schema Errors :",validate.errors);
           }

           expect(validSchema).toBeTruthy()

})