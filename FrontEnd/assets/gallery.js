const baseUrl = "http://localhost:5678/api/"
//Récup GET categories
const getCategories = await fetch(baseUrl + "categories", { method: "GET" })
const arrayCategories = await getCategories.json()

//Récup GET works
const getGallery = await fetch(baseUrl + "works", { method: "GET" })
const galleries = await getGallery.json()

export async function addGenerateGallery() {
    
    function generateGallery(galleries) {
        for (let i = 0; i < galleries.length; i++) {
            const infoGalleries = galleries[i]
            const sectionGallery = document.querySelector(".gallery")
            // correction error on login page
            if (!sectionGallery){ return }

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

    const btnFilters = document.querySelector(".btn-filters")
    // correction error on login page
    if (!btnFilters){ return }

    const mapCategory = galleries.map(gallery => gallery.category)

    function generateButtons() {

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
                    document.querySelector(".gallery").innerHTML = ""
                    generateGallery(filterBtnAll)
                    console.log("display all", filterBtnAll)
                })
            } else {
                button.textContent = categoryLists.name
                button.addEventListener("click", function () {
                    let categoryId = categoryLists.id
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
    generateButtons()
}

export async function GenerateModalGallery() {
    
    function modalGallery(galleries) {
        const modalSectionGallery = document.querySelector(".modal-sectionGallery")
        // correction error on login page
        if (!modalSectionGallery){ return }
    
        for (let i = 0; i < galleries.length; i++) {
         
            const nGalleries = galleries[i]
            let addIcone = `<a class="removeImage"><i class="fa-solid fa-trash-can"></i></a>`
            const figureElement = document.createElement("figure")
            figureElement.dataset.categoryId = nGalleries.categoryId
            figureElement.dataset.userId = nGalleries.userId
            modalSectionGallery.appendChild(figureElement)
            figureElement.innerHTML = addIcone

            const imageElement = document.createElement("img")
            imageElement.src = nGalleries.imageUrl
            imageElement.alt = nGalleries.title
            figureElement.appendChild(imageElement)

        }
    }
    modalGallery(galleries);

    }