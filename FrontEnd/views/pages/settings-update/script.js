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
  document.getElementById('BSave').addEventListener('click', handleUpdadeClick)

  function handleUpdadeClick(){
    var name = document.getElementById("name").value
    var phone = document.getElementById("phone").value
    var cpf = document.getElementById("cpf").value
    var birthday = document.getElementById("birthday").value
    var address = document.getElementById("address").value
    var email = document.getElementById("email").value
    var bankAccount = document.getElementById("bankAccount").value
    var gender = document.getElementById("gender").value
    var language = document.getElementById("language").value


    const data = {
      name,
      phone,
      cpf,
      birthday,
      address,
      email,
      bankAccount,
      gender,
      language
    };
    
    console.log(JSON.stringify(data))
  }
})
