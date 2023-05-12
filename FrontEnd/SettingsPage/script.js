function alterarImagens() {
    const links = document.querySelectorAll('link[href*=".css"]');
    const imgs = Array.from(document.getElementsByClassName("ButtonImages"));

    if (links[0].href.includes("StyleLight.css"))  {  
      // Altera a imagem 
      imgs.forEach((img) => {
        img.src= img.src.replace('-white.png', '.png');
      });
    } else if (links[0].href.includes("StyleDark.css")){
       // Altera a imagem 
      imgs.forEach((img) => {
        img.src= img.src.replace('.png', '-white.png');
      });
    } else if (links[0].href.includes("StyleAcessibilidade.css") && !(imgs[0].src.includes("-white"))){
        // Altera a imagem 
       imgs.forEach((img) => {
         img.src= img.src.replace('.png', '-white.png');
       });
     }  
  };