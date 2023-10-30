export function areas() {
  console.log("control de areas");

  const areas = [
    { id: 1, area: "area1" },
    { id: 2, area: "area1" },
    { id: 3, area: "area1" },
    { id: 4, area: "area1" },
    { id: 5, area: "area1" },
    { id: 6, area: "area1" },
    { id: 7, area: "area1" },
    { id: 8, area: "area1" },
    { id: 9, area: "area1" },
    { id: 10, area: "area1" },
    { id: 11, area: "area1" },
    { id: 12, area: "area1" },
    { id: 13, area: "area1" },
    { id: 14, area: "area1" },
    { id: 15, area: "area1" },
    { id: 16, area: "area1" },
    { id: 17, area: "area1" },
    { id: 18, area: "area1" },
    { id: 19, area: "area1" },
    { id: 20, area: "area1" },
  ];

  const tableOfficeContainer = document.getElementById("tableOfficeContainer");
  const addOfficeFormContainer = document.getElementById(
    "addOfficeFormContainer"
  );
  const editOfficeFormContainer = document.getElementById(
    "editOfficeFormContainer"
  );

  function actualizarTablaArea() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    for (const area of areas) {
      tbody.innerHTML += `
                <tr>
                    <td>${area.id}</td>
                    <td>${area.area}</td>
                    <td >
                        <button class="editBtn" data-id="${area.id}">Editar</button>
                        <button class="deleteBtn" data-id="${area.id}">Eliminar</button>
                    </td>
                </tr>
            `;
    }

    asignarEventListeners();
  }

  let formOfficeHTML = `
    <h3>Agregar Area</h3>
    <form action="#" id="addOffice" class="addOffice">
        <input type="text" placeholder="Area" id="office" required/>
        <input type="submit" value="+" id="pedido"/>
    </form>
    `;
  addOfficeFormContainer.innerHTML = formOfficeHTML;
  addOffice.addEventListener("submit", (event) => {
    event.preventDefault();
    agregarArea();
  });
  const office = document.querySelector("#office");

  function agregarArea() {
    let selectedOffice = office.value;
    let ultimaId;
    for (const area of areas) {
      ultimaId = area.id;
    }
    ultimaId++;
    const addOffices = { id: ultimaId, area: selectedOffice };

    areas.push(addOffices);

    office.value = "";

    console.log(areas);
    actualizarTablaArea();
    asignarEventListeners();
  }
  let tableHTML = `
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Area</th>
                <th>Acciones</th>
                <th class="mas"><a href="#addOffice" class="mas">+</a></th>
            </tr>
        </thead>
        <tbody>
    `;
  for (const area of areas) {
    tableHTML += `
            <tr>
                <td>${area.id}</td>
                <td>${area.area}</td>
                <td >
                    <button class="editBtn" data-id="${area.id}">Editar</button>
                    <button class="deleteBtn" data-id="${area.id}">Eliminar</button>
                </td>
            </tr>
        `;
  }
  tableHTML += `
        </tbody>
    </table>
    `;
  tableOfficeContainer.innerHTML = tableHTML;

  function asignarEventListeners() {
    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const officeId = event.target.getAttribute("data-id");

        abrirVistaModificacionArea(officeId);
      });
    });

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const officeId = event.target.getAttribute("data-id");
        eliminarArea(officeId);
      });
    });
  }
  function abrirVistaModificacionArea(officeId) {
    let editFormOfficeHTML = `
            <h3>Editar Area</h3>
            <form action="#" id="editOffice" class="editOffice">
                <input type="text" placeholder="Area" id="editArea" required/>
                <input type="submit" value="Editar" id="editar"/>
            </form>
        `;

    editOfficeFormContainer.innerHTML = editFormOfficeHTML;

    const areaIndex = areas.findIndex((area) => area.id == officeId);
    console.log(`Editar ${officeId}`);
    if (areaIndex !== -1) {
      editOffice.addEventListener("submit", (event) => {
        event.preventDefault();
        editarArea(areaIndex);
        let editFormOfficeHTML = ``;
        editOfficeFormContainer.innerHTML = editFormOfficeHTML;
      });
    } else {
      console.log(`Area con ID ${officeId} no encontrado`);
    }
  }
  function editarArea(areaIndex) {
    const editArea = document.querySelector("#editArea");

    areas[areaIndex].area = editArea.value;

    console.log(`Toner editado: ${JSON.stringify(areas[areaIndex])}`);

    actualizarTablaArea();
  }

  function eliminarArea(officeId) {
    const areaIndex = areas.findIndex((area) => area.id == officeId);
    console.log(`Eliminar ${officeId}`);
    if (areaIndex !== -1) {
      areas.splice(areaIndex, 1);

      actualizarTablaArea();
      asignarEventListeners();
    }
  }
  asignarEventListeners();
}
