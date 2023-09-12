const toner = []
    const area = []
    
    const entrega = [{toner:"toner1", area:"area1", cantidad:1}]

    const fillSect = function(categoria, select){
        for(let i= 0; i < categoria.legth; i++){
            const option = document.createElemt("option")
            option.value = categoria[i]
            option.innerHTML = categoria[i]
            select.appendChild(option)
        }
    }

    const entregaToner = document.forms["toner-delivery"]
    const agregarEntrega = function(event){
        event.preventDefault();
        const target = event.target;
        const element = target.elements
        const toner = element["toners"]
        const area = element["area"]
        const cantidad = element["cantidad"]

        if(toner.value.trim().legth < 2){
            alert("Minimo mas de 2 caracteres")
            return
        }
        if(area.value.trim().legth < 3){
            alert("El area debe tener 3 caracteres minimo")
            return
        }
        if(isNaN(cantidad.value) || parseInt(cantidad.value) < 1){
            alert("Minimo 1")
            return
        }
        entrega.push({
            toner:toner.value,
            area: area.value,
            cantidad:parseInt(cantidad.value)
        })
        alert("La entrega a sido exitosa")
        console.log(entrega)
        return target.reset()
    }
    entregaToner.addEventListener("submit", agregarEntrega)