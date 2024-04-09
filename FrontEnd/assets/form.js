
const baseUrl = "http://localhost:5678/api/"

async function sendImageToBackend(file, title, categoryId){

    const saveToken = localStorage.getItem("token")
    if (!saveToken) { return; }
    
    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', title)
    formData.append('category', categoryId)
    console.log(formData)

    const postWorks = await fetch(baseUrl + "works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + saveToken
        },
        body: formData
    })
    const responsePostWorks = await postWorks.json()
}

export async function addFormData() {

    const formModal = document.getElementById("formModal")
    if (!formModal) { console.error("Form not found"); return }

    const inputFile = document.getElementById('file')
    const fileImage = document.querySelector(".displayImage")
    const title = document.getElementById('title')
    const category = document.getElementById('category')
    const categoryId = getCate
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

    const valideImage = document.querySelector('.valideImage')
    valideImage.addEventListener('click', e => {
        e.preventDefault();
        sendImageToBackend(inputFile.files[0], title.value, category.value);
    });



}
