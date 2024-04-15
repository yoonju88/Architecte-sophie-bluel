import { addValidationLogin, addLogout } from "./login.js"
addValidationLogin()
addLogout()


const baseUrl = "http://localhost:5678/api/"
//Récup GET categories
const getCategories = await fetch(baseUrl + "categories", { method: "GET" })
const arrayCategories = await getCategories.json()

//Récup GET works
const getGallery = await fetch(baseUrl + "works", { method: "GET" })
const galleries = await getGallery.json()

async function generateGallery(galleries, targetGallery) {
    const sectionGallery = document.querySelector(targetGallery)
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

        if (targetGallery === ".modal-sectionGallery") {
            const removeIcon = document.createElement("a");
            removeIcon.classList.add("removeImage");
            const removeIconImage = document.createElement("img");
            removeIconImage.src = "./assets/icons/trash-can.png";
            removeIcon.appendChild(removeIconImage);
            figureElement.appendChild(removeIcon);
            imageElement.classList.add("modalGalleryImage");
            figcaptionElement.style.display = 'none';
            removeImageButton()
        }
    }
}
generateGallery(galleries, ".gallery")
generateGallery(galleries, ".modal-sectionGallery")

function generateButtons() {
    const mapCategory = galleries.map(gallery => gallery.category)
    const btnFilters = document.querySelector(".btn-filters")
    if (!btnFilters) { return }

    for (let i = 0; i < arrayCategories.length + 1; i++) {
        const categoryLists = arrayCategories.find(category => category.id === i)
        const button = document.createElement("button")
        btnFilters.appendChild(button)

        if (!categoryLists) {
            button.textContent = "tous"
            button.addEventListener("click", function () {
                const filterBtnAll = galleries.filter(function (gallery) {
                    return mapCategory
                })
                generateGallery(filterBtnAll, ".gallery")
            })
        } else {
            button.textContent = categoryLists.name
            button.addEventListener("click", function () {
                let categoryId = categoryLists.id
                const FilterButton = galleries.filter(function (gallery) {
                    return gallery.category.id === categoryId
                })
                generateGallery(FilterButton, ".gallery")
            })
        }
    }
}
generateButtons()

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

    //to regeneration gallery and modal gallery after add image from second modal
    const getGallery = await fetch(baseUrl + "works", { method: "GET" })
    const galleries = await getGallery.json()
    generateGallery(galleries, ".gallery")
    generateGallery(galleries, ".modal-sectionGallery")
}

// To get arrayCategories.id, if categoryname(category.value) same as arrayCategories.name 
async function getCategoryIdByName(categoryName) {
    const selectionOption = arrayCategories.find(category => category.name === categoryName)
    if (selectionOption) {
        return selectionOption.id
    } else { return }
}

// add image file from second modal
async function inputData() {
    const formModal = document.getElementById("formModal")
    if (!formModal) { return }
    const fileImage = document.querySelector(".displayImage")
    //input에 이미지 경로를 값을 넣으면 이미지를 보여줌
    const inputFile = document.getElementById('file')
    const title = document.getElementById('title')
    const category = document.getElementById('categorieList')

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
        const categoryId = await getCategoryIdByName(category.value)
        sendImageToBackend(inputFile.files[0], title.value, categoryId);
        closeSecondModal(e)
        title.value = ""
        fileImage.innerHTML = ""
    })
}
inputData()

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
    await deleteWorks(worksId)

    const getGallery = await fetch(baseUrl + "works", { method: "GET" })
    const galleries = await getGallery.json()
    generateGallery(galleries, ".gallery")
    generateGallery(galleries, ".modal-sectionGallery")
}

async function deleteWorks(id) {
    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }

    const deleteWorksResponse = await fetch(`${baseUrl}works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + saveToken,
            "Accept": "*/*",
        },
    })
    if (!deleteWorksResponse.ok) { throw new Error('failed') }
    return true
}

//현재 창이 열려 있는지 추적하기 위한 변수
let modal = null
let modal2 = null

const openModal = function (e) {
    e.preventDefault()
     // this.getAttribute('href') === #modal
    // target === entire content #modal
    const target = document.querySelector(this.getAttribute('href'))
    showModal(target, 'modal')
}

const openSecondModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    showModal(target, 'modal2')
};

const showModal = function (target, modalN) {
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');

    if (modalN === 'modal') {
        modal = target;
        modal.addEventListener('click', closeModal);
        modal.querySelector('.closeModal').addEventListener('click', closeModal);
        modal.querySelector('.modalStop').addEventListener('click', stopPropagation);
        const modalAddPhoto = document.querySelector('.open-modal2');
        modalAddPhoto.addEventListener('click', openSecondModal);
    } else if (modalN === 'modal2') {
        modal2 = target;
        modal2.addEventListener('click', closeSecondModal);
        modal2.querySelector('.closeModal2').addEventListener('click', closeSecondModal);
        modal2.querySelector('.modalStop').addEventListener('click', stopPropagation);
        modal2.querySelector('.return').addEventListener('click', closeSecondModal);
    }
}

function offModal(targetModal) {
    if (!targetModal) return
    targetModal.setAttribute('aria-hidden', 'true')
    targetModal.removeAttribute('aria-modal')
    targetModal.querySelector('.modalStop').removeEventListener('click', stopPropagation)
    
    const hideModal = function () {
        targetModal.style.display = "none"
        targetModal.removeEventListener('animationend', hideModal)
        targetModal = null
        
    }
    targetModal.addEventListener('animationend', hideModal)
}

const closeModal = function (e) { 
    e = e || window.event;
    e.preventDefault()
    offModal(modal)
    modal.removeEventListener('click', closeModal)
    modal.querySelector(".closeModal").removeEventListener('click', closeModal)
}

const closeSecondModal = function (e) { 
    e = e || window.event;
    e.preventDefault()
    const returnButton = e.target.closest('.return')
    if (!returnButton) { closeModal(e)}

    offModal(modal2)
    modal2.removeEventListener('click', closeSecondModal)
    modal2.querySelector('.closeModal2').removeEventListener('click', closeSecondModal)
    modal2.querySelector('.return').removeEventListener('click', closeSecondModal)
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
