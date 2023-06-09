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
  
    const userId = 1
    const endpointUser = "http://localhost:8000/customerUser-by-id/" + userId
    const endpointContract = "http://localhost:8000/customerContract-by-id/" + userId
  
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
    }
  
    const userRequest = fetch(endpointUser)
      .then(res => res.json())
      .then(dados => {
        name.innerHTML = dados.name
        phone.innerHTML = dados.phone
        cpf.innerHTML = dados.cpf
        birthday.innerHTML = formatDate(dados.birthday)
        address.innerHTML = dados.address
        email.innerHTML = dados.email
        bankAccount.innerHTML = dados.bankAccount
        gender.innerHTML = dados.gender
        language.innerHTML = dados.language
      })
      .catch(error => console.error(`Erro ao carregar as informações do Usuário: ${error.message}`))
  
    const contractRequest = fetch(endpointContract)
      .then(res => res.json())
      .then(dados => {
        contractId.innerHTML = dados.id
        contractStart.innerHTML = formatDate(dados.startDate)
        contractEnd.innerHTML = formatDate(dados.endDate)
      })
      .catch(error => console.error(`Erro ao carregar as informações do Contrato: ${error.message}`))
  
    Promise.all([userRequest, contractRequest])
      .then(() => {
        // Ambos os fetch foram concluídos
        console.log("Dados do Usuário e do Contrato carregados com sucesso.")
      })
      .catch(error => {
        // Tratar erros gerais
        console.error(`Erro ao carregar os dados: ${error.message}`)
      })
  })
  
  


  
  
  
  
  
  
  