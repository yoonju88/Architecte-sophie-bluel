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

    const modalAddPhoto = document.querySelector('.open-modal2')
    //현재 창이 열려 있는지 추적하기 위한 변수
    let modal = null
    let modal2 = null
    const openModal = function(e){
        e.preventDefault() 
        const target = document.querySelector(e.target.getAttribute('href'))// target = selection #modal1 의 속성을 가져옴
        
        // to open modal
        target.style.display = null
        target.removeAttribute('aria-hidden')
        target.setAttribute('aria-modal', 'true')
        modal = target

        modal.addEventListener('click', closeModal)
        modal.querySelector('.closeModal').addEventListener('click', closeModal)
        modal.querySelector('.modalStop').addEventListener('click', stopPropagation)
    }

    const openSecondModal = function (e) {
        e.preventDefault() 
        const targetModal2 = document.querySelector(this.getAttribute('href'))
        targetModal2.style.display = null
        targetModal2.removeAttribute('aria-hidden')
        targetModal2.setAttribute('aria-modal','true')
        modal2 = targetModal2

        modal2.addEventListener('click', closeSecondModal)
        modal2.querySelector('.closeModal2').addEventListener('click', closeSecondModal)
        modal2.querySelector('.modalStop').addEventListener('click', stopPropagation)
        modal2.querySelector('.return').addEventListener('click', closeSecondModal)
    }

    const closeModal = function (e) {
        e = e || window.event;
       if(modal === null) return
        e.preventDefault()        
        
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-modal')
        modal.removeEventListener('click', closeModal)
        modal.querySelector(".closeModal").removeEventListener('click', closeModal)
        modal.querySelector('.modalStop').removeEventListener('click', stopPropagation)
        const hideModal = function () {
            modal.style.display="none"
            modal.removeEventListener('animationend', hideModal)
            modal = null
        }      
        modal.addEventListener('animationend', hideModal)
    }

    const closeSecondModal = function (e) {
        e = e || window.event;
        if(modal2 === null) return
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
            modal2.style.display="none"
            modal2.removeEventListener('animationend', hideModal2)
            modal2 = null
        }      
        modal2.addEventListener('animationend', hideModal2)
    }

    const stopPropagation = function(e) {
        e.stopPropagation()
    }
    
    document.querySelectorAll('.open-modal').forEach( a => {
        a.addEventListener('click', openModal)
    })
    modalAddPhoto.addEventListener('click', openSecondModal)
  
    // function to close all modal by one time
    function closeModalByEsc (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
            closeSecondModal(e)
        }   
    }

    window.addEventListener('keydown', closeModalByEsc )
}

