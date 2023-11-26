export default async function cargarOptions(url, select, propertyName)  {
    const data = await fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error al cargar opciones:', error));

    if (data && Array.isArray(data[propertyName])) {
        data[propertyName].forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.text = item.area || item.toner; 
            select.add(option);
        });
    } else {
        console.error('La propiedad "' + propertyName + '" no es un array en los datos:', data);
    }
}
