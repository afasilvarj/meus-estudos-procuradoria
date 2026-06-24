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
  listarQuestoes();
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

function salvarQuestao() {
  const resposta = document.getElementById('respostaMarcada').value.trim().toUpperCase();
  const gabarito = document.getElementById('gabaritoOficial').value.trim().toUpperCase();

  const questao = {
    disciplina: document.getElementById('disciplinaQuestao').value,
    aula: document.getElementById('aulaQuestao').value,
    numero: Number(document.getElementById('numeroQuestao').value),
    resposta: resposta,
    gabarito: gabarito,
    resultado: resposta === gabarito ? 'Acerto' : 'Erro'
  };

  const questoes = JSON.parse(localStorage.getItem('questoes')) || [];
  questoes.push(questao);

  localStorage.setItem('questoes', JSON.stringify(questoes));

  listarQuestoes();
}

function listarQuestoes() {
  const questoes = JSON.parse(localStorage.getItem('questoes')) || [];
  const lista = document.getElementById('listaQuestoes');

  if (!lista) return;

  lista.innerHTML = '';

  questoes.forEach((questao) => {
    const item = document.createElement('li');
    item.textContent = `${questao.disciplina} - Aula ${questao.aula} - Questão ${questao.numero}: ${questao.resultado}`;
    lista.appendChild(item);
  });
}

function exportarBackup() {
  const dados = {
    registrosEstudo: JSON.parse(localStorage.getItem('registrosEstudo')) || [],
    questoes: JSON.parse(localStorage.getItem('questoes')) || []
  };

  const blob = new Blob([JSON.stringify(dados, null, 2)], {
    type: 'application/json'
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'backup-estudos.json';
  link.click();
}

function importarBackup() {
  const arquivo = document.getElementById('arquivoBackup').files[0];

  if (!arquivo) {
    alert('Selecione um arquivo de backup.');
    return;
  }

  const leitor = new FileReader();

  leitor.onload = function(evento) {
    const dados = JSON.parse(evento.target.result);

    localStorage.setItem('registrosEstudo', JSON.stringify(dados.registrosEstudo || []));
    localStorage.setItem('questoes', JSON.stringify(dados.questoes || []));

    listarRegistros();
    listarQuestoes();

    alert('Backup importado com sucesso.');
  };

  leitor.readAsText(arquivo);
}
