import {test,expect} from "@playwright/test"

let accesstoken:string;

test.beforeAll('create a token post',async({request})=>{
    let cred={
        "username":"admin",
        "password":"password123"
    }

    let response=await request.post('https://restful-booker.herokuapp.com/auth',{
        headers:{
            "Content-type":"application/json",
        },
        data:cred
    })

    expect(response.status()).toBe(200)
    let jsonresponse=await response.json()
    accesstoken=jsonresponse.token;
    console.log('access token: ',accesstoken);
})

test('@regression booking crud',async({request})=>{
    //1.post-create a booking-no token  needed

   let bookingresponse=await request.post('https://restful-booker.herokuapp.com/booking',{
        headers:{
            'Content-Type': 'application/json'
        },
        data:{
                "firstname" : "Jim",
                 "lastname" : "Brown",
                 "totalprice" : 111,
                  "depositpaid" : true,
                 "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                 }, 
                "additionalneeds" : "Breakfast"

        }

    })

    expect(bookingresponse.status()).toBe(200)

    let bookingjsonres=await bookingresponse.json()
    let id=bookingjsonres.bookingid

    //2.update booking put --> need token

    let updateres=await request.put(`https://restful-booker.herokuapp.com/booking/${id}`,{
        headers: {
             'Content-Type': 'application/json',
             Accept: 'application/json',
             Cookie: `token=${accesstoken}`
        },
        data:{
          "firstname" : "James",
          "lastname" : "Brown",
          "totalprice" : 121,
          "depositpaid" : true,
          "bookingdates" : {
                  "checkin" : "2018-01-01",
                  "checkout" : "2019-01-01"
            },
           "additionalneeds" : "Breakfast"    

        }
        })

        expect(updateres.status()).toBe(200)
        expect((await updateres.json()).totalprice).toBe(121)
        
    //3.delete the booking -- need token

      let deletebooking=await request.delete(`https://restful-booker.herokuapp.com/booking/${id}`,{
        headers: {
             Cookie: `token=${accesstoken}`
        }
      })

      expect(deletebooking.status()).toBe(201)
    
})