import './styles/main.css'

const burgerMenu = document.getElementById('burger')
burgerMenu.addEventListener('click', function () {
	this.classList.toggle('active')
	document.querySelector('.header-nav').classList.toggle('active')
})

const socialBar = document.querySelector('.header__social-bar')
const navBar = document.querySelector('.header__nav')
const SCROLL_HEIGHT = 0;

window.addEventListener('scroll', () => {
	socialBar.classList.toggle('scrolled', window.scrollY > SCROLL_HEIGHT)
  navBar.classList.toggle('scrolled', window.scrollY > SCROLL_HEIGHT)
})
