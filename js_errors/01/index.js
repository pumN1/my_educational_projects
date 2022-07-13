export function calculateDiscount(price, percent) {
  if (typeof (price) != 'number' || typeof (percent) != 'number')
    throw new TypeError('Данные не являются числом')

  return (price / 100) * percent;
}

try {
  calculateDiscount(price, percent)
} catch (err) {
  console.log(`${err.message}`)
}

export function getMarketingPrice(product) {
  const productObject = JSON.parse(product);
  if (!productObject.prices) {
    productObject.prices = {};
    return null;
  }

  return productObject.prices.marketingPrice;
}

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    resolve({});
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  const image = await fetchAvatarImage(userId)
    .catch(err => console.log(err.message))
  if (!image.url)
    return image.url = '/images/default.jpg'

  return image.url;
}
