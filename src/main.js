import './styles/main.css'

const burgerMenu = document.getElementById('burger')
burgerMenu.addEventListener('click', function () {
	this.classList.toggle('active')
	document.querySelector('.header-nav').classList.toggle('active')
})

const socialBar = document.querySelector('.header__social-bar')
const navBar = document.querySelector('.header__nav')
const SCROLL_HEIGHT = 0

window.addEventListener('scroll', () => {
	socialBar.classList.toggle('scrolled', window.scrollY > SCROLL_HEIGHT)
	navBar.classList.toggle('scrolled', window.scrollY > SCROLL_HEIGHT)
})

// FILTERED MENU FORM JSON FILE

const grid = document.querySelector('#menuGrid')
const filters = document.querySelector('#menuFilters')

fetch('/public/data/menu.json')
	.then(res => res.json())
	.then(data => {
		renderFilters(data)
		renderCards(data)
	})

function renderFilters(data) {
	const categories = [
		{ key: 'all', label: 'Wszystkie' },
		...[...new Map(data.map(item => [item.category, item.categoryLabel]))].map(([key, label]) => ({ key, label })),
	]

	filters.innerHTML = categories
		.map(
			(cat, i) => `
		<button class="btn-filter ${i === 0 ? 'btn-filter--active' : ''}"
		data-filter="${cat.key}"
		>${cat.label}</button>
	`
		)
		.join('')

	filters.addEventListener('click', e => {
		if (!e.target.matches('.btn-filter')) return
		console.log(e.target.dataset.filter)
		document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('btn-filter--active'))
		e.target.classList.add('btn-filter--active')
		filteredCards(e.target.dataset.filter)
	})
}

function renderCards(data) {
	grid.innerHTML = data
		.map(
			item => `
		<article class="menu-card card--menu card--hover-up" data-category="${item.category}">
			<img src="${item.image}" alt="${item.name}">
			<div class="card__content--menu">
				<h4>${item.name}</h4>
				<span class="price">${item.price} PLN</span>
				<p>${item.description}</p>
			</div>
		</article>
	`
		)
		.join('')
}

function filteredCards(category) {
	document.querySelectorAll('.menu-card').forEach(card => {
		card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none'
	})
}


