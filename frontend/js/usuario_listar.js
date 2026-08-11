let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')
let tabela_container = document.getElementById('tabela_container')

// =========================================================================
// COMPORTAMENTO: LISTAR TODOS OS USUÁRIOS EM TABELA
// =========================================================================
btn_listar.addEventListener('click', () => {
    resposta.innerHTML = '<p style="color: yellow;">Buscando usuários no banco de dados...</p>'

    fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = '<p style="color: #ffaa00;">Nenhum usuário encontrado no banco de dados.</p>'
            tabela_container.innerHTML = ''
            return
        }

        resposta.innerHTML = `<p style="color: lightgreen;">Sucesso! ${dados.length} usuário(s) encontrado(s).</p>`

        let tabela = '<table><tr><th>Código</th><th>Nome</th><th>Sobrenome</th><th>Idade</th><th>E-mail</th><th>Telefone</th><th>Endereço</th><th>Cidade</th><th>Estado</th></tr>'

        for (let i = 0; i < dados.length; i++) {
            tabela += `<tr>
                <td>${dados[i].codUsuario}</td>
                <td>${dados[i].nome}</td>
                <td>${dados[i].sobrenome}</td>
                <td>${dados[i].idade}</td>
                <td>${dados[i].email}</td>
                <td>${dados[i].telefone || '-'}</td>
                <td>${dados[i].endereco || '-'}</td>
                <td>${dados[i].cidade || '-'}</td>
                <td>${dados[i].estado || '-'}</td>
            </tr>`
        }

        tabela += '</table>'
        tabela_container.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar os Usuários:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao carregar a listagem de Usuários.</p>'
    })
})
