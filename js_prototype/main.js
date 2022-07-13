const form = document.getElementById('form');
const input = document.querySelector('.form-control');
const button = document.querySelector('.js-btn');

function createList() {
  const list = document.createElement('ol');
  list.classList.add('list-group-numbered', 'js-list');
  return list;
}

function createItemList(value) {
  const item = document.createElement('li');
  item.classList.add('list-group-item');
  item.textContent = value;
  return item
}

function keysProp(obj) {
  const listProp = document.createElement('ol');
  listProp.classList.add('list-group-numbered');
  if (obj.name != '') {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      const typeKey = typeof Object.getOwnPropertyDescriptor(obj, key)
      const itemProp = createItemList(key + ' - ' + typeKey);
      listProp.append(itemProp);
    })
  }
  return listProp;
}

function createPrototypeOfClass(value) {
  let item;
  let protoParent = window[value].prototype;
  const list = createList();
  item = createItemList(protoParent.constructor.name);
  const listProp = keysProp(protoParent);
  item.append(listProp);
  list.append(item);

  while (protoParent.__proto__ !== null) {
    let proto = Object.getPrototypeOf(protoParent);
    if (proto.constructor.name) {
      item = createItemList(proto.constructor.name);
    } else {
      item = createItemList('');
    };
    const listProp = keysProp(proto);

    item.append(listProp);
    list.append(item);

    protoParent = proto;
  }
  document.body.append(list);

  input.value = '';
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  if (input.value.endsWith('.js')) {
    const module = await import(input.value.trim());
    createPrototypeOfClass(module.default.constructor.name);
  }
  if (typeof window[input.value] === 'function') {
    createPrototypeOfClass(input.value.trim());
  }
  else {
    input.value = '';
    input.classList.add('is-invalid');
  }
})

form.addEventListener('input', () => {
  input.classList.remove('is-invalid');
  if (document.querySelector('.js-list'))
    document.querySelector('.js-list').remove();
});
