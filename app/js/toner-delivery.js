export function entregaToner() {
    let idToner = 0;
    const envio = []
    const toner = document.querySelector('#toner')
    const area = document.querySelector("#area")
    const cantidad = document.querySelector("#cantidad")

    tonerDelivery.addEventListener("submit", (event) => {
        event.preventDefault();
        entrega();
    });

    let entrega = () =>{
        idToner++

        let toner = toner.value;
        let area = area.value;
        let cantidad = cantidad.value

        const entregaToner = {
            toner:toner,
            area:area,
            cantidad:area
        }

        envio.push(entregaToner)
    }
    console.log()
}
   
    

