
export function stockToner(){
   
    console.log("stock de toners")

    const stock = [
        {id:1, toner:'32A', stock:10},
        {id:2, toner:'32A', stock:1},
        {id:3, toner:'32A', stock:3},
        {id:4, toner:'32A', stock:6},
        {id:5, toner:'32A', stock:8},
        {id:6, toner:'32A', stock:9},
        {id:7, toner:'32A', stock:10},
        {id:8, toner:'32A', stock:2},
        {id:9, toner:'32A', stock:23},
        {id:10, toner:'32A', stock:1},
        {id:11, toner:'32A', stock:6},
        {id:12, toner:'32A', stock:7},
        {id:13, toner:'32A', stock:13},
        {id:14, toner:'32A', stock:19},
        {id:15, toner:'32A', stock:4},
        {id:16, toner:'32A', stock:9},
        {id:17, toner:'32A', stock:5},
        {id:18, toner:'32A', stock:2},
        {id:19, toner:'32A', stock:3},
        {id:20, toner:'32A', stock:7},
    ]
    
    function actualizarTabla() {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
    
        for (const toner of stock) {
            tbody.innerHTML += `
                <tr>
                    <td>${toner.id}</td>
                    <td>${toner.toner}</td>
                    <td>${toner.stock}</td>
                    <td>
                        <button class="editBtn" data-id="${toner.id}" data-toner="${toner.toner}" data-stock="${toner.stock}">Editar</button>
                        <button class="deleteBtn" data-id="${toner.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        }
    
        asignarEventListeners();
    }

    const tableContainer = document.getElementById('table-container');
    const addFormContainer = document.getElementById('addFormContainer')
    const editFormContainer = document.getElementById('editFormContainer')

    //Agregar toner
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
    //Tabla de stock
    let tableHTML = 
    `
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
    for (const toner of stock) {
        tableHTML += `
            <tr>
                <td>${toner.id}</td>
                <td>${toner.toner}</td>
                <td>${toner.stock}</td>
                <td >
                    <button class="editBtn" data-id="${toner.id}" data-toner="${toner.toner}" data-stock="${toner.stock}">Editar</button>
                    <button class="deleteBtn" data-id="${toner.id}">Eliminar</button>
                </td>
            </tr>
        `;
    }
    tableHTML += 
    `
        </tbody>
    </table>
    `;
    tableContainer.innerHTML = tableHTML;
    

    function asignarEventListeners() {
        const editButtons = document.querySelectorAll('.editBtn');
        editButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const tonerId = event.target.getAttribute('data-id');
                const tonerToner = event.target.getAttribute('data-toner')
                const tonerStock = event.target.getAttribute('data-stock')

                abrirVistaModificacion(tonerId, tonerToner, tonerStock);
            });
        });

        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const tonerId = event.target.getAttribute('data-id');
                eliminarToner(tonerId);
            });
        });
       
    }
    
    function abrirVistaModificacion(tonerId) {
        
        let editFormHTML = 
        `
            <h3>Editar Toner</h3>
            <form action="#" id="editToner" class="editToner">
                <input type="text" placeholder="Toner" id="editInk" required/>
                <input type="number" placeholder="Cantidad" id="editQuantityToner" required/>
                <input type="submit" value="Editar" id="editar"/>
            </form>
        `;
    
        editFormContainer.innerHTML = editFormHTML;

        const tonerIndex = stock.findIndex(toner => toner.id == tonerId);
        if (tonerIndex !== -1) {
            editToner.addEventListener("submit", (event) => {
                event.preventDefault();
                editarToner(tonerIndex);
                let editFormHTML = ` `;
                editFormContainer.innerHTML = editFormHTML;
            });
 
        } else {
            console.log(`Toner con ID ${tonerId} no encontrado.`);
        }
    
        
    }
    function editarToner(tonerIndex){
        const editInk = document.querySelector('#editInk')
        const editQuantityToner = document.querySelector('#editQuantityToner')
        
        stock[tonerIndex].toner = editInk.value;
        stock[tonerIndex].stock = editQuantityToner.value;
        
        console.log(`Toner editado: ${JSON.stringify(stock[tonerIndex])}`);

        
        actualizarTabla();
    }
   
    function eliminarToner(tonerId) {    
       // Buscar el índice del toner con el ID dado
       const tonerIndex = stock.findIndex(toner => toner.id == tonerId);
       console.log(`Eliminar ${tonerId}`);
        if (tonerIndex !== -1) {
        // Eliminar el toner de la lista
            stock.splice(tonerIndex, 1);

            actualizarTabla();
            asignarEventListeners();
        }
    }
    
    asignarEventListeners();

}