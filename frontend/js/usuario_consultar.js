let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

// =========================================================================
// COMPORTAMENTO: CONSULTAR USUÁRIO POR ID
// =========================================================================
btn_consultar.addEventListener('click', () => {
    let id = document.getElementById('idUsuario').value

    if (!id) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Informe o código do Usuário para consultar!</p>'
        return
    }

    resposta.innerHTML = '<p style="color: yellow;">Consultando o Usuário no banco de dados...</p>'

    fetch(`http://localhost:3000/usuarios/${id}`)
    .then(res => res.json())
    .then(dados => {
        if (dados.message) {
            resposta.innerHTML = `<p style="color: #ffaa00;">${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
            <p style="color: lightgreen;">Usuário encontrado com sucesso!</p>
            <br>
            <p><strong>Código:</strong> ${dados.codUsuario}</p>
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Sobrenome:</strong> ${dados.sobrenome}</p>
            <p><strong>Idade:</strong> ${dados.idade}</p>
            <p><strong>E-mail:</strong> ${dados.email}</p>
            <p><strong>Telefone:</strong> ${dados.telefone || '-'}</p>
            <p><strong>Endereço:</strong> ${dados.endereco || '-'}</p>
            <p><strong>Cidade:</strong> ${dados.cidade || '-'}</p>
            <p><strong>Estado:</strong> ${dados.estado || '-'}</p>
        `
    })
    .catch(err => {
        console.error('Erro ao consultar o Usuário:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao consultar o Usuário no servidor.</p>'
    })
})
