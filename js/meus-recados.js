const meuModal = new bootstrap.Modal("#exampleModal");
const usuarioLogado = buscarDadosLocalStorage("usuarioLogado");
document.addEventListener("DOMContentLoaded", () => {
  if (!usuarioLogado.nome) {
    window.location.href = "entrar.html";
  } else {
    mostrarRecados();
  }
});

const listaRecados = usuarioLogado.recados;

const formularioHTML = document.getElementById("formularioRecados");

const tBody = document.getElementById("meus-recados");

formularioHTML.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const descricao = document.getElementById("descricao-id").value;
  const detalhamento = document.getElementById("detalhamento-id").value;

  const novoRecado = {
    descricao: descricao,
    detalhamento: detalhamento,
  };

  listaRecados.push(novoRecado);

  salvarRecados();

  mostrarRecados();

  formularioHTML.reset();
});

function salvarRecados() {
  const listaUsuario = buscarDadosLocalStorage("usuarios");

  const acharUsuario = listaUsuario.findIndex(
    (valor) => valor.nome === usuarioLogado.nome
  );

  listaUsuario[acharUsuario].recados = listaRecados;

  guardarLocalStorage("usuarios", listaUsuario);
}

function mostrarRecados() {
  tBody.innerHTML = "";

  listaRecados.forEach((valor, index) => {
    tBody.innerHTML += `
        <div class="col">
        <tr id='${index}'>
        <td>${index + 1}</td>
        <td>${valor.descricao}</td>
        <td>${valor.detalhamento}</td>
        <td>
            <button class="btn btn-danger" onclick="apagar(${index})">Apagar</button>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="prepararEdicao(${index})">Editar</button>
        </td>
    </tr>
    </div>
    `;
  });
}

function prepararEdicao(indice) {
  const inputEditarDescricao = document.getElementById("editarDescricao");
  const inputEditarDetalhamento = document.getElementById("editarDetalhamento");

  inputEditarDescricao.value = usuarioLogado.recados[indice].descricao;
  inputEditarDetalhamento.value = usuarioLogado.recados[indice].detalhamento;

  const formularioEditarRecados = document.getElementById(
    "formularioEditarRecados"
  );

  formularioEditarRecados.addEventListener("submit", (event) => {
    event.preventDefault();

    usuarioLogado.recados[indice].descricao = inputEditarDescricao.value;
    usuarioLogado.recados[indice].detalhamento = inputEditarDetalhamento.value;

    guardarLocalStorage("usuarioLogado", usuarioLogado);

    mostrarRecados();

    meuModal.hide();
  });
}

function apagar(indice) {
  const confirmacao = confirm("Tem certeza que deseja excluir este recado ?");

  if (confirmacao === true) {
    usuarioLogado.recados.splice(indice, 1);
    console.log(usuarioLogado);

    let tr = document.getElementById(indice);
    tr.remove();

    guardarLocalStorage("usuarioLogado", usuarioLogado);

    salvarRecados();

    mostrarRecados();
  } else {
    return;
  }
}

function sair() {
  salvarRecados();
  localStorage.removeItem("usuarioLogado");

  // guardarLocalStorage('usuarioLogado', usuarioDeslogado)

  window.location.href = "./entrar.html";
}

function guardarLocalStorage(chave, valor) {
  const valorJSON = JSON.stringify(valor);

  localStorage.setItem(chave, valorJSON);
}

function buscarDadosLocalStorage(chave) {
  const dadoJSON = localStorage.getItem(chave);

  if (dadoJSON) {
    const dadosConvertidos = JSON.parse(dadoJSON);
    return dadosConvertidos;
  } else {
    return {};
  }
}
