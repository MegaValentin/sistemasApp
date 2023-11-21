export function areas() {
  console.log("control de areas");

  const areas = './app/data/areas.json';

    cargarDatos(areas);
    
    let areasList = [];
    
    function cargarDatos(url) {
        fetch(url)
            .then(res => res.json())
            .then(dato => {
                areasList = dato.areas
                actualizarTabla(areasList);
            });
    }
    function actualizarTabla(dato) {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = '';
      dato.forEach(areas => {
          const {id,area} = areas;
           tbody.innerHTML += `
              <tr>
                  <td>${id}</td>
                  <td>${area}</td>
                  
                  <td>
                      <button class="editBtn" data-id="${id}" data-toner="${area}">Editar</button>
                      <button class="deleteBtn" data-id="${id}">Eliminar</button>
                  </td>
              </tr>
          `; 
      });
      asignarEventListeners();
  }
  const tableContainer = document.getElementById('tableOfficeContainer');
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Area</th>
                       
                        <th>Acciones</th>
                        <th class="mas"><a href="#addToner" class="mas">+</a></th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const area of areas) {
            tableHTML += `
                <tr>
                    <td>${area.id}</td>
                    <td>${area.area}</td>
                    
                    <td>
                        <button class="editBtn" data-id="${area.id}" data-toner="${area.area}" >Editar</button>
                        <button class="deleteBtn" data-id="${area.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        }

        tableHTML += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = tableHTML;

        function asignarEventListeners(){
          const editBtn = document.querySelectorAll('.editBtn');
          editBtn.forEach(editBtn => {
              editBtn.addEventListener('click', () => formEditArea(areasList, editBtn));
          })
      
          const deleteButtons = document.querySelectorAll('.deleteBtn');
          deleteButtons.forEach(deleteBtn => {
              deleteBtn.addEventListener('click', () => eliminarArea(areasList, deleteBtn));
          });
  
      }
      function eliminarArea(areas, button) {
        const areaId = button.getAttribute('data-id');

        const areaIndex = areas.findIndex(area => area.id === parseInt(areaId));

        if (areaIndex !== -1) {
            areas.splice(areaIndex, 1);
            actualizarTabla(areas);
        } else {
            console.log(`Toner with ID ${areaId} not found.`);
        }
    }
}
