
export function stockToner(){
    const stock = '/app/data/stock.json'
    console.log("stock de toners")
    cargarDatos(stock)
    function cargarDatos(url) {
        fetch(url).then(res => res.json()).then(dato => {
            console.log(dato.productos)
            actualizarTabla(dato.toners)
        })
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