const baseUrl = "http://localhost:5678/api/"
//Récup GET categories
const getCategories = await fetch(baseUrl + "categories", { method: "GET" })
const arrayCategories = await getCategories.json()

//Récup GET works
const getGallery = await fetch(baseUrl + "works", { method: "GET" })
const galleries = await getGallery.json()

export async function addgenerateButtons() {

    const btnFilters = document.querySelector(".btn-filters")
    // correction error on login page
    if (!btnFilters) { return }
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

    async function generateGallery(galleries) {
        const sectionGallery = document.querySelector(".gallery")
        // correction error on login page
        if (!sectionGallery) { return }

        for (const gallery of galleries) {

            const figureElement = document.createElement("figure")
            figureElement.dataset.categoryId = gallery.categoryId
            figureElement.dataset.userId = gallery.userId
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
}





