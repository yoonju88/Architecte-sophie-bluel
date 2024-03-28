
export async function addValidationLogin() {
    const loginForm = document.getElementById("loginForm")
    const errorMsg = document.querySelector(".errorMessage")

    if (!loginForm){
        return
    }

    loginForm.addEventListener("submit", validationLogin)

    function afficheErrorMessage() {
        errorMsg.innerHTML = "<span>Erreur dans l'identifiant ou le mot de passe</span>"
    }
    async function validationLogin(event) {
        event.preventDefault()

        const userEmail = document.getElementById("loginEmail").value
        const loginPassword = document.getElementById("loginPassword").value

        const resultat = await getLoginUser(userEmail.trim(), loginPassword.trim())
        console.log(resultat)
        if (resultat.token) {
            window.location = "index.html"
            localStorage.setItem("token", resultat.token)
        } else {
            afficheErrorMessage()
        }
    }
}

async function getLoginUser(email, password) {
    const baseUrl = "http://localhost:5678/api/"
    const loginUser = await fetch(baseUrl + "users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    return await loginUser.json()
}

const saveToken = localStorage.getItem ("token")
if (saveToken) {
console.log(saveToken)
}