import { createForm } from './src/dom.js';

test('Функция должна создать форму', () => {
  const expectadText =
    '<form><input placeholder="Номер карты"><input placeholder="ММ/ГГ"><input placeholder="CVV/CVC"><input placeholder="Email"></form>';
  const el = createForm(['Номер карты', 'ММ/ГГ', 'CVV/CVC', 'Email']);
  expect(el).toBeInstanceOf(HTMLFormElement);
  expect(el.outerHTML).toBe(expectadText);
});
