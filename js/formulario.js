
let listaUsuarios = buscarDadosDoLocalStorage('usuarios')
const cadastroHTML = window.document.getElementById('formulario-cadastro')

// document.addEventListener('DOMContentLoaded', () => {
//     const usuarioLogado = localStorage.getItem('usuarioLogado')

//     if(!usuarioLogado) {
//         window.location.href = './entrar.html'
//     }
// })


cadastroHTML.addEventListener('submit', (ev) => {
    // previne o comportamento padrão do submit - remove o refresh
    ev.preventDefault()

    const inputNome = window.document.getElementById('nome')
    const inputSenha = window.document.getElementById('senha')
    const inputRepassword = window.document.getElementById('repassword')

    // verificar se oq o usuario digitou em password é igual ao que digitou em repassword
    const feedbackHTML = window.document.getElementById('feedback')

    if (inputSenha.value !== inputRepassword.value) {

        feedbackHTML.innerHTML = '<p style="color: red">As senhas não conferem, verifique sua senha e tente novamente</p>'

        setTimeout(() => {
            feedbackHTML.innerHTML = ''
        }, 2000)
        return;
    }

    const novoUsuario = {
        nome: inputNome.value,
        senha: inputSenha.value,
        recados: []
    }

    const existe = listaUsuarios.some((valor) => valor.nome === inputNome.value)

    if (existe) {
        alert('Este nome de usuario já existe')

        return;
    }

    listaUsuarios.push(novoUsuario)

    armazenarDadosUsuarioLocalStorage('usuarios', listaUsuarios)


    cadastroHTML.reset()
    alert('Usuario cadastrado com Sucesso')
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
        return []
    }
}