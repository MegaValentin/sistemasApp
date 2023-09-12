export function deliveryDeToner(){
    
    let idToner = 0;
    
    const envio = []

    const toner = document.querySelector('#toners')
    const area = document.querySelector('#area')
    const cantidad = document.querySelector('#cantidad')

    tonerDelivery.addEventListener("submit", (event) => {
        event.preventDefault();
        entrega();
    });

    let entrega = () =>{
        idToner++

        let selectedToner = toner.value;
        let selectedArea = area.value;
        let selectedQuantity = cantidad.value

        const tonerDelivery = {id:idToner, toner:selectedToner, area:selectedArea, cantidad:selectedQuantity}
        
        envio.push(tonerDelivery)

        toner.value = "";
        area.value = "";
        cantidad.value = ""
        
        console.log(envio)
    }
    

}

   
    

