import './styles/main.css'

const burgerMenu = document.getElementById('burger');
burgerMenu.addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.header-nav').classList.toggle('active');
});