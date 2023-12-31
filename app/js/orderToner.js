import  cargarOptions  from "./utility.js";
import { obtenerNombreSeleccionado } from "./utility.js";

export function orderToner() {
    
    const listaStock = './app/data/stock.json';
    const listaAreas = './app/data/areas.json';
    const historialEntregas = [];

    
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
            <a href="./orderGenerator.html" class="area"><img src="./app/img/recomendado.png" alt=""></a>
            <a href="./historialEntrega.html" class="area"><img src="./app/img/historial.png" alt=""></a>
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
