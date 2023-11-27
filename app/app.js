import { toDoList } from "./js/calls.js";
import { stockToner } from "./js/stock.js";
import { areas } from "./js/areas.js";
import { orderToner } from "./js/orderToner.js";
import { orderGenerator } from "./js/orderGenerator.js";
import { historialEntregas } from "./js/historialEntrega.js";

function getCurrentFileName() {
    let pathArray = window.location.pathname.split('/');
    return pathArray[pathArray.length - 1];
}

const currentFileName = getCurrentFileName();

if(currentFileName === 'orderToner.html'){
    orderToner();
}
else if (currentFileName === 'calls.html') {
    toDoList();
}
else if (currentFileName === 'stock.html') {
    stockToner();
}
else if (currentFileName === 'areas.html'){
    areas();
}
else if(currentFileName === "orderGenerator.html"){
    orderGenerator()
}
else if(currentFileName === "historialEntrega.html"){
    historialEntregas()
}
