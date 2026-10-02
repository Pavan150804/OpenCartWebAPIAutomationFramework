import { APIRequestContext } from "@playwright/test";

export class APIHelper{
    private readonly baseurl:string;
    private  readonly request:APIRequestContext

    constructor(baseurl:string,request:APIRequestContext){
        this.baseurl=baseurl
        this.request=request
    }

   async get(endpoint:string,myheaders?:Record<string,string>){
      let response= await this.request.get(`${this.baseurl}${endpoint}`,{headers:myheaders!})
      console.log(await response.json());
       return{
          status:response.status(),
          body: await response.json()
       }      
   }

   async post(endpoint:string,data:object,myheaders?:Record<string,string>){
      let response= await this.request.post(`${this.baseurl}${endpoint}`,{headers:myheaders!,data:data})
      console.log(await response.json());
       return{
          status:response.status(),
          body: await response.json()
       }      
   }

   async put(endpoint:string,data:object,myheaders?:Record<string,string>){
      let response= await this.request.put(`${this.baseurl}${endpoint}`,{headers:myheaders!,data:data})
      console.log(await response.json());
       return{
          status:response.status(),
          body: await response.json()
       }      
   }

     async delete(endpoint:string,myheaders?:Record<string,string>){
      let response= await this.request.delete(`${this.baseurl}${endpoint}`,{headers:myheaders!})
      console.log( response.statusText());
       return{
          status:response.status(),
       }      
   }

}