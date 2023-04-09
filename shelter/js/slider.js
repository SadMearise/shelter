import pets from '../pets.json' assert { type: "json" };
import * as functions from "./functions.js";

export const slider = document.querySelector('.friends-slider__wrapper');
const btnPrev = document.querySelector('.our-friends__slider-button-prev');
const btnNext = document.querySelector('.our-friends__slider-button-next');
const slideSetLeft = document.getElementById('slide-set-left');
const slideSetActive = document.getElementById('slide-set-active');
const slideSetRight = document.getElementById('slide-set-right');
const breakpoint992 = 991.98;
const breakpoint576 = 575.98;

let count = 1;
let lastMove;
let prevMove;

const createCardTemplate = (object, number) => {
	const card = `<div class="friends-slider__slide pet-card popup-link" data-number="${number}">
						<div class="pet-card__content">
							<div class="pet-card__row">
								<img src="${object[number].img}" alt="pet" class="pet-card__image">
							</div>
							<div class="pet-card__row">
								<span class="pet-card__title">${object[number].name}</span>
								<a href="#no_scroll" class="pet-card__button btn btn_light">Learn more</a>
							</div>
						</div>  
					</div>`
	return card;
}

let activeArray;
let leftArray;
let rightArray;

export const init = () => {
	activeArray = functions.randomArray();
	leftArray = functions.randomArray(activeArray);
	rightArray = functions.randomArray(activeArray);

	const mediaQuery992 = window.matchMedia(`(max-width: ${functions.toEm(breakpoint992)})`);
	const mediaQuery576 = window.matchMedia(`(max-width: ${functions.toEm(breakpoint576)})`);
	let countElements;

	if (mediaQuery576.matches) {
		countElements = 1;
	} else if (mediaQuery992.matches) {
		countElements = 2;
	} else {
		countElements = 3;
	}

	while (slideSetLeft.firstChild) {
		slideSetLeft.removeChild(slideSetLeft.firstChild);
	}
	while (slideSetActive.firstChild) {
		slideSetActive.removeChild(slideSetActive.firstChild);
	}
	while (slideSetRight.firstChild) {
		slideSetRight.removeChild(slideSetRight.firstChild);
	}

	for (let i = 0; i < countElements; i++) {
		const cardLeft = createCardTemplate(pets, leftArray[i]);
		const cardActive = createCardTemplate(pets, activeArray[i]);
		const cardRight = createCardTemplate(pets, rightArray[i]);

		slideSetLeft.insertAdjacentHTML('beforeend', cardLeft);
		slideSetActive.insertAdjacentHTML('beforeend', cardActive);
		slideSetRight.insertAdjacentHTML('beforeend', cardRight);

	}
	const width = slider.offsetWidth;
	slider.style.left = -(width) + 'px';
}

export const setDefaultState = () => {
	slider.classList.remove('shift');
	addNewItem();
	const width = slider.offsetWidth;
	slider.style.left = -(width) + 'px';
}

const rollSlider = () => {
	slider.classList.add('shift');
	let supValue = 0;
	if (count == 1) { lastMove == 'prev' ? supValue-- : supValue++; }
	const width = slider.offsetWidth;
	slider.style.left = -((count + supValue) * width) + 'px';
}

let start = true;

function addNewItem() {
	let changedItem;
	let leftSet = document.getElementById('slide-set-left');
	let activeSet = document.getElementById('slide-set-active');
	let rightSet = document.getElementById('slide-set-right');

	if (lastMove == 'next') {
		changedItem = slideSetRight;
		leftSet.innerHTML = activeSet.innerHTML;
		activeSet.innerHTML = slideSetRight.innerHTML;
	} else {
		changedItem = slideSetLeft;
		rightSet.innerHTML = activeSet.innerHTML;
		activeSet.innerHTML = slideSetLeft.innerHTML;
	}

	changedItem.innerHTML = "";

	const mediaQuery992 = window.matchMedia(`(max-width: ${functions.toEm(breakpoint992)})`);
	const mediaQuery576 = window.matchMedia(`(max-width: ${functions.toEm(breakpoint576)})`);

	let countElements;

	if (mediaQuery576.matches) {
		countElements = 1;
	} else if (mediaQuery992.matches) {
		countElements = 2;
	} else {
		countElements = 3;
	}

	while (changedItem.firstChild) {
		changedItem.removeChild(changedItem.firstChild);
	}

	if (start == true) {
		if (lastMove == 'next') activeArray = functions.randomArray(rightArray);
		if (lastMove == 'prev') activeArray = functions.randomArray(leftArray);
		start = false;
	} else {
		if (prevMove == lastMove) {
				activeArray = functions.randomArray(activeArray);		
		} else {
			let currentArray = [];
			activeSet.childNodes.forEach(el => {
				currentArray.push(Number(el.dataset.number))
			})
			activeArray = functions.randomArray(currentArray);
		}
	}

	for (let i = 0; i < countElements; i++) {
		const card = createCardTemplate(pets, activeArray[i]);
		changedItem.insertAdjacentHTML('beforeend', card);
	}
}

btnPrev.addEventListener('click', function () {
	prevMove = lastMove;
	lastMove = 'prev';
	count == 0 ? count : count--;
	rollSlider();
})

btnNext.addEventListener('click', function () {
	prevMove = lastMove;
	lastMove = 'next';
	count == 2 ? count : count++;
	rollSlider();
})