let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

// =========================================================================
// COMPORTAMENTO: APAGAR PRODUTO POR ID
// =========================================================================
btn_apagar.addEventListener('click', () => {
    let id = document.getElementById('idProduto').value

    if (!id) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe o código do Produto para apagar!</p>'
        return
    }

    resposta.innerHTML = '<p style="color: yellow;">Processando a exclusão do Produto...</p>'

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message && dados.message.includes('não encontrado')) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
        } else {
            resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Produto apagado com sucesso!'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao apagar o Produto:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao apagar o Produto no servidor.</p>'
    })
})
