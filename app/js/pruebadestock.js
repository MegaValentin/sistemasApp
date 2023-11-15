export function prueba(){
    const stock = './app/data/stock.json'

    cargarDatos(stock)
    function cargarDatos(url) {
        fetch(url).then(res => res.json()).then(dato => {
            console.log(dato.toners)
            mostrarTabla(dato.toners)
        })
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
                    <td >
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
        asignarEventListeners()
    }
    function asignarEventListeners() {
        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const tonerId = event.target.getAttribute('data-id');
                eliminarToner(tonerId);
            });
        });
       
    }
    function eliminarToner(tonerId) {    
        

    // Busca el índice del toner con el ID correspondiente en la lista de toners
        const tonerIndex = toners.findIndex(toner => toner.id === parseInt(tonerId));

        if (tonerIndex !== -1) {
            // Elimina el toner de la lista
            toners.splice(tonerIndex, 1);
            // Actualiza la tabla
            mostrarTabla(toners);
        } else {
            console.log(`Toner con ID ${tonerId} no encontrado.`);
        }
        }
    
        asignarEventListeners()
}
