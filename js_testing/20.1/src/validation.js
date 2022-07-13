export function validateNumberCard(value) {
  const regex = /^[0-9]+$/;
  if (value.length < 16) return false;
  else if (!regex.test(value.split(' ').join(''))) return false;
  else return true;
}

export function validateDate(value) {
  const today = new Date();
  const dateArr = value.split('/');
  if (!Number(dateArr[0]) || !Number(dateArr[1])) return false;
  else if (
    new Date().getFullYear() % 100 === Number(dateArr[1]) &&
    today.getMonth() + 2 > Number(dateArr[0])
  )
    return false;
  else return true;
}

export function validateCode(value) {
  const regex = /^[0-9]+$/;
  if (value.length != 3) return false;
  else if (!regex.test(value.split(' ').join(''))) return false;
  else return true;
}

export function validateEmail(value) {
  return value.includes('@');
}
