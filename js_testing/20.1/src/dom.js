import { el } from 'redom';

export function createForm(inputs) {
  return el(
    'form',
    inputs.map((input) => el('input', { placeholder: input })),
  );
}
