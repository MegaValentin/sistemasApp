export function stockToner() {
    const stock = './app/data/stock.json';

    cargarDatos(stock);
    
    let toners = [];
    
    function cargarDatos(url) {
        fetch(url)
            .then(res => res.json())
            .then(dato => {
                
                toners = dato.toners;
                actualizarTabla(toners);
            });
    }

    function actualizarTabla(dato) {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        dato.forEach(toners => {
            const {id,toner,cantidad} = toners;
             tbody.innerHTML += `
                <tr>
                    <td>${id}</td>
                    <td>${toner}</td>
                    <td>${cantidad}</td>
                    <td>
                        <button class="editBtn" data-id="${id}" data-toner="${toner}" data-stock="${cantidad}">Editar</button>
                        <button class="deleteBtn" data-id="${id}">Eliminar</button>
                    </td>
                </tr>
            `; 
        });
        asignarEventListeners();
    }

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
    function asignarEventListeners(){
        const editBtn = document.querySelectorAll('.editBtn');
        editBtn.forEach(editBtn => {
            editBtn.addEventListener('click', () => formEditToner(toners, editBtn));
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
            actualizarTabla(toners);
        } else {
            console.log(`Toner with ID ${tonerId} not found.`);
        }
    }
    //Agregar toner
    /*
    const addFormContainer = document.getElementById('addFormContainer')
    let formHTML = 
    `
        <h3>Agregar Toner</h3>
        <form action="#" id="addToner" class="addBtn">
            <input type="text" placeholder="Toner" id="ink" required/>
            <input type="number" placeholder="Cantidad" id="quantityToner" required/>
            <input type="submit" value="+" id="pedido"/>
        </form>
    `;
    
    addFormContainer.innerHTML = formHTML;
    addToner.addEventListener("submit", (event) => {
        event.preventDefault();
        agregarToner();
    });
    const ink = document.querySelector('#ink')
    const quantityToner = document.querySelector('#quantityToner')
    
    function agregarToner(){

        let selectedToner = ink.value;
        let selectedQuantity = quantityToner.value
        let ultimaId;
        for (const toner of stock) {
            ultimaId = toner.id
        }
        ultimaId++
        const addStock = {id:ultimaId,toner:selectedToner, stock:selectedQuantity}

        stock.push(addStock)
        
        ink.value = "";
        quantityToner.value = ""
        
        console.log(stock)

        actualizarTabla();
        asignarEventListeners();

    }
    asignarEventListeners()*/
}
