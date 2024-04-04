const baseUrl = "http://localhost:5678/api/"

const deleteWorks = await fetch(baseUrl + "works/{id}", {
    method: "DELETE",
    headers: {
        "Accept": "*/*"
    }
})
const deleteWorksResponse = await deleteWorks.json()
console.log("Success deleteWorks", deleteWorksResponse)


export async function addFormData() {
    const baseUrl = "http://localhost:5678/api/"
    const formModal = document.getElementById("formModal")
    if (!formModal) { console.error("Form not found"); return }

    const formData = new FormData(formModal)
    const inputFile = document.getElementById('file')
    const fileImage = document.querySelector(".displayImage")
    const titleValue = document.getElementById('title').value
    const categoryValue = document.getElementById('category').value
    formData.append('file', inputFile.files[0])
    formData.append('title', titleValue)
    formData.append('category', categoryValue)

    try {
    const postWorks = await fetch(baseUrl + "works", {
        method: "POST",
        headers: {
            "Accept": "application/json",
        },
        body: formData
    })
    const postWorksResponse = await postWorks.json()
    console.log(postWorksResponse)
    }catch(error){
        console.error('Error', error)
    }

    //input에 이미지 경로를 값을 넣으면 이미지를 보여줌
    inputFile.addEventListener("change", function (e) {
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.addEventListener("load", function (e) {
                const image = document.createElement("img")
                image.src = e.target.result
                image.classList.add("uploadImage")
                fileImage.innerHTML = ""
                fileImage.appendChild(image)
            })
            reader.readAsDataURL(file)
        }
    })
}










/*
const dataList = document.getElementById("categorieList")
function showList(e) {
    if (e.keyCode === 40 && document.activeElement === input) {
        dataList.style.display = 'block'
    }
}*/