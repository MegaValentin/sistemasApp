export function pedidoToner(){
    const listaStock = './app/data/stock.json';
    const listaAreas = './app/data/areas.json';
    let lista = []
    function options(url, option) {
        if(option === "stock"){
            fetch(url)
            .then(res => res.json())
            .then(dato => {
                
                lista = dato.toners;
                console.log(lista);
            });
            
        }else if(option === "areas"){
            
            fetch(url)
                .then(res => res.json())
                .then(dato => {
                    lista = dato.areas;
                    console.log(lista)
                });
        }
        }
    
    options(listaStock, "stock")
    options(listaAreas, "areas")
    
   
}