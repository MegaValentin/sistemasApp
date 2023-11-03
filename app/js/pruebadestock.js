export function prueba() {
    const stock = './app/data/stock.json';

    cargarDatos(stock);

    
    let toners = [];

    function cargarDatos(url) {
        fetch(url)
            .then(res => res.json())
            .then(dato => {
                
                toners = dato.toners;
                mostrarTabla(toners);
            });
    }

    function mostrarTabla(toners) {
        const tableContainer = document.getElementById('table-container');
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Toner</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                        <th class="mas"><a href="#addToner" class="mas">+</a></th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const toner of toners) {
            tableHTML += `
                <tr>
                    <td>${toner.id}</td>
                    <td>${toner.toner}</td>
                    <td>${toner.cantidad}</td>
                    <td>
                        <button class="editBtn" data-id="${toner.id}" data-toner="${toner.toner}" data-stock="${toner.cantidad}">Editar</button>
                        <button class="deleteBtn" data-id="${toner.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        }

        tableHTML += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = tableHTML;
        
        const editBtn = document.querySelectorAll('.editBtn');
        editBtn.forEach(editBtn => {
            editBtn.addEventListener('click', () => editarToner(toners, editBtn));
        })

        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => eliminarToner(toners, deleteBtn));
        });
    }

    function eliminarToner(toners, button) {
        const tonerId = button.getAttribute('data-id');

        const tonerIndex = toners.findIndex(toner => toner.id === parseInt(tonerId));

        if (tonerIndex !== -1) {
            toners.splice(tonerIndex, 1);
            mostrarTabla(toners);
        } else {
            console.log(`Toner with ID ${tonerId} not found.`);
        }
    }
    function editarToner(toner, button){
        const editFormContainer = document.getElementById('editFormContainer')
        
    }
}
