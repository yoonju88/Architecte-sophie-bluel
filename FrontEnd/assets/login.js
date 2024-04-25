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
        }) // reprise des valeurs "email" et "password" depuis serveur
    })
    return await loginUser.json()
}

export async function addValidationLogin() {
    const loginForm = document.getElementById("loginForm")
    const errorMessage = document.querySelector(".errorMessage")
    // correction erroe on homepage
    if (!loginForm) { return }

    loginForm.addEventListener("submit", validationLogin)

    async function validationLogin(event) {
        event.preventDefault()

        const userEmail = document.getElementById("email").value
        const loginPassword = document.getElementById("password").value
        const result = await getLoginUser(userEmail.trim(), loginPassword.trim())
        if (result.token) {
            window.location = "index.html"
            localStorage.setItem("token", result.token)
        } else {
            errorMessage.innerHTML = "<span>Erreur dans l'identifiant ou le mot de passe</span>"
        }
    }
}

export async function addLogout() {
    const login = document.querySelector(".login")
    if (!login) { return }
    const saveToken = localStorage.getItem("token")
    const body = document.querySelector("body")
    const portfolio = document.getElementById("portfolio")
    let insertModeEdition = `
            <div id ="modeEdition">
            <a href="#modal1" class="open-modal" ><i class="fa-regular fa-pen-to-square"></i> Mode edition</a>
            </div>
        `
    let newContentPf = `
        <div class="portfolioTitle">
        <h2>Mes Projets</h2>
		<a href="#modal1" class="open-modal" ><i class="fa-regular fa-pen-to-square"></i> modifier</a>
        </div>
		<div class="gallery">
		</div>
        `
    function disconnection(event) {
        event.preventDefault()
        localStorage.removeItem("token")
        window.location.href = "index.html"
    }
    if (saveToken) {
        login.innerHTML = "logout"
        login.addEventListener("click", disconnection)
        body.insertAdjacentHTML('beforebegin', insertModeEdition)
        portfolio.innerHTML = newContentPf
    }
}

