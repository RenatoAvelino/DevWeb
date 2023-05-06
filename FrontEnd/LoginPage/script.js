function alterarAcessibilidade() {
    const lnk = document.getElementById('css');
    const img = document.getElementById('acessibilidade-imagem');
    const imgDark = document.getElementById('dark-light');
  
  
    if (lnk.href.includes('/FrontEnd/GeneralStyles/StyleLight.css'))  {
      // Altera a folha de estilo 
      lnk.href = '/FrontEnd/GeneralStyles/StyleAcessibilidade.css';
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho-white.png';
      imgDark.src = '/FrontEnd/Imagens/sun-white32.png';
  
    } else if (lnk.href.includes('/FrontEnd/GeneralStyles/StyleDark.css'))  {
      // Altera a folha de estilo 
      lnk.href = '/FrontEnd/GeneralStyles/StyleAcessibilidade.css';
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho-white.png';
      imgDark.src = '/FrontEnd/Imagens/sun-white32.png';
    }
    else {
      // Altera a folha de estilo 
      lnk.href = '/FrontEnd/GeneralStyles/StyleLight.css';
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho.png';
      imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
    }
    
  };
  
  function alterarTema() {
    const lnk = document.getElementById('css');
    const img = document.getElementById('acessibilidade-imagem');
    const imgDark = document.getElementById('dark-light');
  
  
    if (lnk.href.includes('/FrontEnd/GeneralStyles/StyleLight.css'))  {
      // Altera a folha de estilo 
      lnk.href = '/FrontEnd/GeneralStyles/StyleDark.css';
  
      // Altera a imagem para 
      img.src = '/FrontEnd/Imagens/olho-white.png';
      imgDark.src = '/FrontEnd/Imagens/sun-white32.png';
  
    } else if (lnk.href.includes('/FrontEnd/GeneralStyles/StyleAcessibilidade.css'))  {
      // Altera a folha de estilo 
      lnk.href = '/FrontEnd/GeneralStyles/StyleLight.css';
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho.png';
      imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
    }   else {
      // Altera a folha de estilo 
      lnk.href = '/FrontEnd/GeneralStyles/StyleLight.css';
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho.png';
      imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
  
    }
  };  