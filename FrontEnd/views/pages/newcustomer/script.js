function alterarImagens() {
  const html = document.querySelector('html')
  const imgs = Array.from(document.getElementsByClassName("ButtonImages"))
  const temaAtual = html.classList.contains('dark-mode') ? 'dark' : 'light'

  imgs.forEach((img) => {
    const src = img.src

    if (temaAtual === 'light' && !src.includes('-white.png')) {
      const newSrc = src.replace('.png', '-white.png')
      img.src = newSrc
    } else if (temaAtual === 'dark' && src.includes('-white.png')) {
      const newSrc = src.replace('-white.png', '.png')
      img.src = newSrc
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('BSave').addEventListener('click', handleCreateCustomerClick)

  function handleCreateCustomerClick() {
    const login = document.getElementById('username').value
    const password = document.getElementById('password').value
    const category = "Customer"

    const startDate = document.getElementById('contractStart').value
    const endDate = document.getElementById('contractEnd').value

    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    const cpf = document.getElementById('cpf').value
    const birthday = document.getElementById('birthday').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const bankAccount = document.getElementById('bankAccount').value
    const gender = document.getElementById('gender').value
    const language = document.getElementById('language').value

    const accountData = {
      login,
      password,
      category
    }
    const contractData = {
      startDate: startDate ? startDate : new Date().toISOString().split('T')[0],
      endDate: endDate ? endDate : new Date().toISOString().split('T')[0]
    }
    const customerData = {
      name,
      phone,
      cpf,
      birthday,
      address,
      email,
      bankAccount,
      gender,
      language
    }

    const BaseUrl = 'http://localhost:8000'
    const token = localStorage.getItem('token')

    const endpointCustomerUser = BaseUrl + "/customerUser-create"
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }

    fetch(endpointCustomerUser, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(customerData)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Status da requisição: ${response.status}`)
        }
      })
      .then(response => {
        const customerId = response.id
        localStorage.setItem('customerId', customerId)

        const endpointAccount = BaseUrl + "/account-create/" + customerId
        const endpointContract = BaseUrl + "/contract-create/" + customerId

        fetch(endpointAccount, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(accountData)
        })
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error(`Status da requisição: ${response.status}`)
            }
          })
          .then(response => {
            fetch(endpointContract, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(contractData)
            })
              .then(response => {
                if (response.ok) {
                  return response.json()
                } else {
                  throw new Error(`Status da requisição: ${response.status}`)
                }
              })
              .catch(error => {
                console.error(`Erro ao criar o contrato do cliente: ${error.message}`)
              })
          })
          .catch(error => {
            console.error(`Erro ao criar a conta do cliente: ${error.message}`)
          })
      })
      .catch(error => {
        console.error(`Erro ao criar o cliente: ${error.message}`)
      })
  }
})
