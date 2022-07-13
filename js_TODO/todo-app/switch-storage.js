function createButtonSwitch() {
  const buttonSwitch = document.createElement('button');
  buttonSwitch.classList.add('btn', 'btn-dark', 'js-btn');
  buttonSwitch.style.marginBottom = '20px';
  buttonSwitch.textContent = 'Перейти на локальное хранилище';
  // buttonSwitch.textContent = localStorage.getItem('btn');
  return buttonSwitch;
};

// export function createAppButtonSwitch() {
const todoStorage = createButtonSwitch();
document.getElementById('todo-app').append(todoStorage);
// }

export async function createAppStorageLS(owner) {
  todoStorage.textContent = 'Перейти на серверное хранилище';
  let  {createTodoApp}   = await import('./view.js');
  let { getTodoList,
    createTodoItem,
    switchTodoItemDone,
    deleteTodoItem
  } = await import('./local.js');
  // (async () => {
    const todoItemList = getTodoList(owner);
    createTodoApp(document.getElementById('todo-app'), {
      title: 'Мои дела',
      owner,
      todoItemList,
      onCreateFormSubmit: createTodoItem,
      onDoneClick: switchTodoItemDone,
      onDeleteClick: deleteTodoItem
    });
  // });
}

export async function createAppStorageAPI(owner) {
  todoStorage.textContent = 'Перейти на локальное хранилище';
  let { createTodoApp } = await import('./view.js');
  let {
    getTodoList,
    createTodoItem,
    switchTodoItemDone,
    deleteTodoItem
  } = await import('./api.js');
  // (async () => {
    const todoItemList = await getTodoList(owner);
    createTodoApp(document.getElementById('todo-app'), {
      title: 'Мои дела',
      owner,
      todoItemList,
      onCreateFormSubmit: createTodoItem,
      onDoneClick: switchTodoItemDone,
      onDeleteClick: deleteTodoItem
    });
  // });
}


// export function switchStorage() {
// const todoStorage = document.querySelector('.js-btn');
todoStorage.addEventListener('click', () => {
  localStorage.setItem('btn', todoStorage.textContent);
  location.reload();
  // todoStorage.textContent = localStorage.getItem('btn');
  // function createAppStorage()
})
// }
