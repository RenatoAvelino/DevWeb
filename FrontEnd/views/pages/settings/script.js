function alterarImagens() {
    const html = document.querySelector('html');
    const imgs = Array.from(document.getElementsByClassName("ButtonImages"));
    const temaAtual = html.classList.contains('dark-mode') ? 'dark' : 'light';
  
    imgs.forEach((img) => {
      const src = img.src;
  
      if (temaAtual === 'light' && !src.includes('-white.png')) {
        const newSrc = src.replace('.png', '-white.png');
        img.src = newSrc;
      } else if (temaAtual === 'dark' && src.includes('-white.png')) {
        const newSrc = src.replace('-white.png', '.png');
        img.src = newSrc;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const BaseUrl = 'http://localhost:8000'

    const name = document.getElementById("name")
    const phone = document.getElementById("phone")
    const cpf = document.getElementById("cpf")
    const birthday = document.getElementById("birthday")
    const address = document.getElementById("address")
    const email = document.getElementById("email")
    const bankAccount = document.getElementById("bankAccount")
    const gender = document.getElementById("gender")
    const language = document.getElementById("language")
    const contractId = document.getElementById("contractId")
    const contractStart = document.getElementById("contractStart")
    const contractEnd = document.getElementById("contractEnd")
  
    // Obter o token JWT do armazenamento local
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("customerId")

    const endpointUser = BaseUrl + "/customerUser-by-id/" + userId
    const endpointContract = BaseUrl + "/customerContract-by-id/" + userId

    const formatDate = (date) => {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
    }
  
    const headers = {
      Authorization: token
    }
    const userRequest = fetch(endpointUser, { headers })
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
        if(dados.birthday){
          birthday.innerHTML = formatDate(dados.birthday)
        }
        address.innerHTML = dados.address
        email.innerHTML = dados.email
        bankAccount.innerHTML = dados.bank_account
        if(dados.gender){
          gender.innerHTML = dados.gender
        }
        if(dados.language){
          language.innerHTML = dados.language
        }
      })
      .catch(error => {
        console.error(`Erro ao carregar as informações do Usuário: ${error.message}`)
        //window.location.href = "/" // Redirecionar para a página "/"
      })

    const contractRequest = fetch(endpointContract, { headers })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(`Status da requisição: ${res.status}`)
        }
      })
      .then(dados => {
        contractId.innerHTML = dados.id
        contractStart.innerHTML = formatDate(dados.startDate)
        contractEnd.innerHTML = formatDate(dados.endDate)
      })
      .catch(error => {
        console.error(`Erro ao carregar as informações do Contrato: ${error.message}`)
        //window.location.href = "/main" // Redirecionar para a página "/"
      })

    return Promise.all([userRequest, contractRequest])
})
  