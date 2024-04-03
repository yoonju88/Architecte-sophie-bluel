/*
const baseUrl = "http://localhost:5678/api/"
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
*/

export async function displayModal() {
    let modal = null
    
    const openModal = function(e){
        e.preventDefault()        
        const target = document.querySelector(e.target.getAttribute('href'))

        // to open modal
        target.style.display = null
        target.removeAttribute('aria-hidden')
        target.setAttribute('aria-modal', 'true')
        modal = target

        modal.addEventListener('click', closeModal)
        modal.querySelector('.js-closeModal').addEventListener('click', closeModal)
        modal.querySelector('.js-modalStop').addEventListener('click', stopPropagation)
    }

    const closeModal = function (e) {
        if(modal === null) return
        e.preventDefault()        
        modal.style.display = "none"
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-modal')
        modal.removeEventListener('click', closeModal)
        modal.querySelector(".js-closeModal").removeEventListener('click', closeModal)
        modal.querySelector('.js-modalStop').removeEventListener('click', stopPropagation)
        modal = null
    }

    const stopPropagation = function(e) {
        e.stopPropagation()
    }
    
    document.querySelectorAll('.js-modal').forEach( a => {
        a.addEventListener('click', openModal)
    })

    window.addEventListener('keydown', function(e){
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
        }    
    })

}

