// Seleciona os elementos necessários
const adicionarCartaoBtn = document.querySelector('.action-btn:nth-child(1)');
const criarListaBtn = document.querySelector('.action-btn:nth-child(2)');
const quadro = document.querySelector('.quadro');

// Função para adicionar um novo cartão
function adicionarCartao() {
    const nomeCartao = prompt('Digite o nome do cartão:');
    if (nomeCartao) {
        // Cria um novo cartão
        const novoCartao = document.createElement('div');
        novoCartao.classList.add('card');
        novoCartao.textContent = nomeCartao;

        // Cria o botão de remoção
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.classList.add('remover-btn');
        btnRemover.onclick = function () {
            novoCartao.remove(); // Remove apenas o cartão
        };

        // Adiciona o botão de remoção ao cartão
        novoCartao.appendChild(btnRemover);

        // Adiciona o cartão à lista "Para Fazer"
        const listaParaFazer = quadro.querySelector('.lista:first-child');
        listaParaFazer.appendChild(novoCartao);
    }
}

// Adiciona um evento de clique para o botão de adicionar cartão
adicionarCartaoBtn.addEventListener('click', adicionarCartao);

// Função para criar uma nova lista
function criarLista() {
    const nomeLista = prompt('Digite o nome da nova lista:');
    if (nomeLista) {
        const novaLista = document.createElement('div');
        novaLista.classList.add('lista');
        
        const tituloLista = document.createElement('h3');
        tituloLista.textContent = nomeLista;
        
        novaLista.appendChild(tituloLista);
        
        const botaoAdicionarCartao = document.createElement('button');
        botaoAdicionarCartao.textContent = 'Adicionar Cartão';
        botaoAdicionarCartao.onclick = adicionarCartao;
        
        novaLista.appendChild(botaoAdicionarCartao);
        quadro.appendChild(novaLista);
    }
}

// Adiciona um evento de clique para o botão de criar lista
criarListaBtn.addEventListener('click', criarLista);