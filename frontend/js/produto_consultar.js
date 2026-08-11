let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

// =========================================================================
// COMPORTAMENTO: CONSULTAR PRODUTO POR ID
// =========================================================================
btn_consultar.addEventListener('click', () => {
    let id = document.getElementById('idProduto').value

    if (!id) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe o código do Produto para consultar!</p>'
        return
    }

    resposta.innerHTML = '<p style="color: yellow;">Consultando o Produto no banco de dados...</p>'

    fetch(`http://localhost:3000/produtos/${id}`)
    .then(res => res.json())
    .then(dados => {
        if (dados.message) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
            <p style="color: lightgreen;">Produto encontrado com sucesso!</p>
            <br>
            <p><strong>Código:</strong> ${dados.codProduto}</p>
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Descrição:</strong> ${dados.descricao || '-'}</p>
            <p><strong>Categoria:</strong> ${dados.categoria}</p>
            <p><strong>Preço:</strong> R$ ${parseFloat(dados.preco).toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${dados.desconto || 0}%</p>
            <p><strong>Estoque:</strong> ${dados.qtdeEstoque}</p>
            <p><strong>Marca:</strong> ${dados.marca || '-'}</p>
            <p><strong>Imagem:</strong> ${dados.imagem ? '<img src="' + dados.imagem + '" width="100">' : '-'}</p>
        `
    })
    .catch(err => {
        console.error('Erro ao consultar o Produto:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao consultar o Produto no servidor.</p>'
    })
})
