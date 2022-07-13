import { createBlock, render } from './comp.js';

const spinner = document.querySelector('.spinner-border');
let count = 0;

function showMSG(msg) {
  const block = createBlock();
  block.textContent = msg;
  document.body.append(block);
  setTimeout(() => {
    block.style.display = 'none';
  }, 3000)
  return block;
}

async function createProducts() {
  try {
    spinner.style.display = '';
    const response = await fetch('/api/products');
    const data = await response.json();

    if (response.status == 404 || data.products == []) {
      throw new TypeError('Список товаров пуст');
    }

    if (response.status === 500) {
      console.log('Перегружаем запрос');
      count += 1;
      console.log(count);
      if (count == 3) {
        count = 0;
        throw new TypeError('Произошла ошибка, попробуйте обновить страницу позже');
      }
      createProducts();
    }

    document.body.append(render(data.products));
    return data;
  } catch (error) {
    const block = showMSG(error.message);
    if (error.message == 'Unexpected end of JSON input') {
      block.textContent = 'Произошла ошибка JSON, попробуйте обновить страницу позже';
    }
    if (error.message == "data is not iterable") {
      block.style.display = 'none';
    }
  }
  finally {
    spinner.style.display = 'none';
  }
}

window.addEventListener('load', function() {

  function updateOnlineStatus() {
    let condition = navigator.onLine ? "online" : "offline";
    if (condition == "offline") {
      showMSG('Произошла ошибка, проверьте подключение к интернету');
    }
  }

  window.addEventListener('online', updateOnlineStatus());
  window.addEventListener('offline', updateOnlineStatus);
});

createProducts();
