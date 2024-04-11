import { addValidationLogin, addLogout } from "./login.js"
import { addgenerateButtons } from "./button.js"
addValidationLogin()
addLogout()
addgenerateButtons()

const baseUrl = "http://localhost:5678/api/"
//Récup GET categories
const getCategories = await fetch(baseUrl + "categories", { method: "GET" })
const arrayCategories = await getCategories.json()

//Récup GET works
const getGallery = await fetch(baseUrl + "works", { method: "GET" })
const galleries = await getGallery.json()

async function generateGallery(galleries) {
    const sectionGallery = document.querySelector(".gallery")
    // correction error on login page
    if (!sectionGallery) { return }
    sectionGallery.innerHTML = ""

    for (const gallery of galleries) {
        const figureElement = document.createElement("figure")
        figureElement.dataset.categoryId = gallery.categoryId
        figureElement.dataset.userId = gallery.userId
        figureElement.dataset.worksId = gallery.id
        sectionGallery.appendChild(figureElement)

        const imageElement = document.createElement("img")
        imageElement.src = gallery.imageUrl
        imageElement.alt = gallery.title
        figureElement.appendChild(imageElement)

        const figcaptionElement = document.createElement("figcaption")
        figcaptionElement.innerText = gallery.title
        figureElement.appendChild(figcaptionElement)
    }
}
generateGallery(galleries);

// display modal Gallery
async function modalGallery(galleries) {
    const modalSectionGallery = document.querySelector(".modal-sectionGallery")
    // correction error on login page
    if (!modalSectionGallery) { return }
    modalSectionGallery.innerHTML = ""

    for (let i = 0; i < galleries.length; i++) {
        const nGalleries = galleries[i]
        let addIcone = `<a class="removeImage"><img src="./assets/icons/trash-can.png"></a>`
        const figureElement = document.createElement("figure")
        figureElement.dataset.categoryId = nGalleries.categoryId
        figureElement.dataset.userId = nGalleries.userId
        figureElement.dataset.worksId = nGalleries.id
        modalSectionGallery.appendChild(figureElement)
        figureElement.innerHTML = addIcone

        const imageElement = document.createElement("img")
        imageElement.src = nGalleries.imageUrl
        imageElement.alt = nGalleries.title
        imageElement.classList.add("modalGalleryImage")
        figureElement.appendChild(imageElement)
    }
}
modalGallery(galleries);

// send imagefile date to backend server
async function sendImageToBackend(file, title, categoryId) {
    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', title)
    formData.append('category', categoryId)

    const postWorks = await fetch(baseUrl + "works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + saveToken
        },
        body: formData
    })
    const responsePostWorks = await postWorks.json()
    console.log(responsePostWorks)
    if (!postWorks.ok) { throw new Error('fail upload file') }
    // to regeneration gallery and modal gallery after add image from second modal
    const getGallery = await fetch(baseUrl + "works", { method: "GET" })
    const galleries = await getGallery.json()
    await generateGallery(galleries)
    await modalGallery(galleries)
    await removeImageButton()
}



// To get arrayCategories.id, if categoryname(category.value) same as arrayCategories.name 
function getCategoryIdByName(categoryName) {
    for (const category of arrayCategories) {
        if (category.name === categoryName) {
            return category.id
        }
    }
}
// add image file from second modal
async function formData() {
    const formModal = document.getElementById("formModal")
    if (!formModal) { return }

    const fileImage = document.querySelector(".displayImage")
    //input에 이미지 경로를 값을 넣으면 이미지를 보여줌
    const inputFile = document.getElementById('file')
    const title = document.getElementById('title')
    const category = document.getElementById('categorieList')
    const categoryId = await getCategoryIdByName(category.value)
    // pre-display upload image from input zone 
    inputFile.addEventListener("change", function (e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.addEventListener("load", function (e) {
                const image = document.createElement("img")
                image.src = reader.result
                image.classList.add("uploadImage")
                fileImage.innerHTML = ""
                fileImage.appendChild(image);
            })
            reader.readAsDataURL(file)
        }
    })

    const valideImage = document.querySelector('.valideImage')
    valideImage.addEventListener('click', async e => {
        e.preventDefault();
        if (!inputFile.files[0] || !title.value || !category.value) { return }
        sendImageToBackend(inputFile.files[0], title.value, categoryId);
        closeSecondModal(e)
        title.value = ""
        fileImage.innerHTML = ""
    });
}
formData()

function removeImageButton() {
    const removeImage = document.querySelectorAll(".removeImage")
    removeImage.forEach(removeImage => {
        removeImage.addEventListener('click', deleteUploadImage)
    })
}
removeImageButton()

async function deleteUploadImage(e) {
    const figure = e.target.closest('figure')
    if (!figure) { return }
    const worksId = figure.dataset.worksId
    console.log(worksId)
    await deleteWorks(worksId)
    figure.remove()
    const getGallery = await fetch(baseUrl + "works", { method: "GET" })
    const galleries = await getGallery.json()
    generateGallery(galleries)

}

async function deleteWorks(id) {
    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }

    const deleteWorksResponse = await fetch(`${baseUrl}works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + saveToken,
            "Accept": "*/*"
            //"Content-Type": "application/json"
        },
    })
    if (!deleteWorksResponse.ok) { throw new Error('failed') }
    return true
}

//generateGallery(galleries) ?

//현재 창이 열려 있는지 추적하기 위한 변수
let modal = null
let modal2 = null
const openModal = function (e) {
    e.preventDefault()
    // target = selection #modal1 의 속성을 가져옴
    const target = document.querySelector(e.target.getAttribute('href'))
    // to open modal
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target

    modal.addEventListener('click', closeModal)
    modal.querySelector('.closeModal').addEventListener('click', closeModal)
    modal.querySelector('.modalStop').addEventListener('click', stopPropagation)

    const modalAddPhoto = document.querySelector('.open-modal2')
    modalAddPhoto.addEventListener('click', openSecondModal)
}

const openSecondModal = function (e) {
    e.preventDefault()
    const targetModal2 = document.querySelector(this.getAttribute('href'))
    targetModal2.style.display = null
    targetModal2.removeAttribute('aria-hidden')
    targetModal2.setAttribute('aria-modal', 'true')
    modal2 = targetModal2

    modal2.addEventListener('click', closeSecondModal)
    modal2.querySelector('.closeModal2').addEventListener('click', closeSecondModal)
    modal2.querySelector('.modalStop').addEventListener('click', stopPropagation)
    modal2.querySelector('.return').addEventListener('click', closeSecondModal)
}

const closeModal = function (e) {
    e = e || window.event;
    if (modal === null) return
    e.preventDefault()

    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector(".closeModal").removeEventListener('click', closeModal)
    modal.querySelector('.modalStop').removeEventListener('click', stopPropagation)
    const hideModal = function () {
        modal.style.display = "none"
        modal.removeEventListener('animationend', hideModal)
        modal = null
    }
    modal.addEventListener('animationend', hideModal)
}

const closeSecondModal = function (e) {
    e = e || window.event;
    if (modal2 === null) return
    const returnButton = e.target.closest('.return') // verifie if i clicked 'return'
    e.preventDefault()

    if (!returnButton) {
        closeModal()
    }

    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')

    modal2.removeEventListener('click', closeSecondModal)
    modal2.querySelector('.closeModal2').removeEventListener('click', closeSecondModal)
    modal2.querySelector('.modalStop').removeEventListener('click', stopPropagation)
    modal2.querySelector('.return').removeEventListener('click', closeSecondModal)
    const hideModal2 = function () {
        modal2.style.display = "none"
        modal2.removeEventListener('animationend', hideModal2)
        modal2 = null
    }
    modal2.addEventListener('animationend', hideModal2)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.open-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

// function to close all modal by one time  with Escape button
function closeModalByEsc(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
        closeSecondModal(e)
    }
}
window.addEventListener('keydown', closeModalByEsc)

