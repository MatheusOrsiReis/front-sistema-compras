let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')
let tabela_container = document.getElementById('tabela_container')

btn_listar.addEventListener('click', () => {
    resposta.innerHTML = '<p style="color: yellow;">Buscando relatório de volume de compras...</p>'

    fetch('http://localhost:3000/relatorio/volume-compras')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = '<p style="color: #ffaa00;">Nenhuma movimentação de saída registrada.</p>'
            tabela_container.innerHTML = ''
            return
        }

        resposta.innerHTML = `<p style="color: lightgreen;">Sucesso! ${dados.length} registro(s) encontrado(s).</p>`

        let tabela = '<table><tr><th>Nome do Produto</th><th>Quantidade Total Movimentada</th><th>Valor Financeiro Movimentado</th></tr>'

        for (let i = 0; i < dados.length; i++) {
            tabela += `<tr>
                <td>${dados[i].nome}</td>
                <td>${dados[i].quantidade_total_movimentada}</td>
                <td style="color: lightgreen; font-weight: bold;">R$ ${parseFloat(dados[i].valor_financeiro_movimentado).toFixed(2)}</td>
            </tr>`
        }

        tabela += '</table>'
        tabela_container.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar Volume de Compras:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao carregar o Relatório Analítico.</p>'
    })
})
