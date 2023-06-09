document.addEventListener('DOMContentLoaded', () => {
    const clickLogButton = document.getElementById("ClickLog")
    const errorContainer = document.getElementById("errorContainer")
  
    clickLogButton.addEventListener("click", () => {
        const username = document.getElementById("uname").value
        const password = document.getElementById("passw").value

        const endpoint = "http://localhost:8000/login"

        // Crie um objeto para enviar os dados do formulário no corpo da solicitação
        const formData = {
        login: username,
        password: password
        };

        fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
            if (!res.error) {
                // Verifica se existe mensagem de erro
                return res
            } else {
                //Dispara novo erro
                throw new Error(res.error)
            }
        })
        .then(data => {
            // Salvar o token JWT no localStorage
            localStorage.setItem("token", data.token)

            // Navegar para a página "/main"
            window.location.href = "/main"
        })
        .catch(error => {
            // Exibir mensagem de erro usando notificação push ou mensagem embutida
            const errorContainer = document.getElementById("errorContainer")
            // Opção 3: Notificação push
            if (window.Notification && window.Notification.permission === "granted") {
            new Notification({ body: error})
            }
            // Opção 4: Mensagem embutida
            errorContainer.textContent = error
            errorContainer.style.display = "block"
        })      
    })
})
  