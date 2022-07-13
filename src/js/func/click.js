window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.adress__close').addEventListener('click', function () {
    document.querySelector('.adress').style.display = 'none';
  })

  document.querySelector('.burger').addEventListener('click', function () {
    document.querySelector('.burger-menu').classList.toggle('is-active');
  })
  document.querySelector('.burger-x').addEventListener('click', function () {
    document.querySelector('.burger-menu').classList.remove('is-active')
  })

  document.querySelector('.search__icon').addEventListener('click', function () {
    document.querySelector('.search__menu').style.display = 'block';
  })
  document.querySelector('.search__close').addEventListener('click', function () {
    document.querySelector('.search__menu').style.display = 'none';
  })

})
