class ComponentError extends Error {
  constructor(selectErrors) {
    super(selectErrors);
    this.selectErrors = selectErrors;
  }
}
class PromiseError extends Error {
  constructor(promErrors) {
    super(promErrors);
    this.promErrors = promErrors;
  }
}

class BaseComponent {
  constructor({ selector, showLoader = true, showErrorState = true }) {
    this.selector = document.getElementById(selector);
    this.showLoader = showLoader;
    this.showErrorState = showErrorState;

    if (!this.selector) {
      throw new ComponentError('DOM-элемент не найден');
    }
    else
      this.observer(this.selector);
  }

  getElement(data) {
    const title = document.createElement('h1');
    const image = document.createElement('img');
    const container = document.createElement('div');
    title.textContent = data.title;
    image.src = data.image;
    container.classList.add('card')
    container.append(title);
    container.append(image);
    this.selector.append(container);
  }

  getError(error) {
    const block = document.createElement('div');
    block.classList.add('errorBlock');
    block.textContent = error;
    const btnRes = document.createElement('button');
    btnRes.classList.add('btn', 'btn-success');
    btnRes.textContent = 'Перезагрузить';

    btnRes.addEventListener('click', () => {
      this.showLoader = true;
      this.selector.textContent = '';
      this.observer(this.selector);
    })

    this.selector.append(block);
    block.append(btnRes);
  }

  fetch() {
    wait(3000)
      .then(data => {this.getElement(data)
        this.showLoader = false
        this.spinner();
      })
      .catch(error => {
        if ((error instanceof PromiseError) && this.showErrorState) {
          this.getError(error.promErrors)
        } else {
          this.selector.textContent = '';
          throw error;
        }
        this.showLoader = false
        this.spinner();
      })
  }

  spinner() {
    const spinner = document.createElement('div');
    if (this.showLoader) {
      spinner.classList.add('spinner-border', 'text-primary');
      spinner.style.position = 'fixed';
      spinner.style.top = '50%';
      spinner.style.left = '50%';
      this.selector.append(spinner);
    } else
      document.querySelector('.spinner-border').remove()
  }

  observer(selector) {
    const options = {
      root: selector,
      rootMargin: '10px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver((entrice, observer) => {
      entrice.forEach(entry => {
        if (entry.isIntersecting)
          observer.unobserve(entry.target);
        else {
          this.spinner();
          this.fetch();
        }
      })
    }, options)
    let target = selector;
    observer.observe(target);
  }
}

class AddToCartComponent extends BaseComponent {
  constructor({ selector, showLoader = true, showErrorState = true }) {
    super({ selector, showLoader, showErrorState })
    this.count = null;
    this.card = null;
    this.containerCard = document.createElement('div');
  }

  set count(number) {
    this._count = number;
    if (this.displayElement) {
      this.displayElement.textContent = number;
    }
    if (this._count === 0) {
      this.containerCard.textContent = '';
      this.card = this.addCard();
    } else if (this._count == 1) {
      this.containerCard.textContent = '';
      this.counter()
    }
  }

  get count() {
    return this._count;
  }

  getElement(data) {
    super.getElement(data);
    this.containerCard.classList.add('btnContainer');
    this.count = data.count;
    if (this.count == 0) {
      this.addCard()
    }
  }

  countMinus() {
    if (this.count <= 1) {
      this.count = 0;
      return
    };
    --this.count;
  }

  countPlus() {
    ++this.count;
  }

  addCard() {
    const btnAdd = document.createElement('button');
    btnAdd.classList.add('btn', 'btn-primary');
    btnAdd.textContent = 'Добавить в корзину';
    btnAdd.addEventListener('click', () => this.count = 1)
    this.containerCard.append(btnAdd);
    return this.containerCard;
  }

  counter() {
    const btnMinus = document.createElement('button');
    const btnPlus = document.createElement('button');
    const countDisplay = document.createElement('div');
    countDisplay.classList.add('input');
    btnMinus.classList.add('btn', 'btn-primary');
    btnMinus.textContent = '-';
    btnPlus.classList.add('btn', 'btn-primary');
    btnPlus.textContent = '+';
    btnMinus.addEventListener('click', () => this.countMinus(this.count));
    btnPlus.addEventListener('click', () => this.countPlus());
    this.containerCard.append(btnMinus);
    this.containerCard.append(countDisplay);
    this.containerCard.append(btnPlus);

    this.displayElement = countDisplay;
    this.displayElement.textContent = this.count;
    document.querySelector('.card').append(this.containerCard);

  }
}

try {
  new AddToCartComponent({ selector: 'app' })
}
catch (error) {
  if (error instanceof ComponentError) {
    throw error.selectErrors;
  }
  else if (error instanceof Error) {
    throw error;
  } else throw error;
}

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 2);
      random
        ? resolve({ title: 'Игра настольная Hasbro Games Классическая монополия Обновленная', image: './img/monopoly.jpg', count: 1 })
        // { title: 'Настольная игра Hasbro Games Дженга', image: './img/jenga.jpg', count: 1 }])
        : reject(new PromiseError('Произошла ошибка'));
    }, ms);
  });
}
