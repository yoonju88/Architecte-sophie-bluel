async function getLoginUser(email, password) {
    const loginUser = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        }) // reprise des valeurs "email" et "password" depuis serveur
    })
    const response = await loginUser.json()
    if (loginUser.status === 401) {
        throw new Error("Authentication error")
    } else if (loginUser.status === 404) {
        throw new Error("User not found")
    }
    return response
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
        try {
            const result = await getLoginUser(userEmail.trim(), loginPassword.trim())
            if (result.token) {
                window.location = "index.html"
                localStorage.setItem("token", result.token)
            }
        } catch (error) {
            if (error.message === "Authentication error") {
                errorMessage.innerHTML = "<span>Erreur, mot de passe incorrect.</span>"
            } else if (error.message === "User not found") {
                errorMessage.innerHTML = "<span>Erreur, utilisateur inconnu.</span>"
            } else {
                errorMessage.innerHTML = "<span>Erreur lors de la connexion.</span>"
            }

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
