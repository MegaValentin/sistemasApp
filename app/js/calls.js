export function toDoList() {
  let idCounter = 0;
  const input = document.querySelector('#areaSolicitante');
  const textarea = document.querySelector('#task')

  userInput.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
  });
  
  let addTask = () => {
    idCounter++;

    let newValue = input.value;
    let newText = textarea.value
    list.innerHTML += ` 
    <div class="task-container" id="${idCounter}">
        <label>
            <input type="checkbox">
            ${newValue}
            ${newText}
        </label>
        <img src="./app/img/icons8-basura-100.png" class="closeBtn">
    </div>
    `;

    input.value = "";
    textarea.value = ""
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
