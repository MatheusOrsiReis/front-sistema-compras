let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

// =========================================================================
// COMPORTAMENTO: ATUALIZAR PRODUTO POR ID
// =========================================================================
btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('idProduto').value

    if (!id) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe o código do Produto para atualizar!</p>'
        return
    }

    let dadosAtualizados = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: document.getElementById('preco').value,
        desconto: document.getElementById('desconto').value,
        qtdeEstoque: document.getElementById('qtdeEstoque').value,
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    }

    resposta.innerHTML = '<p style="color: yellow;">Atualizando o Produto no banco de dados...</p>'

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message && dados.message.includes('não encontrado')) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
        } else {
            resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Produto atualizado com sucesso!'}</p>`
        }
    })
    .catch(err => {
        console.error('Erro ao atualizar o Produto:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao atualizar o Produto no servidor.</p>'
    })
})
