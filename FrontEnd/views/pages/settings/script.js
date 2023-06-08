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
    

    const endpoint = "http://localhost:8000/customerUser-by-id/1"

    fetch(endpoint)
      .then(res => res.json())
      .then(dados => {
        name.innerHTML = dados.name
        phone.innerHTML = dados.phone
        cpf.innerHTML = dados.cpf
        birthday.innerHTML = dados.birthday
        address.innerHTML = dados.address
        email.innerHTML = dados.email
        bankAccount.innerHTML = dados.bankAccount
        gender.innerHTML = dados.gender
        language.innerHTML = dados.language
      })
      .catch(error => console.error(`Erro ao carregar: ${error.message}`))
  })
  
  
  
  
  
  
  