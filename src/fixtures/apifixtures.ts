import { APIHelper } from "../Api/ApiHelper";
import {test as basetest, request} from "@playwright/test"

type apifixtues={
    apihelper:APIHelper
}

export let test=basetest.extend<apifixtues>({
    apihelper:async({request},user)=>{
       let apihelper=new APIHelper(process.env.API_BASEURL!,request)
       await user(apihelper)
    }
})

export{expect} from "@playwright/test"