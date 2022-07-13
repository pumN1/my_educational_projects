import { el, setChildren, setStyle } from 'redom';
import IMask from 'imask';
import './style.scss';
import defcard from './assets/image/defcard.svg';
import mir from './assets/image/mir.svg';
import visa from './assets/image/visa.svg';
import mastercard from './assets/image/mastercard.svg';

const container = el('div', { class: 'container' });
const title = el('h1', 'Данные карты для оплаты');
const form = el('form', { class: 'form' });
const inputCardNumber = el('input', {
  type: 'text',
  name: 'numberCard',
  class: 'zero form-card',
  // pattern: '[0-9]*',
  placeholder: '1234 5678 9012 3456',
});
// const image = el('div', { class: 'form-card_img' });
const div = el('div', { class: 'form-container' });
const inputCardDate = el('input', {
  type: 'text',
  name: 'date',
  class: 'zero form-container_date',
  // pattern: '[0-9]*',
});
const inputCardCvc = el('input', {
  type: 'text',
  name: 'code',
  class: 'zero form-container_code',
  // pattern: '[0-9]*',
  placeholder: 'CVC/CVV',
});
const inputEmail = el('input', {
  type: 'email',
  name: 'email',
  class: 'zero form-email',
  placeholder: 'E-mail для отправки онлайн-чека',
});
const button = el('button', {
  type: 'submit',
  disabled: 'disabled',
  class: 'form-btn'
}, 'Оплатить');

// setStyle(container, { display: 'flex', flexDirection: 'column', maxWidth: '300px', textAlign: 'center' });
// setStyle(container, { margin: '50px auto' });
// setStyle(form, { display: 'flex', flexDirection: 'column' });
// setStyle(div, { display: 'flex', justifyContent: 'space-between' });
// setStyle(inputCardNumber, { position: 'relative', marginBottom: '20px', fontSize: '20px' });
// setStyle(image, { position: 'absolute', right: '570px' });
// setStyle(inputCardDate, { marginBottom: '20px', width: '80px', fontSize: '20px', textAlign: 'center' });
// setStyle(inputCardCvc, { marginBottom: '20px', width: '100px', fontSize: '20px', textAlign: 'center' });
// setStyle(inputEmail, { marginBottom: '20px', fontSize: '18px' });
// setStyle(button, { fontSize: '18px' });

setChildren(document.body, container);
setChildren(container, [title, form]);
setChildren(div, [inputCardDate, inputCardCvc]);
// setChildren(inputCardNumber, image);
setChildren(form, [inputCardNumber, div, inputEmail, button]);

//Mask the Credit Card Number Input
const cardnumberMask = new IMask(inputCardNumber, {
  mask: [{
    mask: '0000 0000 0000 0000',
    regex: '^5\\d{0,15}',
    cardtype: 'mastercard',
  },
  {
    mask: '0000 0000 0000 0000',
    regex: '^4\\d{0,15}',
    cardtype: 'visa',
  },
  {
    mask: '0000 0000 0000 0000',
    regex: '^2\\d{0,15}',
    cardtype: 'МИР',
  },
  {
    mask: '0000 0000 0000 000000',
  }],
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
const expirationdateMask = new IMask(inputCardDate, {
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
const securityCodeMask = new IMask(inputCardCvc, {
  mask: '000',
});

cardnumberMask.on('accept', () => {
  switch (cardnumberMask.masked.currentMask.cardtype) {
    case 'МИР':
      setStyle(inputCardNumber, { background: 'url(' + mir + ') right center no-repeat transparent', backgroundSize: '50px' })
      break;
    case 'visa':
      setStyle(inputCardNumber, { background: 'url(' + visa + ') right center no-repeat transparent', backgroundSize: '50px' })
      break;
    case 'mastercard':
      setStyle(inputCardNumber, { background: 'url(' + mastercard + ') right center no-repeat transparent', backgroundSize: '50px' })
      break;
    default:
      setStyle(inputCardNumber, { background: 'url(' + defcard + ') right center no-repeat transparent', backgroundSize: '50px 40px' })
  }
});

cardnumberMask.on('complete', () => {
  switch (cardnumberMask.masked.currentMask.cardtype) {
    case 'МИР':
      setStyle(inputCardNumber, { background: 'url(' + mir + ') right center no-repeat transparent', backgroundSize: '50px' })
      break;
    case 'visa':
      setStyle(inputCardNumber, { background: 'url(' + visa + ') right center no-repeat transparent', backgroundSize: '50px' })
      break;
    case 'mastercard':
      setStyle(inputCardNumber, { background: 'url(' + mastercard + ') right center no-repeat transparent', backgroundSize: '50px' })
      break;
    default:
      setStyle(inputCardNumber, { background: 'url(' + defcard + ') right center no-repeat transparent', backgroundSize: '50px 40px' })
  }
});

function validate(element) {
  const today = new Date();
  const dateArr = inputCardDate.value.split('/');
  switch (element.name) {
    case 'numberCard':
      if (inputCardNumber.value.length < 16) {
        inputCardNumber.classList.add('invalid');
      }
      break;
    case 'date':
      if (!Number(dateArr[0]) || !Number(dateArr[1])) {
        inputCardDate.classList.add('invalid');
      } else
        if ((new Date().getFullYear() % 100 === Number(dateArr[1])) && ((today.getMonth() + 2) > Number(dateArr[0]))) {
          inputCardDate.classList.add('invalid');
        }
      break;
    case 'code':
      if (inputCardCvc.value.length < 3) {
        inputCardCvc.classList.add('invalid');
      }
      break;
    case 'email':
      if (!inputEmail.value.includes('@')) {
        inputEmail.classList.add('invalid');
      }
      break;
  }
};

form.addEventListener('input', (event) => {
  event.target.classList.remove('invalid');
  event.target.classList.remove('zero');
  button.setAttribute('disabled', 'disabled');
}, true);

form.addEventListener('blur', (event) => {
  validate(event.target);
  if (document.querySelectorAll('.invalid').length === 0 && document.querySelectorAll('.zero').length === 0) {
    button.removeAttribute('disabled');
  }
}, true);

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
});
