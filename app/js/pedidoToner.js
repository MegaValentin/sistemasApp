export function pedidoToner() {

    const listaStock = './app/data/stock.json';
    const listaAreas = './app/data/areas.json';
    const historialEntregas = [];

    async function cargarOptions(url, select, propertyName) {
        const data = await fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error al cargar opciones:', error));

        if (data && Array.isArray(data[propertyName])) {
            data[propertyName].forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.text = item.area || item.toner; 
                select.add(option);
            });
        } else {
            console.error('La propiedad "' + propertyName + '" no es un array en los datos:', data);
        }
    }

    async function obtenerNombreSeleccionado(url, selectedId, propertyName) {
        const data = await fetch(url)
            .then(res => res.json())
            .catch(error => {
                console.error('Error al obtener el nombre del elemento seleccionado:', error);
                return 'Error';
            });

        const selectedItem = data[propertyName].find(item => item.id == selectedId);
        return selectedItem ? selectedItem.area || selectedItem.toner : 'No encontrado';
    }
    const formulario = document.getElementById('formToner')
    const formHTML = `

        <h1>Pedido de Toner</h1>
        <form action="#" id="pedidoForm" class="pedidoToner">
            <label for="areaSelect">Área:</label>
            <select id="areaSelect" name="area" required>
                <option value="" disabled selected>Selecciona un área</option>
            </select>
            
            <label for="tonerSelect">Toner:</label>
            <select id="tonerSelect" name="toner" required>
                <option value="" disabled selected>Selecciona un toner</option>
            </select>
            
            <label for="cantidadToner">Cantidad:</label>
            <input type="number" placeholder="Cantidad" id="cantidadToner" name="cantidad" required/>
            
            <input type="submit" value="Realizar Pedido" id="realizarPedido"/>
        </form>
        <div class="control">
            <a href="./stock.html" class="stock"><img src="./app/img/stock.png" alt=""></a>
            <a href="./areas.html" class="area"><img src="./app/img/areas.png" alt=""></a>
        </div>
    `;
    formulario.innerHTML = formHTML;

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        await realizarPedido();
        borrarValores()
    });

    function borrarValores() {
        document.getElementById('areaSelect').selectedIndex = 0;
        document.getElementById('tonerSelect').selectedIndex = 0;
        document.getElementById('cantidadToner').value = '';
    }

    async function realizarPedido() {
        const selectedAreaId = areaSelect.value;
        const selectedTonerId = tonerSelect.value;
        const cantidad = document.getElementById('cantidadToner').value;
        const selectedAreaName = await obtenerNombreSeleccionado(listaAreas, selectedAreaId, 'areas');
        const selectedTonerName = await obtenerNombreSeleccionado(listaStock, selectedTonerId, 'toners');

        const entrega = {"AREA": selectedAreaName, "TONER": selectedTonerName, "CANTIDAD": cantidad};
       
        historialEntregas.push(entrega)
        console.log(historialEntregas);
        if(cantidad > 1){
            await mensajeEntrega(`Se entregaron ${cantidad} (${selectedTonerName}) para ${selectedAreaName}`)
        }else{
            await mensajeEntrega(`Se entregó un ${selectedTonerName} para ${selectedAreaName}`)
        }
        
    }
 
    async function mensajeEntrega(mensaje){
        const mensajeDiv = document.createElement('div')
        mensajeDiv.classList.add('mensaje')
        mensajeDiv.textContent = mensaje

        document.body.appendChild(mensajeDiv)

        setTimeout(() => {
            mensajeDiv.remove()
        },3000)
    }
    cargarOptions(listaAreas, areaSelect, 'areas');
    cargarOptions(listaStock, tonerSelect, 'toners');
    
    
}
