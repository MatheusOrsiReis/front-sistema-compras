let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

// =========================================================================
// COMPORTAMENTO: APAGAR USUÁRIO POR ID
// =========================================================================
btn_apagar.addEventListener('click', () => {
    let id = document.getElementById('idUsuario').value

    if (!id) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe o código do Usuário para apagar!</p>'
        return
    }

    resposta.innerHTML = '<p style="color: yellow;">Processando a exclusão do Usuário...</p>'

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message && dados.message.includes('não encontrado')) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
        } else {
            resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Usuário apagado com sucesso!'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao apagar o Usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao apagar o Usuário no servidor.</p>'
    })
})
