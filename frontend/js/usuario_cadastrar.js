let resposta = document.getElementById('resposta')
let btn_cadastrar_manual = document.getElementById('btn_cadastrar_manual')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO 1: CADASTRO MANUAL DO USUÁRIO
// =========================================================================
btn_cadastrar_manual.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let idade = document.getElementById('idade').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value
    let endereco = document.getElementById('endereco').value
    let cidade = document.getElementById('cidade').value
    let estado = document.getElementById('estado').value

    if (!nome || !sobrenome || !idade || !email) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Preencha todos os campos obrigatórios!</p>'
        return
    }

    // Envia como array de 1 elemento para reaproveitar a rota de carga em lote
    let usuario = [{
        nome: nome,
        sobrenome: sobrenome,
        idade: parseInt(idade),
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        estado: estado
    }]

    fetch('http://localhost:3000/usuarios/carga-lote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Usuário cadastrado com sucesso!'}</p>`
        document.getElementById('form_manual').reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar o Usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao cadastrar o Usuário no servidor.</p>'
    })
})

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Buscando registros na API DummyJSON (https://dummyjson.com/users)...</p>'

    // 1. Consome os dados da API pública externa de usuários
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(dadosExternos => {
        resposta.innerHTML = '<p style="color: cyan;">Dados recebidos com sucesso! Transmitindo lote para o back-end...</p>'
        
        // 2. Repassa o array bruto (.users) diretamente ao endpoint de carga em lote
        return fetch('http://localhost:3000/usuarios/carga-lote', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosExternos.users)
        })
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga em lote finalizada com sucesso!'}</p>`
    })
    .catch(err => {
        console.error('Erro na carga em lote:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao processar os dados da carga em lote no servidor local.</p>'
    })
})
