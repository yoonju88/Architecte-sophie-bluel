import { addValidationLogin, addLogout } from "./login.js"
import { addGenerateGallery } from "./gallery.js"

addValidationLogin()
addLogout()
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
