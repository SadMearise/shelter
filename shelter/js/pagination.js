import * as functions from "./functions.js";
import * as popup from "./popup.js";
import pets from '../pets.json' assert { type: "json" };

const btns = document.querySelectorAll('.pagination__item');
const toStartBtn = document.querySelector('.nav-btn_start');
const prevBtn = document.querySelector('.nav-btn_prev-nav');
const nextBtn = document.querySelector('.nav-btn_next-nav');
const toEndBtn = document.querySelector('.nav-btn_end');
const pageBtn = document.querySelector('.nav-btn_page');
const list = document.querySelector('.our-friends__list');
const breakpoint992 = 991.98;
const breakpoint576 = 575.98;
let currentPage = 1;
let pagesCount; 

const createElementsArray = () => {
	const finalArray = [];

	const array0 = functions.randomArray(false, pets.length);
	let lastSeed = array0.slice(6, 8);
	
	
	let part1 = array0.slice(0, 3);
	let part2 = array0.slice(3, 6);
	let part3 = functions.shuffle(part1);
	let part4 = functions.shuffle(part2);
	let part5 = functions.shuffle(part3);
	let part6 = functions.shuffle(part4);
	let part7 = functions.shuffle(part5);
	let part8 = functions.shuffle(part6);
	let part9 = functions.shuffle(part7);
	let part10 = functions.shuffle(part8);
	let part11 = functions.shuffle(part9);
	let part12 = functions.shuffle(part10);

	finalArray.push(...part1.concat(part2, lastSeed));
	finalArray.push(...part3.concat(part4, lastSeed));
	finalArray.push(...part5.concat(part6, lastSeed));
	finalArray.push(...part7.concat(part8, lastSeed));
	finalArray.push(...part9.concat(part10, lastSeed));
	finalArray.push(...part11.concat(part12, lastSeed));

	return finalArray;
}

createElementsArray();
const elementsArray = createElementsArray();

const createCardTemplate = (object, number) => {
	const card = `
	<li class="our-friends__item pet-card popup-link" data-number="${number}">
		<div class="pet-card__content">
			<div class="pet-card__row">
				<img src="${object[number].img}" alt="pet" class="pet-card__image">
			</div>
			<div class="pet-card__row">
				<span class="pet-card__title">${object[number].name}</span>
				<a href="#no_scroll" class="pet-card__button btn btn_light">Learn more</a>
			</div>
		</div>
	</li>`
	return card;
}

const animation = (elementClass) => {
	const animation = [
		{ opacity: "0" },
		{ opacity: "1" },
	];

	const animationTiming = {
		duration: 300,
		iterations: 1,
	};

	const items = document.querySelectorAll(elementClass);

	items.forEach(item => item.animate(animation, animationTiming));
}

const init = () => {	
	const mediaQuery992 = window.matchMedia(`(max-width: ${functions.toEm(breakpoint992)})`);
	const mediaQuery576 = window.matchMedia(`(max-width: ${functions.toEm(breakpoint576)})`);

	let countElements;
	let maxPages;

	if (mediaQuery576.matches) {
		countElements = 3;
		maxPages = elementsArray.length / countElements;
		if (currentPage < maxPages) {
			nextBtn.removeAttribute('disabled');
			toEndBtn.removeAttribute('disabled');
		}
	} else if (mediaQuery992.matches) {
		countElements = 6;
		maxPages = elementsArray.length / countElements;
		if (currentPage >= maxPages) {
			currentPage = 8;
			nextBtn.setAttribute('disabled', '');
			toEndBtn.setAttribute('disabled', '');
		} else if (currentPage < maxPages) {
			nextBtn.removeAttribute('disabled');
			toEndBtn.removeAttribute('disabled');
		}

	} else {
		countElements = 8;
		maxPages = elementsArray.length / countElements;
		
		if (currentPage >= maxPages) {
			currentPage = 6;
			nextBtn.setAttribute('disabled', '');
			toEndBtn.setAttribute('disabled', '');
		} else if (currentPage < maxPages) {
			nextBtn.removeAttribute('disabled');
			toEndBtn.removeAttribute('disabled');
		}
	}
	pageBtn.innerHTML = `<span>${currentPage}</span>`
	list.innerHTML = '';
	
	for (let i = 0; i < countElements; i++) {
		const item = createCardTemplate(pets, elementsArray[countElements * (currentPage - 1) + i])
		list.insertAdjacentHTML('beforeend', item)
	}

	pagesCount = Math.ceil(elementsArray.length / countElements);
}



init();
popup.initPopups(pets);

window.addEventListener('resize', () => {
	init();
	popup.initPopups(pets);
});

btns.forEach((btn) => {
	btn.addEventListener('click', (event) => {
		if (event.currentTarget.querySelector('.pagination__btn')) {
			const target = event.currentTarget.querySelector('.pagination__btn');
			if (target.hasAttribute('disabled')) return false;

			
			if (target.classList.contains('nav-btn_start')) {
				currentPage = 1;
			} else if (target.classList.contains('nav-btn_prev-nav')) {
				if (currentPage > 1) currentPage-- 
			} else if (target.classList.contains('nav-btn_next-nav')) {
				if (currentPage < pagesCount) currentPage++;
			} else if (target.classList.contains('nav-btn_end')) {
				currentPage = pagesCount;
			}
			
			if (currentPage >= 1 && currentPage <= pagesCount) {
				nextBtn.removeAttribute('disabled');
				prevBtn.removeAttribute('disabled');
				toEndBtn.removeAttribute('disabled');
				toStartBtn.removeAttribute('disabled');
			}
			if (currentPage == pagesCount) {
				nextBtn.setAttribute('disabled', '');
				toEndBtn.setAttribute('disabled', '');
			} else if (currentPage == 1) {
				prevBtn.setAttribute('disabled', '');
				toStartBtn.setAttribute('disabled', '');
			}

			init();
			animation(".our-friends__item");
			popup.initPopups(pets);
			pageBtn.innerHTML = `<span>${currentPage}</span>`
		}
	})
})