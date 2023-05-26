
  function alterarTema() {
    const html = document.querySelector('html')
    const imgDark = document.getElementById('dark-light');
  
    html.classList.toggle('dark-mode')

    if (html.classList.contains('dark-mode')) {
        imgDark.src = '/FrontEnd/Imagens/sun32.png';
      } else {
        imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
      }
  } 