let toDoItems = [];

let span = document.querySelector("#createdBy");
span.innerHTML += " Juan Ignacio Hotz";

function ToDo(description) {
  this.description = description;
  this.complete = false;
}

ToDo.prototype.completeToDo = function () {
  this.complete = !this.complete;
};

function buildToDo(todo, index) {
  let toDoShell = document.createElement("div");

  toDoShell.className = "toDoShell";

  let toDoText = document.createElement("span");

  toDoText.innerHTML = todo.description;

  let checkBox = document.createElement("INPUT");

  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("checked", "checkbox");

  checkBox.checked = false;
  checkBox.id = index;
  checkBox.className = "completeCheckBox";

  checkBox.addEventListener("click", completeToDo);

  if (todo.complete) {
    toDoText.className = "completeText";
    checkBox.checked = true;
  }

  toDoShell.appendChild(toDoText);
  toDoShell.appendChild(checkBox);

  return toDoShell;
}

function buildToDos(toDos) {
  return toDos.map(buildToDo);
}

function displayToDos() {
  let toDoContainer = document.getElementById("toDoContainer");

  toDoContainer.innerHTML = "";

  let arrayToDos = buildToDos(toDoItems);

  arrayToDos.forEach((element) => toDoContainer.appendChild(element));
}

function addToDo() {
  let inputValue = document.querySelector("#toDoInput").value;

  if (inputValue !== "") {
    let newToDo = new ToDo(inputValue);

    if (toDoItems.length === 0) {
      toDoItems.push(newToDo);
    } else {
      toDoItems.forEach((element) => {
        if (newToDo.description === element.description) {
          alert("Ya existe una tarea con esa descripción");
          return;
        } else {
          toDoItems.push(newToDo);
        }
      });
    }
  } else {
    alert("No puedes agregar tareas vacias.");
  }

  inputValue.value = "";

  displayToDos();
}

let button = document.getElementById("addButton");
button.addEventListener("click", addToDo);

function completeToDo(event) {
  const index = event.target.id;

  toDoItems[index].completeToDo();
  displayToDos();
}

displayToDos();
