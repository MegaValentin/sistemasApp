import cargarOptions from "./utility.js";
import { obtenerNombreSeleccionado } from "./utility.js";

export function toDoList() {

  let idCounter = 0;
  const listaAreas = './app/data/areas.json';

  const formulario = document.getElementById('calls')
  const formHTML = `

    <h1>Tareas</h1>

    <form action="#" id="userInput" class="task-request">
           
            <select id="areaSelect" name="area" required>
                <option value="" disabled selected>Selecciona un área</option>
            </select>
      
      <textarea class="input" name="" id="task" cols="30" rows="10" placeholder="Tarea" required></textarea>
      <input type="submit" value="+" id="addBtn" />
    </form>
    `;
  formulario.innerHTML = formHTML;

  cargarOptions(listaAreas, areaSelect, 'areas');

  userInput.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
  });

  async function addTask() {
    idCounter++;
    const selectedAreaId = areaSelect.value;
    const selectedAreaName =  await obtenerNombreSeleccionado(listaAreas, selectedAreaId, 'areas');
    const newTask = task.value
    list.innerHTML += ` 
    <div class="task-container" id="${idCounter}">
    <input type="checkbox">
        <label>
           "${selectedAreaName}" :
            ${newTask}
        </label>
        <img src="./app/img/icons8-basura-100.png" class="closeBtn">
    </div>
    `;
    areaSelect.value = "";
    task.value = ""
    updateStates();
  };

  list.addEventListener("click", (event) => {
    console.log(event.srcElement.parentNode.id);
    if (event.srcElement.nodeName == "INPUT") {
      updateStates();
    }
    if (event.srcElement.nodeName == "IMG") {
      deleteTask(event.srcElement.parentNode.id);
    }
    if (event.srcElement.nodeName == "DIV") {
      console.log("hola")
    }
  });

  let updateStates = () => {
    let element = list.querySelectorAll("div");
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    stats.innerHTML = `<p> Tareas pendientes: ${element.length} completadas:${checkbox.length}</p>`;
  };

  let deleteTask = (id) => {
    let taskToDelete = document.getElementById(id);
    list.removeChild(taskToDelete);
    updateStates();
  };

  const checkboxes = document.querySelectorAll('.dificultad input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      checkboxes.forEach(otherCheckbox => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    });
  });

 
}
