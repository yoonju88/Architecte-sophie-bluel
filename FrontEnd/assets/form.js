const baseUrl = "http://localhost:5678/api/"
/*
const deleteWorks = await fetch(baseUrl + "works/{id}", {
    method: "DELETE",
    headers: {
        "Accept": "*'/*"
    }
})
const deleteWorksResponse = await deleteWorks.json()
console.log("Success deleteWorks", deleteWorksResponse)
*/

async function sendImageToBackend(file, title, category){

    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }

    const valideImage = document.querySelector('.valideImage')

    valideImage.addEventListener('click', e => {
        e.preventDefault();
        sendImageToBackend(inputFile.files[0], title.value, category.value);
    });
    
    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', title)
    formData.append('category', category)

    const baseUrl = "http://localhost:5678/api/"

    const postWorks = await fetch(baseUrl + "works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + saveToken
        },
        body: formData
    }).then(response => {
        if(response.status === 201) {
            return response.json()
        } else if (response.status === 400) {
            throw new Error("requst invalide")
        } else if (response.status === 401) {
            throw new Error("non authorization")
        } else {
            throw new ("error we don't know")
        }    
    })
   const postWorksResponse = await postWorks.text()
   console.log("result", postWorksResponse)
}

export async function addFormData() {

    const formModal = document.getElementById("formModal")
    if (!formModal) { console.error("Form not found"); return }

    const inputFile = document.getElementById('file')
    const fileImage = document.querySelector(".displayImage")
    const title = document.getElementById('title')
    const category = document.getElementById('category')
    
 
    //input에 이미지 경로를 값을 넣으면 이미지를 보여줌
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
}


/*
export async function addFormData() {

    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }

    const formModal = document.getElementById("formModal")
    if (!formModal) { console.error("Form not found"); return }
    const baseUrl = "http://localhost:5678/api/"
    const valideImage = document.querySelector('.valideImage')

    formModal.addEventListener('submit', async (e)=> {
        const formData = new FormData (formModal)
        e.preventDefault()
        formData.append('image', file)
        formData.append('title', title)
        formData.append('category', category)

        const response = await fetch(baseUrl + "works", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + saveToken,
                "Content-Type": "application/json"
            },
            body: formData
            })
            
    })

    const inputFile = document.getElementById('file')
    const fileImage = document.querySelector(".displayImage")
    const title = document.getElementById('title')
    const category = document.getElementById('category')

    //input에 이미지 경로를 값을 넣으면 이미지를 보여줌
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
}*/
