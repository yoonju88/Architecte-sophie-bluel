//Base de URL
const baseUrl = "http://localhost:5678/api/"
//Récup POST users/login
const loginUser = await fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "email": "sophie.bluel@test.tld",
        "password": "S0phie"
    })
})
const loginUserResponse = await loginUser.json()
//Récup GET categories
const categories = await fetch(baseUrl + "categories", { method: "GET"})
const categoriesResponse = await categories.json()
//Récup GET works
const getGallery = await fetch(baseUrl + "works", {
    method: "GET"
    })

const galleries = await getGallery.json()

function generateGallery(galleries) {    
    for (let i = 0; i < galleries.length; i++ ) {   
    const infoGalleries = galleries[i]
    const sectionGallery = document.querySelector(".gallery")

    const figureElement = document.createElement("figure")
    figureElement.dataset.categoryId = infoGalleries.categoryId
    figureElement.dataset.userId = infoGalleries.userId
    sectionGallery.appendChild(figureElement)

    const imageElement = document.createElement("img")
    imageElement.src = infoGalleries.imageUrl
    imageElement.alt = infoGalleries.title
    figureElement.appendChild(imageElement)

    const figcaptionElement = document.createElement("figcaption")
    figcaptionElement.innerText = infoGalleries.title
    figureElement.appendChild(figcaptionElement)
    }
}
generateGallery(galleries);

// buttons filters
const btnFilters = document.querySelector(".btn-filters")

const btnAll = document.createElement("button")
const btnObject = document.createElement("button")
const btnAppart = document.createElement("button")
const btnHotel = document.createElement("button")

btnAll.textContent = "Tous"
btnObject.textContent = "Objects"
btnAppart.textContent = "Appartements"
btnHotel.textContent = "Hotels & restaurants"
btnFilters.appendChild(btnAll)
btnFilters.appendChild(btnObject)
btnFilters.appendChild(btnAppart)
btnFilters.appendChild(btnHotel)

const mapUserId = galleries.map(gallery=>gallery.userId)
btnAll.addEventListener("click", function(){
    const filterBtnAll = galleries.filter(function (gallery){
        return gallery.userId === 1 
    })
    document.querySelector(".gallery").innerHTML = ""
    generateGallery(filterBtnAll)
})

const categoryId = galleries.map(gallery => gallery.categoryId)

btnObject.addEventListener("click", function(){
    const filterbtnObject = galleries.filter(function (gallery){
        return gallery.categoryId === categoryId[0]
    })
    document.querySelector(".gallery").innerHTML = ""
    generateGallery(filterbtnObject)
    console.log(filterbtnObject )   
})

btnAppart.addEventListener("click", function(){
    const filterBtnAppart = galleries.filter(function (gallery){
        return gallery.categoryId === categoryId[1]
    })
    document.querySelector(".gallery").innerHTML = ""
    generateGallery(filterBtnAppart)  
})

btnHotel.addEventListener("click", function(){
    const filterBtnHotel = galleries.filter(function (gallery){
        return gallery.categoryId === categoryId[2]
    })
    document.querySelector(".gallery").innerHTML = ""
    generateGallery(filterBtnHotel)
    console.log(filterBtnHotel)   
})
