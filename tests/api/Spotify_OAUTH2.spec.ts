import {expect, test} from "@playwright/test"

let OAUTH_CONFIG={
    tokenurl:'https://accounts.spotify.com/api/token',
    client_id:process.env.OAUTH_CLIENT_ID!,
    client_secret:process.env.OAUTH_CLIENT_SECRECT!,
    grant_type:process.env.GRANT_TYPE!
}

let accesstoken:string;
test.beforeEach('post-creating the access token',async({request})=>{
   let response=await request.post(OAUTH_CONFIG.tokenurl,{
        form:{
            client_id:OAUTH_CONFIG.client_id,
            client_secret:OAUTH_CONFIG.client_secret,
            grant_type:OAUTH_CONFIG.grant_type
        }
    })
    expect(response.status()).toBe(200)
    let jsonres= await response.json()
    accesstoken=jsonres.access_token; 
    console.log("Access Token: ",accesstoken);

})

test('get albums',async({request})=>{
    // https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy
    let baseurl="https://api.spotify.com"
    let endpoint='/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
    let getresponse=await request.get(`${baseurl}${endpoint}`,{
        headers:{
            Authorization:`Bearer ${accesstoken}`
        }
    })
    expect(getresponse.status()).toBe(200)
    console.log(await getresponse.json());
})