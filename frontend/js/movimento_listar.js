let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')
let tabela_container = document.getElementById('tabela_container')

// =========================================================================
// COMPORTAMENTO: LISTAR TODASCOMPRAS/MOVIMENTAÇÕES
// =========================================================================
btn_listar.addEventListener('click', () => {
    resposta.innerHTML = '<p style="color: yellow;">Buscando histórico de compras no banco de dados...</p>'

    fetch('http://localhost:3000/compras')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = '<p style="color: #ffaa00;">Nenhuma movimentação encontrada no histórico.</p>'
            tabela_container.innerHTML = ''
            return
        }

        resposta.innerHTML = `<p style="color: lightgreen;">Sucesso! ${dados.length} movimentação(ões) encontrada(s).</p>`

        let tabela = '<table><tr><th>ID</th><th>Usuário</th><th>Produto</th><th>Tipo</th><th>Qtde</th><th>Preço Unit.</th><th>Desconto</th><th>Preço Final</th><th>Pagamento</th><th>Status</th><th>Data</th></tr>'

        for (let i = 0; i < dados.length; i++) {
            let nomeUsuario = dados[i].usuarioCompra ? dados[i].usuarioCompra.nome + ' ' + dados[i].usuarioCompra.sobrenome : 'ID: ' + dados[i].idUsuario
            let nomeProduto = dados[i].produtoCompra ? dados[i].produtoCompra.nome : 'ID: ' + dados[i].idProduto

            tabela += `<tr>
                <td>${dados[i].codCompra}</td>
                <td>${nomeUsuario}</td>
                <td>${nomeProduto}</td>
                <td>${dados[i].tipoMovimento}</td>
                <td>${dados[i].quantidadeMovimentada}</td>
                <td>R$ ${parseFloat(dados[i].precoUnitario).toFixed(2)}</td>
                <td>${dados[i].descontoAplicado}%</td>
                <td>R$ ${parseFloat(dados[i].precoFinal).toFixed(2)}</td>
                <td>${dados[i].formaPagamento}</td>
                <td>${dados[i].statusCompra}</td>
                <td>${dados[i].dataCompra}</td>
            </tr>`
        }

        tabela += '</table>'
        tabela_container.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar o Histórico de Compras:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao carregar o Histórico de Compras.</p>'
    })
})
