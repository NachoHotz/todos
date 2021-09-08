const toDoItems = [];

function ToDo(description) {
  this.description = description;
  this.complete = false;
}

ToDo.prototype.completeToDo = function () {
  this.complete = !this.complete;
};

function buildToDo(todo, index) {
  const toDoShell = document.createElement('div');
  toDoShell.className = 'toDoShell';

  const toDoText = document.createElement('span');
  toDoText.innerHTML = todo.description;

  const checkBox = document.createElement('INPUT');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('checked', 'checkbox');
  checkBox.checked = false;
  checkBox.id = index;
  checkBox.className = 'completeCheckBox';
  checkBox.addEventListener('click', completeToDo);

  if (todo.complete) {
    toDoText.className = 'completeText';
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
  const toDoContainer = document.getElementById('toDoContainer');
  toDoContainer.innerHTML = "";

  const arrayToDos = buildToDos(toDoItems);
  arrayToDos.forEach((element) => toDoContainer.appendChild(element));
}

function addToDo() {
  const inputValue = document.querySelector('#toDoInput').value;

  if (inputValue !== '') {
    const newToDo = new ToDo(inputValue);

    if (toDoItems.length === 0) {
      toDoItems.push(newToDo);
    } else {
      toDoItems.forEach((element) => {
        if (newToDo.description === element.description) {
          return alert('There is already a todo with that description');
        } else {
          toDoItems.push(newToDo);
        }
      });
    }
  } else {
    return alert('You cannot add empty todo');
  }

  inputValue.value = '';
  displayToDos();
}

const button = document.getElementById('addButton');
button.addEventListener("click", addToDo);

function completeToDo(event) {
  const index = event.target.id;

  toDoItems[index].completeToDo();
  displayToDos();
}

displayToDos();
