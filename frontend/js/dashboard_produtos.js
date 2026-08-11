let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')
let cards_container = document.getElementById('cards_container')

btn_listar.addEventListener('click', () => {
    resposta.innerHTML = '<p style="color: yellow;">Carregando painel de produtos...</p>'

    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = '<p style="color: #ffaa00;">Nenhum produto cadastrado no catálogo.</p>'
            cards_container.innerHTML = ''
            return
        }

        resposta.innerHTML = `<p style="color: lightgreen;">Sucesso! ${dados.length} produto(s) carregado(s).</p>`

        let cardsHTML = ''

        for (let i = 0; i < dados.length; i++) {
            let p = dados[i]
            let imagemSrc = p.imagem && p.imagem.startsWith('http') ? p.imagem : 'https://via.placeholder.com/250x150?text=Sem+Imagem'
            
            cardsHTML += `
            <div class="card">
                <img src="${imagemSrc}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/250x150?text=Sem+Imagem'">
                <h3>${p.nome}</h3>
                <p><strong>Categoria:</strong> ${p.categoria}</p>
                <p><strong>Marca:</strong> ${p.marca || 'N/A'}</p>
                <p class="price">R$ ${parseFloat(p.preco).toFixed(2)}</p>
                <p class="stock">Estoque: ${p.qtdeEstoque} un.</p>
            </div>`
        }

        cards_container.innerHTML = cardsHTML
    })
    .catch(err => {
        console.error('Erro ao carregar o Dashboard:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao carregar o Dashboard de Produtos.</p>'
    })
})
