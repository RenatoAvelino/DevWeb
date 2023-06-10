document.addEventListener('DOMContentLoaded', () => {
    const name = document.getElementById("name")
    const phone = document.getElementById("phone")
    const cpf = document.getElementById("cpf")
    const address = document.getElementById("address")
  
    // Obter o token JWT do armazenamento local
    const token = localStorage.getItem("token")
  
    const endpointDecodeToken = "http://localhost:8000/decode"
  
    const decodeTokenRequest = fetch(endpointDecodeToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(decodedToken => {
        const userId = decodedToken.user.id
        const endpointUser = "http://localhost:8000/customerUser-by-id/" + userId
       
        const userRequest = fetch(endpointUser)
          .then(res => res.json())
          .then(dados => {
            name.innerHTML = dados.name
            phone.innerHTML = dados.phone
            cpf.innerHTML = dados.cpf
            address.innerHTML = dados.address
          })
          .catch(error => {
            console.error(`Erro ao carregar as informações do Usuário: ${error.message}`)
            window.location.href = "/" // Redirecionar para a página "/"
          })
  
        return Promise.all([userRequest])
      })
      .then(() => {
        // Ambos os fetch foram concluídos
        console.log("Dados do Usuário carregados com sucesso.")
      })
      .catch(error => {
        // Tratar erros gerais
        console.error(`Erro ao carregar os dados: ${error.message}`)
        window.location.href = "/" // Redirecionar para a página "/"
      })
  
    Promise.all([decodeTokenRequest])
      .then(() => {
        // A solicitação de decodificação do token foi concluída
        console.log("Token decodificado com sucesso.")
      })
      .catch(error => {
        // Tratar erros gerais
        console.error(`Erro ao decodificar o token: ${error.message}`)
        window.location.href = "/" // Redirecionar para a página "/"
      })
})