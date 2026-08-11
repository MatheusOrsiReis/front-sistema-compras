let resposta = document.getElementById('resposta')
let btn_registrar = document.getElementById('btn_registrar')

// =========================================================================
// COMPORTAMENTO: REGISTRAR COMPRA 
// =========================================================================
btn_registrar.addEventListener('click', (e) => {
    e.preventDefault()

    let idUsuario = document.getElementById('idUsuario').value
    let idProduto = document.getElementById('idProduto').value
    let tipoMovimento = document.getElementById('tipoMovimento').value
    let quantidadeMovimentada = document.getElementById('quantidadeMovimentada').value
    let descontoAplicado = document.getElementById('descontoAplicado').value
    let formaPagamento = document.getElementById('formaPagamento').value
    let statusCompra = document.getElementById('statusCompra').value
    let dataCompra = document.getElementById('dataCompra').value

    if (!idUsuario || !idProduto || !tipoMovimento || !quantidadeMovimentada || !formaPagamento || !statusCompra || !dataCompra) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Preencha todos os campos obrigatórios!</p>'
        return
    }

    let dadosCompra = {
        idUsuario: parseInt(idUsuario),
        idProduto: parseInt(idProduto),
        tipoMovimento: tipoMovimento,
        quantidadeMovimentada: parseInt(quantidadeMovimentada),
        descontoAplicado: parseFloat(descontoAplicado) || 0,
        formaPagamento: formaPagamento,
        statusCompra: statusCompra,
        dataCompra: dataCompra
    }

    resposta.innerHTML = '<p style="color: yellow;">Processando a movimentação de estoque...</p>'

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCompra)
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message && (dados.message.includes('não encontrado') || dados.message.includes('insuficiente') || dados.message.includes('Inválida') || dados.message.includes('obrigatórios'))) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
        } else {
            resposta.innerHTML = `
                <p style="color: lightgreen;">Compra registrada com sucesso!</p>
                <br>
                <p><strong>ID da Compra:</strong> ${dados.codCompra}</p>
                <p><strong>Tipo:</strong> ${dados.tipoMovimento}</p>
                <p><strong>Quantidade:</strong> ${dados.quantidadeMovimentada}</p>
                <p><strong>Preço Unitário:</strong> R$ ${parseFloat(dados.precoUnitario).toFixed(2)}</p>
                <p><strong>Desconto:</strong> ${dados.descontoAplicado}%</p>
                <p><strong>Preço Final:</strong> R$ ${parseFloat(dados.precoFinal).toFixed(2)}</p>
            `
            document.getElementById('form_compra').reset()
        }
    })
    .catch(err => {
        console.error('Erro ao registrar a Compra:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao registrar a Compra no servidor.</p>'
    })
})
