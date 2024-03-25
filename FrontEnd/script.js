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

function createGallery(galleries) {    
    for (let i = 0; i < galleries.length; i++ ) {   

    const infoGalleries = galleries[i]

    const sectionGallery = document.querySelector(".gallery")
    const figureElement = document.createElement("figure")
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
createGallery(galleries);
 // Récup element catégorie dans galleries array
const categoryGalleries = galleries.map (galleries => galleries.category)

