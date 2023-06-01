function alterarTema() {
  const html = document.querySelector('html');
  const imgDark = document.getElementById('dark-light');
  const temaAtual = html.classList.contains('dark-mode') ? 'dark' : 'light';

  html.classList.toggle('dark-mode');

  if (html.classList.contains('dark-mode')) {
    imgDark.src = '/FrontEnd/Imagens/sun32.png';
    localStorage.setItem('tema', 'dark');
  } else {
    imgDark.src = '/FrontEnd/Imagens/lua-minguante.png';
    localStorage.setItem('tema', 'light');
  }

  if (temaAtual !== html.classList.contains('dark-mode')) {
    alterarImagens();
  }
}

// Verificar o tema armazenado e aplicar as imagens corretas ao carregar cada página
document.addEventListener('DOMContentLoaded', function() {
  const temaArmazenado = localStorage.getItem('tema');

  if (temaArmazenado === 'dark') {
    const html = document.querySelector('html');
    const imgDark = document.getElementById('dark-light');
    html.classList.add('dark-mode');
    imgDark.src = '/FrontEnd/Imagens/sun32.png';
    alterarImagens();
  }
});

// Aumentar a fonte (max testado = 23)
function aumentarFonte(){
  document.documentElement.style.setProperty('--font-size', '21px');

}

// Diminuir a fonte (min testado = 10)
function diminuirFonte(){
  document.documentElement.style.setProperty('--font-size', '13px');

}