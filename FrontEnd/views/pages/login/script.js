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

            // Verificar a categoria do usuário
            const endpointToken = "http://localhost:8000/decode"

            const xhrToken = new XMLHttpRequest()
            xhrToken.open('POST', endpointToken, false) 
            xhrToken.setRequestHeader('Content-Type', 'application/json')

            const formDataToken = {
            token: data.token
            }
            xhrToken.send(JSON.stringify(formDataToken))

            const response = JSON.parse(xhrToken.response)
            const category = response.category

            // Redirecionar com base na categoria
            if (category === "Admin") {
                window.location.href = "/todo" // Redirecionar para a página de administrador
            } else if (category === "Company") {
                window.location.href = "/todo" // Redirecionar para a página de usuário
            } else if (category === "Customer") {
                window.location.href = "/main" // Redirecionar para a página de usuário
            } else {
                // Categoria desconhecida
                console.error("Categoria de usuário desconhecida");
            }
        } else {
            const data = JSON.parse(xhr.responseText)
            errorContainer.textContent = 'Erro:' + data.error
            errorContainer.style.display = "block"
            throw new Error(data.error)
        }
    })
})
  