 function alterarAcessibilidade() {
  const lnk = document.getElementById('css');
  const img = document.getElementById('acessibilidade-imagem');
  const imgDark = document.getElementById('dark-light');


  if (lnk.href.includes('/FrontEnd/MainPage/style/StyleLight.css'))  {
    // Altera a folha de estilo 
    lnk.href = '/FrontEnd/MainPage/style/StyleAcessibilidade.css';

    // Altera a imagem 
    img.src = '/FrontEnd/olho-white.png';
    imgDark.src = '/FrontEnd/sun-white32.png';

  } else if (lnk.href.includes('/FrontEnd/MainPage/style/StyleDark.css'))  {
    // Altera a folha de estilo 
    lnk.href = '/FrontEnd/MainPage/style/StyleAcessibilidade.css';

    // Altera a imagem 
    img.src = '/FrontEnd/olho-white.png';
    imgDark.src = '/FrontEnd/sun-white32.png';
  }
  else {
    // Altera a folha de estilo 
    lnk.href = '/FrontEnd/MainPage/style/StyleLight.css';

    // Altera a imagem 
    img.src = '/FrontEnd/olho.png';
    imgDark.src = '/FrontEnd/lua-minguante.png';
  }
  
};

function alterarTema() {
  const lnk = document.getElementById('css');
  const img = document.getElementById('acessibilidade-imagem');
  const imgDark = document.getElementById('dark-light');


  if (lnk.href.includes('/FrontEnd/MainPage/style/StyleLight.css'))  {
    // Altera a folha de estilo 
    lnk.href = '/FrontEnd/MainPage/style/StyleDark.css';

    // Altera a imagem para 
    img.src = '/FrontEnd/olho-white.png';
    imgDark.src = '/FrontEnd/sun-white32.png';

  } else if (lnk.href.includes('/FrontEnd/MainPage/style/StyleAcessibilidade.css'))  {
    // Altera a folha de estilo 
    lnk.href = '/FrontEnd/MainPage/style/StyleLight.css';

    // Altera a imagem 
    img.src = '/FrontEnd/olho.png';
    imgDark.src = '/FrontEnd/lua-minguante.png';
  }   else {
    // Altera a folha de estilo 
    lnk.href = '/FrontEnd/MainPage/style/StyleLight.css';

    // Altera a imagem 
    img.src = '/FrontEnd/olho.png';
    imgDark.src = '/FrontEnd/lua-minguante.png';

  }
};




