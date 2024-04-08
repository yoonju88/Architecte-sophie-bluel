/*
const baseUrl = "http://localhost:5678/api/"

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

    console.log(file);

    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }

    const baseUrl = "http://localhost:5678/api/"
    
    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', title)
    formData.append('category', category)

    try {
    const postWorks = await fetch(baseUrl + "works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + saveToken
        },
        body: formData
    })
    const postWorksResponse = await postWorks.text()
    console.log(postWorksResponse)
    }catch(error){
        //console.error()
    }
}

export async function addFormData() {

    const formModal = document.getElementById("formModal")
    if (!formModal) { console.error("Form not found"); return }

    const inputFile = document.getElementById('file')
    const fileImage = document.querySelector(".displayImage")
    const titleValue = document.getElementById('title')
    const categoryValue = document.getElementById('category')

    const valideImage = document.querySelector('.valideImage')

    valideImage.addEventListener('click', e => {
        e.preventDefault();
        sendImageToBackend(inputFile.files[0], titleValue.value, categoryValue.value);
    });

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