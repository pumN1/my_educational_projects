export function createBlock() {
  const block = document.createElement('div')
  block.classList.add('alert', 'alert-primary')
  block.setAttribute('role', "alert")
  block.style.position = 'absolute'
  block.style.bottom = '0'
  block.style.right = '0'
  block.style.minHeight = '50px'
  block.style.minWidth = '100px'
  block.style.marginBottom = '0px'
  block.style.padding = '15px'
  block.style.textAlign = 'center'
  block.style.textAlign = 'center'
  block.style.zIndex = '2'
  return block
}

export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4')

  for (const product of data) {
    const productCard = document.createElement('div');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const price = document.createElement('p');
    productCard.style.width = '18%';
    productCard.classList.add('card', 'my-2');
    image.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    price.classList.add('cfrd-text');

    productCard.append(image);
    productCard.append(cardBody);
    cardBody.append(title);
    cardBody.append(price);

    image.src = product.image;
    image.alt = product.name;
    title.textContent = product.name;
    price.textContent = product.price;

    container.append(productCard);
  }
  return container;
}
