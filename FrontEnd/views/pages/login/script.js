document.addEventListener('DOMContentLoaded', async () => {
    const clickLogButton = document.getElementById("ClickLog")
    const errorContainer = document.getElementById("errorContainer")

    clickLogButton.addEventListener("click", () => {
        const username = document.getElementById("uname").value
        const password = document.getElementById("passw").value

        const endpoint = "http://localhost:8000/login"

        const xhr = new XMLHttpRequest()
        xhr.open('POST', endpoint, false) // O terceiro parâmetro define a requisição síncrona
        xhr.setRequestHeader('Content-Type', 'application/json')

        const formData = {
        login: username,
        password: password
        }

        xhr.send(JSON.stringify(formData))

        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText)
            //Salva o token JWT
            localStorage.setItem("token", data.token)
            // Navegar para a página "/main"
            window.location.href = "/main"
        } else {
            const data = JSON.parse(xhr.responseText)
            errorContainer.textContent = 'Erro:' + data.error
            errorContainer.style.display = "block"
            throw new Error(data.error)
        }
    })
})
  