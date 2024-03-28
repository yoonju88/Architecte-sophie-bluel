import { addValidationLogin } from "./login.js"
import { addGenerateGallery } from "./gallery.js"

addValidationLogin()
addGenerateGallery()

/*
// request postWorks
async function uploadMultiple(formData) {
    try {
        const postWorks = await fetch(baseUrl + "works", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            },
            body: formData
        })
        const postWorksResponse = await postWorks.json()
        console.log("Success postWork", postWorksResponse)
    } catch (error) {
        console.error("failed postWork", error)
    }
}
uploadMultiple()

const formData = new FormData()
formData.append("title", "title")
formData.append("category", "categoryId")

const imageUrls = galleries.map(gallery => gallery.imageUrl)

for (const imageUrl of imageUrls) {
    const Response = await fetch(imageUrl)
    const blob = await Response.blob()
    formData.append("images[]", blob)
    uploadMultiple(formData)
}

const deleteWorks = await fetch(baseUrl + "works/{id}", {
        method: "DELETE",
        headers: {
            "Accept": ,
        }
})

const deleteWorksResponse = await deleteWorks.json()
console.log("Success delete works", deleteWorksResponse)*/
/*
function generateGallery(galleries) {
    for (let i = 0; i < galleries.length; i++) {
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
//selection elements only categoryId with method map
const mapCategoryId = galleries.map(gallery => gallery.categoryId)
const mapCategory = galleries.map(gallery => gallery.category)
const setCategoryId = new Set(mapCategoryId)

function generateButtons() {
    for (let i = 0; i < setCategoryId.size + 1; i++) {
        const valeurCategory = mapCategory.find(category => category.id === i)
        const button = document.createElement("button")
        btnFilters.appendChild(button)
        if (!valeurCategory) {
            button.textContent = "tous"
            button.addEventListener("click", function () {
                const filterBtnAll = galleries.filter(function (gallery) {
                    return mapCategory
                })
                document.querySelector(".gallery").innerHTML = ""
                generateGallery(filterBtnAll)
                console.log("display all", filterBtnAll)
                })

        } else {
            button.textContent = valeurCategory.name
            button.addEventListener("click", function () {
                let categoryId = valeurCategory.id
                const FilterButton = galleries.filter(function (gallery) {
                    return gallery.category.id === categoryId
                })
                document.querySelector(".gallery").innerHTML = ""
                generateGallery(FilterButton)
                console.log("test filter", FilterButton)
            })
        }
    }
}
generateButtons()*/