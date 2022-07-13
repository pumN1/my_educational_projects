import {
  validateNumberCard,
  validateDate,
  validateCode,
  validateEmail,
} from './src/validation.js';

test('Проверка номера карты', () => {
  expect(validateNumberCard('1234 5678 9012 3456')).toBe(true);
  expect(validateNumberCard('1234 5678 901')).toBe(false);
  expect(validateNumberCard('1234 5678 90af 45hg')).toBe(false);
});

test('Проверка даты окончания действия карты', () => {
  expect(validateDate('12/34')).toBe(true);
  expect(validateDate('03/22')).toBe(false);
  expect(validateDate('03')).toBe(false);
});

test('Проверка кода CVC/CVV на содержание цифр', () => {
  expect(validateCode('123')).toBe(true);
  expect(validateCode('fff')).toBe(false);
});

test('Проверка на длину кода CVC/CVV', () => {
  expect(validateCode('123')).toBe(true);
  expect(validateCode('13')).toBe(false);
  expect(validateCode('1345')).toBe(false);
});

test('Проверка email на содержание @', () => {
  expect(validateEmail('petrovgs@mail.ru')).toBe(true);
  expect(validateEmail('petrovgs.mail.ru')).toBe(false);
});
