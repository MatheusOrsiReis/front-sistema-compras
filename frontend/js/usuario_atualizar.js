let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

// =========================================================================
// COMPORTAMENTO: ATUALIZAR USUÁRIO POR ID
// =========================================================================
btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('idUsuario').value

    if (!id) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe o código do Usuário para atualizar!</p>'
        return
    }

    let dadosAtualizados = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        idade: document.getElementById('idade').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    }

    resposta.innerHTML = '<p style="color: yellow;">Atualizando o Usuário no banco de dados...</p>'

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message && dados.message.includes('não encontrado')) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
        } else {
            resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Usuário atualizado com sucesso!'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao atualizar o Usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao atualizar o Usuário no servidor.</p>'
    })
})
