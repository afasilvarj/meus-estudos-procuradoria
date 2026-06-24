function mostrarTela(id) {
  const telas = document.querySelectorAll('.tela');

  telas.forEach(tela => {
    tela.classList.remove('ativa');
  });

  document.getElementById(id).classList.add('ativa');
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarTela('dashboard');
});
