let listaUsuarios = buscarDadosDoLocalStorage('usuarios')


const formulario = document.getElementById('formulario-usuario')


formulario.addEventListener('submit', (ev) => {
  ev.preventDefault()

  const usuario = document.getElementById('nome').value
  const senha = document.getElementById('senha').value

  const usuarioEncontrado = listaUsuarios.find((valor) => valor.nome === usuario && valor.senha === senha)

  if (!usuarioEncontrado) {
    alert('Usuario ou senha estão incorretos ou não existem')
    return;
  } else {
    armazenarDadosUsuarioLocalStorage('usuarioLogado', usuarioEncontrado)
    window.location.href = './meus-recados.html'
  }


})


function armazenarDadosUsuarioLocalStorage(chave, valor) {
  const valorJSON = JSON.stringify(valor)
  localStorage.setItem(chave, valorJSON)
}




function buscarDadosDoLocalStorage(chave) {
  const dadosJSON = localStorage.getItem(chave)
  if (dadosJSON) {
    const dadosConvertidos = JSON.parse(dadosJSON)
    return dadosConvertidos;
  } else {
    return {}
  }
}