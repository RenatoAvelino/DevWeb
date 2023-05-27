function alterarImagens() {
  const html = document.querySelector('html');
  const imgs = Array.from(document.getElementsByClassName("AmbSoc"));
  const temaAtual = html.classList.contains('dark-mode') ? 'dark' : 'light';

  imgs.forEach((img) => {
    const src = img.src;

    if (temaAtual === 'dark' && !src.includes('-white.png')) {
      const newSrc = src.replace('.png', '-white.png');
      img.src = newSrc;
    } else if (temaAtual === 'light' && src.includes('-white.png')) {
      const newSrc = src.replace('-white.png', '.png');
      img.src = newSrc;
    }
  });
}
