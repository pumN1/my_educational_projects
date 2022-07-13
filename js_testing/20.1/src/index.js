import { el, setChildren, setStyle } from 'redom';
import IMask from 'imask';
import './style.scss';
import defcard from './assets/image/defcard.svg';
import mir from './assets/image/mir.svg';
import visa from './assets/image/visa.svg';
import mastercard from './assets/image/mastercard.svg';
import {
  validateNumberCard,
  validateDate,
  validateCode,
  validateEmail,
} from './validation.js';
import { createForm } from './dom.js';

const container = el('div', { class: 'container' });
const title = el('h1', 'Данные карты для оплаты');

const form = createForm([
  '1234 5678 9012 3456',
  'ММ/ГГ',
  'CVV/CVC',
  'E-mail для отправки онлайн-чека',
]);

form.classList.add('form');
const inputCardNumber = form[0];
inputCardNumber.type = 'text';
inputCardNumber.name = 'numberCard';
inputCardNumber.classList.add('zero', 'form-card');

const inputCardDate = form[1];
inputCardDate.type = 'text';
inputCardDate.name = 'date';
inputCardDate.classList.add('zero', 'form-container_date');

const inputCardCvc = form[2];
inputCardCvc.type = 'text';
inputCardCvc.name = 'code';
inputCardCvc.classList.add('zero', 'form-container_code');

const inputEmail = form[3];
inputEmail.type = 'email';
inputEmail.name = 'email';
inputEmail.classList.add('zero', 'form-email');

const div = el('div', { class: 'form-container' });
const button = el(
  'button',
  {
    type: 'submit',
    disabled: 'disabled',
    class: 'form-btn',
  },
  'Оплатить',
);

setChildren(document.body, container);
setChildren(container, [title, form]);
setChildren(div, [inputCardDate, inputCardCvc]);
setChildren(form, [inputCardNumber, div, inputEmail, button]);

//Mask the Credit Card Number Input
const cardnumberMask = new IMask(inputCardNumber, {
  mask: [
    {
      mask: '**** **** **** ****',
      regex: '^5\\d{0,15}',
      cardtype: 'mastercard',
    },
    {
      mask: '**** **** **** ****',
      regex: '^4\\d{0,15}',
      cardtype: 'visa',
    },
    {
      mask: '**** **** **** ****',
      regex: '^2\\d{0,15}',
      cardtype: 'МИР',
    },
    {
      mask: '**** **** **** ******',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');

    for (let i = 0; i < dynamicMasked.compiledMasks.length; i++) {
      let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
      if (number.match(re) != null) {
        return dynamicMasked.compiledMasks[i];
      }
    }
  },
});

//Mask the Expiration Date
new IMask(inputCardDate, {
  mask: 'MM{/}YY',
  lazy: false,
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: new Date().getFullYear() % 100,
      to: 34,
    },
  },
});

//Mask the security code
new IMask(inputCardCvc, {
  mask: '***',
});

cardnumberMask.on('accept', () => {
  switch (cardnumberMask.masked.currentMask.cardtype) {
    case 'МИР':
      setStyle(inputCardNumber, {
        background: 'url(' + mir + ') right center no-repeat transparent',
        backgroundSize: '50px',
      });
      break;
    case 'visa':
      setStyle(inputCardNumber, {
        background: 'url(' + visa + ') right center no-repeat transparent',
        backgroundSize: '50px',
      });
      break;
    case 'mastercard':
      setStyle(inputCardNumber, {
        background:
          'url(' + mastercard + ') right center no-repeat transparent',
        backgroundSize: '50px',
      });
      break;
    default:
      setStyle(inputCardNumber, {
        background: 'url(' + defcard + ') right center no-repeat transparent',
        backgroundSize: '50px 40px',
      });
  }
});

function validate(element) {
  switch (element.name) {
    case 'numberCard':
      if (!validateNumberCard(element.value)) {
        inputCardNumber.classList.add('invalid');
      }
      break;
    case 'date':
      if (!validateDate(element.value)) inputCardDate.classList.add('invalid');
      break;
    case 'code':
      if (!validateCode(element.value)) {
        inputCardCvc.classList.add('invalid');
      }
      break;
    case 'email':
      if (!validateEmail(element.value)) {
        inputEmail.classList.add('invalid');
      }
      break;
  }
}

form.addEventListener(
  'input',
  (event) => {
    event.target.classList.remove('invalid');
    event.target.classList.remove('zero');
    button.setAttribute('disabled', 'disabled');
  },
  true,
);

form.addEventListener(
  'blur',
  (event) => {
    validate(event.target);
    if (
      document.querySelectorAll('.invalid').length === 0 &&
      document.querySelectorAll('.zero').length === 0
    ) {
      button.removeAttribute('disabled');
    }
  },
  true,
);

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
});
