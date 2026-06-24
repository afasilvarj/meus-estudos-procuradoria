function mostrarTela(id) {
  const telas = document.querySelectorAll('.tela');

  telas.forEach(tela => {
    tela.classList.remove('ativa');
  });

  document.getElementById(id).classList.add('ativa');
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarTela('dashboard');
  listarRegistros();
});
function salvarRegistroEstudo() {
  const registro = {
    data: document.getElementById('dataEstudo').value,
    disciplina: document.getElementById('disciplinaEstudo').value,
    tempo: Number(document.getElementById('tempoEstudo').value),
    conteudo: document.getElementById('conteudoEstudo').value
  };

  const registros = JSON.parse(localStorage.getItem('registrosEstudo')) || [];
  registros.push(registro);

  localStorage.setItem('registrosEstudo', JSON.stringify(registros));

  listarRegistros();
}

function listarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registrosEstudo')) || [];
  const lista = document.getElementById('listaRegistros');

  if (!lista) return;

  lista.innerHTML = '';

  registros.forEach((registro) => {
    const item = document.createElement('li');
    item.textContent = `${registro.data} - ${registro.disciplina} - ${registro.tempo} min - ${registro.conteudo}`;
    lista.appendChild(item);
  });
}
