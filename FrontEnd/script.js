const baseUrl = "http://localhost:5678/api/"
//récup post
const loginUser = await fetch (baseUrl+ "users/login",{
    method : "POST", 
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify ({  
        "email": "sophie.bluel@test.tld",
        "password": "S0phie"
    })
})
const loginUserResponse = await loginUser.json ()


const categories = await fetch (baseUrl + "categories",{
    method : "GET"
})
const categoriesReponse = await categories.json()

const ReturnsWorks = await fetch (baseUrl + "works",{
    method : "GET"
})
const ReturnsWorksReponse = await ReturnsWorks.json()

