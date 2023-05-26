function alterarImagens() {
    const html = document.querySelector('html')
    const imgs = Array.from(document.getElementsByClassName("AmbSoc"));
  

    if (html.classList.contains('dark-mode')) {
      imgs.forEach((img) => {
        img.src= img.src.replace('.png', '-white.png');
      });
      } else {
        imgs.forEach((img) => {
          img.src= img.src.replace('-white.png', '.png');
        });
      }
  };