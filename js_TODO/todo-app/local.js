export function getTodoList(owner) {
  let localCases = localStorage.getItem(owner);
  if (localCases) {
    return JSON.parse(localCases)
  };
};

function saveItemsLocal(owner) {
  let saveResult = [];
  let items = document.querySelectorAll('.list-group-item');
  items.forEach(el => {
    saveResult.push({
      name: el.firstChild.textContent,
      done: el.classList.contains('list-group-item-success') === true ? true : false
    });
  });
  localStorage.setItem(owner, JSON.stringify(saveResult));
};

export function createTodoItem({ owner, name }) {
  let storage
  if (localStorage.getItem(owner)) {
    storage = JSON.parse(localStorage.getItem(owner));
  } else storage = []
  let newItem = {
    name: name,
    done: false,
  };
  storage.push(newItem)
  localStorage.setItem(owner, JSON.stringify(storage));
  return newItem;
}

export function switchTodoItemDone({ todoItem, element: item }, owner) {
  todoItem.done = !todoItem.done;
  item.classList.toggle('list-group-item-success');
  saveItemsLocal(owner)
};

export function deleteTodoItem({ element: item }, owner) {
  if (confirm('Вы уверены?')) {
    item.remove();
  };
  saveItemsLocal(owner)
};
