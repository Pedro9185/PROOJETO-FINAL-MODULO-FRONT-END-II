const usuarioLogado = buscarDadosStorage("usuarioLogado");
document.addEventListener("DOMContentLoaded", () => {
  if (!usuarioLogado.nome) {
    window.location.href = "entrar.html";
  } else {
    mostrarRecados();
  }
});

let indiceAtualizacao = -1; // inicia com um valor inválido para indices de lista pois não esta ainda no modo atualização
document.addEventListener("DOMContentLoaded", mostrarRecados);

const listaRecados = buscarDadosStorage("recados");
const modalCadastro = new bootstrap.Modal("#modal-criar");
const modalExcluir = new bootstrap.Modal("#modal-excluir");
const modalAtualizar = new bootstrap.Modal("#modal-atualizar");

const toastDiv = document.getElementById("toast-app");
const toastBS = new bootstrap.Toast(toastDiv);

const formCadastro = document.getElementById("form-cadastro");
const formAtualizar = document.getElementById("form-atualizar");

formCadastro.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (!formCadastro.checkValidity()) {
    formCadastro.classList.add("was-validated");
    return;
  }

  // ta tudo válido
  const descricao = document.getElementById("descricao");
  const detalhamento = document.getElementById("detalhamento");

  const novoRecado = {
    id: gerarId(),
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  };

  

  listaRecados.push(novoRecado);
  salvarDadosStorage("recados", listaRecados);
  modalCadastro.hide();
  formCadastro.classList.remove("was-validated");
  formCadastro.reset();
  mostrarRecados();
  mostrarAlerta("success", "Recado salvo com sucesso!");
});

formAtualizar.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (!formAtualizar.checkValidity()) {
    formAtualizar.classList.add("was-validated");
    return;
  }

  const descricaoAtualizado = document.getElementById(
    "descricao-atualizar"
  ).value;
  const detalhamentoAtualizado = document.getElementById(
    "detalhamento-atualizar"
  ).value;

  // daqui pra baixo a lógica de atualizar

  // lista
  listaRecados[indiceAtualizacao].descricao = descricaoAtualizado;
  listaRecados[indiceAtualizacao].detalhamento = detalhamentoAtualizado;

  // atualizar storage
  salvarDadosStorage("recados", listaRecados);

  // atualizar html
  mostrarRecados();

  modalAtualizar.hide();
  formAtualizar.classList.remove("was-validated");
  formAtualizar.reset();
  mostrarAlerta("success", "recado atualizado com sucesso!");
  indiceAtualizacao = -1;
});

function mostrarRecados() {
  const tbody = document.getElementById("lista-recados");

  tbody.innerHTML = "";

  listaRecados.forEach((recado, indice) => {
    tbody.innerHTML += `
            <tr id="${recado.id}">
                <td>${indice + 1}</td>
                <td>${recado.descricao}</td>
                <td>${recado.detalhamento}</td>
                <td>
                    <button class="btn btn-success m-1" aria-label="Editar" onclick="mostrarModalAtualizar(${indice})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger m-1" aria-label="Apagar" onclick="mostrarModalExcluir(${indice}, ${
      recado.id
    })">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
        `;
  });
}

function mostrarModalExcluir(indiceRecado, idRecado) {
  console.log(idRecado);
  modalExcluir.show();
  const botaoExcluir = document.getElementById("btn-delete");

  botaoExcluir.setAttribute(
    "onclick",
    `apagarRecado(${indiceRecado}, ${idRecado})`
  );
}

function apagarRecado(indiceRecado, idContato) {
  listaRecados.splice(indiceRecado, 1);

  salvarDadosStorage("recados", listaRecados);

  // linhas na tabela - atualizar/excluir HTML
  const trExcluir = document.getElementById(idContato);
  trExcluir.remove();

  modalExcluir.hide();
  mostrarAlerta("success", "Recado excluido com sucesso!");
}

function mostrarModalAtualizar(indiceRecado) {
  console.log(indiceRecado);
  const recadoAtualizar = listaRecados[indiceRecado];

  modalAtualizar.show();
  const descricaoAtualizar = document.getElementById("descricao-atualizar");
  const detalhamentoAtualizar = document.getElementById(
    "detalhamento-atualizar"
  );

  descricaoAtualizar.value = recadoAtualizar.descricao;
  detalhamentoAtualizar.value = recadoAtualizar.detalhamento;

  console.log(detalhamentoAtualizar.value);

  indiceAtualizacao = indiceRecado;
}

// função para gerar um número aleatório
function gerarId() {
  return new Date().getTime();
}

// salvar no localStorage - setItem
function salvarDadosStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

// buscar as informações salvas no localStorage - getItem
function buscarDadosStorage(chave) {
  const resultado = localStorage.getItem(chave);

  return JSON.parse(resultado) ?? [];
}

// mostrar um alerta/toast toda vez que for executada alguma operação
// independentemente de sucesso ou falha
function mostrarAlerta(tipo, mensagem) {
  toastDiv.classList.add(`text-bg-${tipo}`);

  const espacoMensagem = document.getElementById("espaco-mensagem");
  espacoMensagem.innerHTML = mensagem;

  toastBS.show();

  setTimeout(() => {
    toastBS.hide();

    toastDiv.classList.remove(`text-bg-${tipo}`);
  }, 5000);
}

function sair() {
  localStorage.removeItem("usuarioLogado");

  window.location.href = "./index.html";
}
