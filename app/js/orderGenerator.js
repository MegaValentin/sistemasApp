export function orderGenerator(){
    const stockIdeal = document.getElementById('stockIdeal');
    
    async function cargarDatos() {
        try {
            const responseStock = await fetch('./app/data/stock.json');
            const responseRecomendados = await fetch('./app/data/stockRecomendado.json');
    
            if (!responseStock.ok || !responseRecomendados.ok) {
                throw new Error('Error al cargar los datos.');
            }
    
            const stock = await responseStock.json();
            const recomendados = await responseRecomendados.json();
            
            
            actualizarStock(stock.toners, recomendados.recomendado);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }
    
    function actualizarStock(stock, recomendados) {
        
        const tablaStockActualizado  = document.createElement('table');
        tablaStockActualizado.id = 'stockIdeal';
        tablaStockActualizado.innerHTML = `
            <thead>
                <tr>
                    <th>Toner</th>
                    <th>Cantidad Agregada</th>
                </tr>
            </thead>
            <tbody id="tablaStockActualizado">
            </tbody>
        `;

        recomendados.forEach(recomendado => {
            const tonerStock = stock.find(toner => toner.id === recomendado.id);
    
            if (tonerStock) {

                if (tonerStock.cantidad < recomendado.cantidad) {
                    const cantidadNecesaria = recomendado.cantidad - tonerStock.cantidad;
                    tonerStock.cantidad += cantidadNecesaria;
    
                    console.log(`Se agregaron ${cantidadNecesaria} unidades de ${recomendado.toner}. Nuevo stock: ${tonerStock.cantidad}`);
                    agregarFilaATabla(tablaStockActualizado , recomendado.toner, cantidadNecesaria);
                }
            } else {
                console.warn(`Toner ${recomendado.toner} no encontrado en el stock.`);
            }
        });
    
        stockIdeal.appendChild(tablaStockActualizado )
    }
    function agregarFilaATabla(tabla, toner, cantidad) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${toner}</td>
            <td>${cantidad}</td>
        `;
        tabla.querySelector('#tablaStockActualizado').appendChild(fila);
    }
    
    cargarDatos();
}