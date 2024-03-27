
export async function addValidationLogin() {
    const loginForm = document.getElementById("loginForm")
    const errorMsg = document.querySelector(".errorMessage")

    loginForm.addEventListener("submit", validationLogin)

    function afficheErrorMessage () {
        errorMsg.innerHTML = "<span>Erreur dans l'identifiant ou le mot de passe</span>"
    }
    function validationLogin(event) {
        event.preventDefault()

        const userEmail = document.getElementById("loginEmail").value
        const loginPassword = document.getElementById("loginPassword").value

        const valideEmail = "sophie.bluel@test.tld"
        const validePassword = "S0phie"

        if (userEmail == valideEmail && loginPassword == validePassword) {
            console.log('connexion réussie')
            window.location = "index.html"

        } else {
            afficheErrorMessage ()
            console.log("Erreur dans l'identifiant ou le mot de passe")
        }
    }
}