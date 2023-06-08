document.addEventListener('DOMContentLoaded', () => {
    const clickLogButton = document.getElementById("ClickLog")
    const errorContainer = document.getElementById("errorContainer")
  
    clickLogButton.addEventListener("click", () => {
      const username = document.getElementById("uname").value;
      const password = document.getElementById("passw").value;

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
        .then(data => {
          // Manipule a resposta do servidor após o login
          console.log(data);
        })
        .catch(error => {
            // Exibir mensagem de erro usando notificação push ou mensagem embutida
            const errorContainer = document.getElementById("errorContainer")
            const errorMessage = '<%= errorMessage %>'
            //const errorMessage = `Erro no login: ${error.message}`;
            // Opção 3: Notificação push
            if (window.Notification && window.Notification.permission === "granted") {
              new Notification("Erro", { body: errorMessage });
            }
            // Opção 4: Mensagem embutida
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = "block";
        })
    });
  });
  