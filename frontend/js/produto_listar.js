let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')
let tabela_container = document.getElementById('tabela_container')

// =========================================================================
// COMPORTAMENTO: LISTAR TODOS OS PRODUTOS EM TABELA
// =========================================================================
btn_listar.addEventListener('click', () => {
    resposta.innerHTML = '<p style="color: yellow;">Buscando produtos no banco de dados...</p>'

    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = '<p style="color: #ffaa00;">Nenhum produto encontrado no banco de dados.</p>'
            tabela_container.innerHTML = ''
            return
        }

        resposta.innerHTML = `<p style="color: lightgreen;">Sucesso! ${dados.length} produto(s) encontrado(s).</p>`

        let tabela = '<table><tr><th>Código</th><th>Nome</th><th>Descrição</th><th>Categoria</th><th>Preço</th><th>Desconto (%)</th><th>Estoque</th><th>Marca</th><th>Imagem</th></tr>'

        for (let i = 0; i < dados.length; i++) {
            tabela += `<tr>
                <td>${dados[i].codProduto}</td>
                <td>${dados[i].nome}</td>
                <td>${dados[i].descricao || '-'}</td>
                <td>${dados[i].categoria}</td>
                <td>R$ ${parseFloat(dados[i].preco).toFixed(2)}</td>
                <td>${dados[i].desconto || 0}%</td>
                <td>${dados[i].qtdeEstoque}</td>
                <td>${dados[i].marca || '-'}</td>
                <td>${dados[i].imagem ? '<img src="' + dados[i].imagem + '" width="50">' : '-'}</td>
            </tr>`
        }

        tabela += '</table>'
        tabela_container.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar os Produtos:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao carregar a listagem de Produtos.</p>'
    })
})
