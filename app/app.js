import { toDoList } from "./js/calls.js";
import { stockToner } from "./js/stock.js";
import { areas } from "./js/areas.js";
import { pedidoToner } from "./js/pedidoToner.js";


function getCurrentFileName() {
    let pathArray = window.location.pathname.split('/');
    return pathArray[pathArray.length - 1];
}

const currentFileName = getCurrentFileName();

if(currentFileName === 'pedidoToner.html'){
    pedidoToner();
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
