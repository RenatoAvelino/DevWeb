function alterarAcessibilidade() {
    //const lnk = document.getElementById('css');
    const links = document.querySelectorAll('link[href*=".css"]');
    const img = document.getElementById('acessibilidade-imagem');
    const imgDark = document.getElementById('dark-light');
  
  
    if (links[0].href.includes("StyleLight.css"))  {
      // Altera a folha de estilo 
      links.forEach((link) => {
        link.href = link.href.replace('/StyleLight.css', '/StyleAcessibilidade.css');
      });
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho-white.png';
      imgDark.src = '/FrontEnd/Imagens/sun-white32.png';
  
    } else if (links[0].href.includes("StyleDark.css"))  {
      // Altera a folha de estilo 
      links.forEach((link) => {
        link.href = link.href.replace('/StyleDark.css', '/StyleAcessibilidade.css');
      });
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho-white.png';
      imgDark.src = '/FrontEnd/Imagens/sun-white32.png';
    }
    else if (links[0].href.includes("StyleAcessibilidade.css")){
      // Altera a folha de estilo 
      links.forEach((link) => {
        link.href = link.href.replace('/StyleAcessibilidade.css', '/StyleLight.css');
      });
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho.png';
      imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
    }
    
  };
  
  function alterarTema() {
    const links = document.querySelectorAll('link[href*=".css"]');
    const img = document.getElementById('acessibilidade-imagem');
    const imgDark = document.getElementById('dark-light');
  
  
    if (links[0].href.includes("StyleLight.css"))  {
      // Altera a folha de estilo 
      links.forEach((link) => {
        link.href = link.href.replace('/StyleLight.css', '/StyleDark.css');
      });
  
      // Altera a imagem para 
      img.src = '/FrontEnd/Imagens/olho-white.png';
      imgDark.src = '/FrontEnd/Imagens/sun-white32.png';
  
    } else if (links[0].href.includes("StyleAcessibilidade.css"))  {
      // Altera a folha de estilo 
      links.forEach((link) => {
        link.href = link.href.replace('/StyleAcessibilidade.css', '/StyleLight.css');
      })
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho.png';
      imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
    }   else if (links[0].href.includes("StyleDark.css")) {
      // Altera a folha de estilo 
      links.forEach((link) => {
        link.href = link.href.replace('/StyleDark.css', '/StyleLight.css');
      })
  
      // Altera a imagem 
      img.src = '/FrontEnd/Imagens/olho.png';
      imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
  
    }
  };  