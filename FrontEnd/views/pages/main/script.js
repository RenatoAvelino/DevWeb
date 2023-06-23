document.addEventListener('DOMContentLoaded', () => {
    const BaseUrl = 'http://localhost:8000'

    const name = document.getElementById("name")
    const phone = document.getElementById("phone")
    const cpf = document.getElementById("cpf")
    const address = document.getElementById("address")
  
    // Obtem variaveis do armazenamento local
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("customerId")

    const endpointUser = BaseUrl + "/customerUser-by-id/" + userId

    const headers = {
      Authorization: token
    }
    
    fetch(endpointUser, { headers })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(`Status da requisição: ${res.status}`)
        }
      })
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
  
       
      
})