function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
}

function toggleSubMenu(element) {
    const subMenu = element.nextElementSibling;
    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
}

document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.sidebar ul li a').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const menuItems = document.querySelectorAll('#menu li a');

    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.parentElement.style.display = '';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
});

function addEquipment() {
    const name = document.getElementById('equipmentName').value;
    const code = document.getElementById('equipmentCode').value;
    const purchaseDate = document.getElementById('purchaseDate').value;
    const installationDate = document.getElementById('installationDate').value;
    const patrimony = document.getElementById('patrimony').value;

    const tableBody = document.getElementById('equipmentTableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${code}</td>
        <td>${purchaseDate}</td>
        <td>${installationDate}</td>
        <td>${patrimony}</td>
    `;

    tableBody.appendChild(row);

    // Limpar os campos do formulário
    document.getElementById('equipmentName').value = '';
    document.getElementById('equipmentCode').value = '';
    document.getElementById('purchaseDate').value = '';
    document.getElementById('installationDate').value = '';
    document.getElementById('patrimony').value = '';
}

document.getElementById('equipmentSearch').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#equipmentTableBody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const text = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        if (text.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});