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
    const nome = document.getElementById("nome");
    const numero = document.getElementById("numero");
    const cpf = document.getElementById("cpf");
    const endpoint = "http://localhost:8000/test"

    fetch(endpoint)
      .then(res => res.json())
      .then(dados => {
        console.log(dados);
        nome.innerHTML = dados.Nome;
        numero.innerHTML = dados.telefone;
        cpf.innerHTML = dados.cpf;
      })
      .catch(error => console.error(`Erro ao carregar: ${error.message}`))
  })
  
  
  
  
  
  
  