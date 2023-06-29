document.addEventListener('DOMContentLoaded', async () => {
    const passwInput = document.getElementById('passw');
    const clickLogButton = document.getElementById('ClickLog');
    const errorContainer = document.getElementById('errorContainer');
  
    passwInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        clickLogButton.click()
      }
    })

    clickLogButton.addEventListener("click", () => {
        const username = document.getElementById("uname").value
        const password = document.getElementById("passw").value

        const BaseUrl = 'http://localhost:8000'
        const endpoint = BaseUrl + "/login"

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
            localStorage.setItem("token", "Bearer " + data.token)

            // Verificar a categoria do usuário
            const endpointToken = BaseUrl + "/decode"

            const xhrToken = new XMLHttpRequest()
            xhrToken.open('GET', endpointToken, false)
            xhrToken.setRequestHeader('Content-Type', 'application/json')

            const token = "Bearer " + data.token // Adiciona o prefixo "Bearer" ao token

            xhrToken.setRequestHeader('Authorization', token); // Define o token no header

            xhrToken.send()
            
            const response = JSON.parse(xhrToken.response)

            const category = response.category
            // Redirecionar com base na categoria
            if (category === "Admin") {
                localStorage.setItem('adminId', response.id) 
                window.location.href = "/admin"   // Redirecionar para a página de administrador
            } else if (category === "Company") {
                localStorage.setItem('companyId', response.id)
                window.location.href = "/company" // Redirecionar para a página de usuário
            } else if (category === "Customer") {
                localStorage.setItem('customerId', response.id)
                window.location.href = "/main" // Redirecionar para a página de usuário
            } else {
                // Categoria desconhecida
                console.error("Categoria de usuário desconhecida");
            }
        } else {
            const data = JSON.parse(xhr.responseText)
            errorContainer.textContent = 'Erro: ' + data.error
            errorContainer.style.display = "block"
            throw new Error(data.error)
        }
    })
})
