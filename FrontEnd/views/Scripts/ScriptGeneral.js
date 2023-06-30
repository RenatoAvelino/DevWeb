var font = 1;

function alterarTema() {
  const html = document.querySelector('html');
  const imgDark = document.getElementById('dark-light');
  const imgMin = document.getElementById('font-changers-min');
  const imgMax = document.getElementById('font-changers-plus');

  const temaAtual = html.classList.contains('dark-mode') ? 'dark' : 'light';

  html.classList.toggle('dark-mode');

  if (html.classList.contains('dark-mode')) {
    imgDark.src = '/Imagens/sun32.png';
    imgMax.src = '/Imagens/zoom-plus.png';
    imgMin.src = '/Imagens/zoom-min.png';
    localStorage.setItem('tema', 'dark');
  } else {
    imgDark.src = '/Imagens/lua-minguante.png';
    imgMax.src = '/Imagens/zoom-plus-black.png';
    imgMin.src = '/Imagens/zoom-min-black.png';
    localStorage.setItem('tema', 'light');
  }

  if (temaAtual !== html.classList.contains('dark-mode')) {
    try{
      alterarImagens()
    }
    catch{
      {}
    }
  }
}

// Verificar o tema armazenado e fonte e aplicar as imagens corretas ao carregar cada página
document.addEventListener('DOMContentLoaded', function() {
  const temaArmazenado = localStorage.getItem('tema');
  const fonteAtual = localStorage.getItem('fonte');

  if (temaArmazenado === 'dark') {
    const html = document.querySelector('html');
    const imgDark = document.getElementById('dark-light');
    const imgMin = document.getElementById('font-changers-min');
    const imgMax = document.getElementById('font-changers-plus');

    html.classList.add('dark-mode');
    imgDark.src = '/Imagens/sun32.png';
    imgMax.src = '/Imagens/zoom-plus.png';
    imgMin.src = '/Imagens/zoom-min.png';
    try{
      alterarImagens()
    }
    catch{
      {}
    }
  }
  
  font = 1;
  if(fonteAtual == 'min'){
    diminuirFonte();
  } else if(fonteAtual == 'max'){
    aumentarFonte();
  }
});

// Aumentar a fonte (max testado = 23)
function aumentarFonte(){
  //document.documentElement.style.setProperty('--font-size', '21px');
  switch (font) {
    case 0:
      document.documentElement.style.setProperty('--font-size', '17px');
      font = 1;
      localStorage.setItem('fonte', 'padrao');
      break;
    case 1:
      document.documentElement.style.setProperty('--font-size', '21px');
      localStorage.setItem('fonte', 'max');
      font = 2;
      break;
    default:
      break;
  }
  
}

// Diminuir a fonte (min testado = 10)
function diminuirFonte(){
  document.documentElement.style.setProperty('--font-size', '13px');
  switch (font) {
    case 1:
      document.documentElement.style.setProperty('--font-size', '13px');
      localStorage.setItem('fonte', 'min');
      font = 0;
      break;
    case 2:
      document.documentElement.style.setProperty('--font-size', '17px');
      localStorage.setItem('fonte', 'padrao');
      font = 1;
      break;
    default:
      break;
  }

}

function logOut(){
  window.location.href = "/"
}

function goToMain(){
  const BaseUrl = 'http://localhost:8000'
  const endpoint = BaseUrl + "/decode/"

  const token = localStorage.getItem("token")
  const headers = {
    Authorization: token
  }
  
  fetch(endpoint, { headers })
    .then(res => {
      if (res.status === 200) {
        return res.text()
      } else {
        throw new Error(`Status da requisição: ${res.status}`)
      }
    })
    .then(res =>{
      const data = JSON.parse(res)

      // Redirecionar com base na categoria
      if (data.category === "Admin") {
        localStorage.setItem('adminId', data.id) 
        window.location.href = "/admin"   // Redirecionar para a página de administrador
      } else if (data.category === "Company") {
          localStorage.setItem('companyId', data.id)
          window.location.href = "/company" // Redirecionar para a página de usuário
      } else if (data.category === "Customer") {
          localStorage.setItem('customerId', data.id)
          window.location.href = "/main" // Redirecionar para a página de usuário
      } else {
          // Categoria desconhecida
          console.error("Categoria de usuário desconhecida");
      }
    })
    .catch(error => {
      console.error(`Erro: ${error.message}`)
      //window.location.href = "/" // Redirecionar para a página "/"
    })
}