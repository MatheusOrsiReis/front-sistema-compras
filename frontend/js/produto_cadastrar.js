let resposta = document.getElementById('resposta')
let btn_cadastrar_manual = document.getElementById('btn_cadastrar_manual')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO: CADASTRO MANUAL DO PRODUTO
// =========================================================================
btn_cadastrar_manual.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let categoria = document.getElementById('categoria').value
    let preco = document.getElementById('preco').value
    let desconto = document.getElementById('desconto').value
    let qtdeEstoque = document.getElementById('qtdeEstoque').value
    let marca = document.getElementById('marca').value
    let imagem = document.getElementById('imagem').value

    if (!nome || !categoria || !preco || !qtdeEstoque) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Preencha todos os campos obrigatórios!</p>'
        return
    }

    let produto = [{
        nome: nome,
        descricao: descricao,
        categoria: categoria,
        preco: parseFloat(preco),
        desconto: parseFloat(desconto) || 0,
        qtdeEstoque: parseInt(qtdeEstoque),
        marca: marca,
        imagem: imagem
    }]

    fetch('http://localhost:3000/produtos/carga-lote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Produto cadastrado com sucesso!'}</p>`
        document.getElementById('form_manual').reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar o Produto:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao cadastrar o Produto no servidor.</p>'
    })
})

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Buscando catálogos de produtos na API DummyJSON...</p>'

    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(dadosExternos => {
        resposta.innerHTML = '<p style="color: cyan;">Dados recebidos com sucesso! Transmitindo lote para o back-end...</p>'
        
        return fetch('http://localhost:3000/produtos/carga-lote', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosExternos.products)
        })
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga estrutural de produtos realizada com sucesso!'}</p>`
    })
    .catch(err => {
        console.error('Erro na carga em lote de produtos:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao processar os dados da carga de produtos em lote.</p>'
    })
})
