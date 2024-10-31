function alternarBarraLateral() {
    const barraLateral = document.querySelector('.barra-lateral');
    const conteudo = document.querySelector('.conteudo');
    barraLateral.classList.toggle('recolhida');
    conteudo.classList.toggle('expandido');
}

function alternarSubMenu(elemento) {
    const subMenu = elemento.nextElementSibling;
    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
}

document.querySelectorAll('.barra-lateral ul li a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.barra-lateral ul li a').forEach(item => item.classList.remove('ativo'));
        this.classList.add('ativo');
    });
});

document.getElementById('campoBusca').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const itensMenu = document.querySelectorAll('#menu li a');

    itensMenu.forEach(item => {
        const texto = item.textContent.toLowerCase();
        if (texto.includes(filtro)) {
            item.parentElement.style.display = '';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
});

function adicionarEquipamento() {
    const nome = document.getElementById('nomeEquipamento').value;
    const codigo = document.getElementById('codigoEquipamento').value;
    const dataCompra = document.getElementById('dataCompra').value;
    const dataInstalacao = document.getElementById('dataInstalacao').value;
    const patrimonio = document.getElementById('patrimonio').value;

    const corpoTabela = document.getElementById('corpoTabelaEquipamentos');
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${codigo}</td>
        <td>${dataCompra}</td>
        <td>${dataInstalacao}</td>
        <td>${patrimonio}</td>
    `;

    corpoTabela.appendChild(linha);

    // Limpar os campos do formulário
    document.getElementById('nomeEquipamento').value = '';
    document.getElementById('codigoEquipamento').value = '';
    document.getElementById('dataCompra').value = '';
    document.getElementById('dataInstalacao').value = '';
    document.getElementById('patrimonio').value = '';
}

document.getElementById('buscaEquipamento').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const linhas = document.querySelectorAll('#corpoTabelaEquipamentos tr');

    linhas.forEach(linha => {
        const celulas = linha.querySelectorAll('td');
        const texto = Array.from(celulas).map(celula => celula.textContent.toLowerCase()).join(' ');
        if (texto.includes(filtro)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
});
