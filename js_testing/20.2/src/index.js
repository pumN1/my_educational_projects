/* eslint-disable no-undef */
(() => {
  const field = 4;
  let cardOpen1, cardOpen2;

  function createAppTitle(title) {
    const appTitle = document.createElement('h1');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createAppTimer() {
    const appTimer = document.createElement('div');
    appTimer.classList.add('timer');
    return appTimer;
  }

  function createGameField(card) {
    const item = document.createElement('div');
    item.innerHTML = card;
    item.classList.add('gameForm');
    if (field == 4) {
      item.classList.add('font-size--4');
    } else if (field == 6) {
      item.classList.add('font-size--6');
    } else if (field == 8) {
      item.classList.add('font-size--8');
    } else if (field == 10) {
      item.classList.add('font-size--10');
    }

    return item;
  }
  // function createGameSpan(card) {
  //   const it = document.createElement('span');
  //   it.innerHTML = card;
  //   return it;
  // }

  function createNumber() {
    let number = [];
    for (let n = 1; n <= (field * field) / 2; n++) {
      number.push(n, n);
    }
    return number;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createGameApp(container, title) {
    const todoAppTitle = createAppTitle(title);
    container.append(todoAppTitle);

    // const form = document.getElementById('ex2');

    // if (field == undefined) {
    //   const lable = document.querySelectorAll('input');
    //   const button = document.querySelector('button');
    //   lable.forEach((input) => {
    //     input.addEventListener('click', () => {
    //       button.addEventListener('click', () => {
    //         field = document.querySelector('input:checked').id;
    //         document.getElementById('ex2').style.display = display = 'none';
    //       });
    //     });
    //   });
    // }

    // form.addEventListener('submit', function (e) {
    //   e.preventDefault();

    let newNumber = shuffle(createNumber());
    for (let i = 0; i < newNumber.length; ++i) {
      // let gameSpan = createGameSpan(newNumber[i]);
      let gameField = createGameField(newNumber[i]);
      // gameField.append(gameSpan);
      container.append(gameField);
    }

    const newItem = document.querySelectorAll('.gameForm');

    const appTimer = createAppTimer();
    container.append(appTimer);

    newItem.forEach((el) => {
      let timer;
      let timeMinut = 60;
      let div = document.querySelector('.timer');
      timer = setInterval(() => {
        seconds = timeMinut % 60;
        minutes = (timeMinut / 60) % 60;
        if (timeMinut <= 0) {
          clearInterval(timer);
          modal('Время закончилось');
          document.getElementById('ex3').style.display = 'block';
          const btnReload = document.querySelector('.btn-reload');
          btnReload.addEventListener('click', () => {
            location.reload();
          });
        } else {
          let strTimer = `${Math.trunc(minutes)}:${Math.trunc(seconds)}`;
          div.innerHTML = strTimer;
        }
        timeMinut--;
      }, 1000);

      let clickCard = () => {
        if (el.classList.contains('block')) {
          el.removeEventListener('click', clickCard);
          return;
        }

        let card1Number = 0;
        let card2Number = 0;

        if (cardOpen1 != undefined)
          card1Number = cardOpen1.innerHTML;
        if (cardOpen2 != undefined)
          card2Number = cardOpen2.innerHTML;

        if (card1Number > 0 && card2Number > 0) {
          if (card1Number == card2Number) {
            cardOpen1.classList.add('block');
            cardOpen2.classList.add('block');
            modal('Вы нашли пару!');
            setTimeout(() => {
              $.modal.close();
            }, 700);

            cardOpen1 = undefined;
            cardOpen2 = undefined;
          } else {
            cardOpen1.classList.remove('is-open');
            cardOpen2.classList.remove('is-open');
            el.addEventListener('click', clickCard);
            el.removeAttribute('disabled', true);

            cardOpen1 = undefined;
            cardOpen2 = undefined;
          }
        }

        el.classList.add('is-open');

        if (cardOpen1 == undefined) cardOpen1 = el;
        else cardOpen2 = el;

        let endGame = document.querySelectorAll('.is-open');
        if (endGame.length == field * field) {
          clearInterval(timer);
          modal('Поздравляем! Вы выиграли!');
          document.getElementById('ex3').style.display = 'block';
          const btnReload = document.querySelector('.btn-reload');
          btnReload.addEventListener('click', () => {
            location.reload();
          });
        }
      };
      el.addEventListener('click', clickCard);
    });
    // });
  }

  function modal(name) {
    const modalWindow = document.getElementById('ex1');
    const p = modalWindow.querySelector('p');
    p.innerHTML = name;
    $('#ex1').modal();
  }

  document.addEventListener('DOMContentLoaded', () => {
    createGameApp(document.getElementById('game'), 'Игра в пары');
  });
})();
