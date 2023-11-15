import { deliveryDeToner } from "./js/tonerDelivery.js";
import { toDoList } from "./js/calls.js";
import { stockToner } from "./js/stock.js";
import { areas } from "./js/areas.js";


function getCurrentFileName() {
    let pathArray = window.location.pathname.split('/');
    return pathArray[pathArray.length - 1];
}

const currentFileName = getCurrentFileName();

if (currentFileName === 'toner-delivery.html') {
    deliveryDeToner();
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