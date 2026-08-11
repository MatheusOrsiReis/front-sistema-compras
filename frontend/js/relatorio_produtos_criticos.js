let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')
let tabela_container = document.getElementById('tabela_container')

btn_listar.addEventListener('click', () => {
    resposta.innerHTML = '<p style="color: yellow;">Buscando relatório de produtos críticos...</p>'

    fetch('http://localhost:3000/relatorio/produtos-criticos')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = '<p style="color: #ffaa00;">Nenhum produto crítico encontrado (estoque < 10).</p>'
            tabela_container.innerHTML = ''
            return
        }

        resposta.innerHTML = `<p style="color: lightgreen;">Sucesso! ${dados.length} registro(s) encontrado(s).</p>`

        let tabela = '<table><tr><th>Código do Produto</th><th>Nome</th><th>Categoria</th><th>Quantidade Atual (Estoque)</th></tr>'

        for (let i = 0; i < dados.length; i++) {
            tabela += `<tr>
                <td>${dados[i].codigo_produto}</td>
                <td>${dados[i].nome}</td>
                <td>${dados[i].categoria}</td>
                <td style="color: red; font-weight: bold;">${dados[i].quantidade_atual}</td>
            </tr>`
        }

        tabela += '</table>'
        tabela_container.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar Produtos Críticos:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao carregar o Relatório Analítico.</p>'
    })
})
