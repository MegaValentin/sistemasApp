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
        
        delivery.innerHTML += `
        <div class="delivery" id="${idToner}">
        Toner: ${selectedToner}, Area: ${selectedArea}, Cantidad: ${selectedQuantity}
            <img src="./app/img/icons8-basura-100.png" class="closeBtn">
        </div>
        `
        console.log(envio)
        toner.value = "";
        area.value = "";
        cantidad.value = ""
        
        
    }

    delivery.addEventListener("click", (event) => {
        console.log(event.srcElement.parentNode.id);
        if (event.srcElement.nodeName == "IMG") {
          deleteDelivery(event.srcElement.parentNode.id);
        }
        
    });

    let deleteDelivery = (id) => {
    let deliveryToDelete = document.getElementById(id);
    delivery.removeChild(deliveryToDelete);
    
    };

}

   
    

