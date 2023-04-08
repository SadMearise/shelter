import pets from '../pets.json' assert { type: "json" };
// import { initPopups } from './popup.js';



let popupLinks = document.getElementsByClassName('popup-link');

const popupClose = (popupActive) => {
	popupActive.classList.remove('open');
	document.body.classList.remove('lock');
}


const popupOpen = (currentPopup) => {
	if (currentPopup) {

		document.body.classList.add('lock');
		currentPopup.classList.add('open');

		currentPopup.addEventListener('click', function(event) {
			if (!event.target.closest('.popup__content')) {
				popupClose(event.target.closest('.popup'));
			}
		})
	}
}


const createPopupTemplate = (object, number) => {
	const inoculations = object[number].inoculations.join(', ');
	const diseases = object[number].diseases.join(', ');
	const parasites = object[number].parasites.join(', ');

	const popup = `
	<div id="popup" class="popup">
		<div class="popup__body">
			<div class="popup__wrapper">
				<div class="popup__content">
					<img src="${object[number].img}" alt="pet" class="popup__img">
					<div class="popup__pet-info pet-info">
						<div class="pet-info__name h3-title h3-title_dark h3-title_big">${object[number].name}</div>
						<div class="pet-info__type"><span>${object[number].type}</span> - <span>${object[number].breed}</span></div>
						<div class="pet-info__descr">${object[number].description}</div>
						<ul class="pet-info__list pet-info-list">
							<li class="pet-info-list__item"><strong>Age: </strong><span>${object[number].age}</span></li>
							<li class="pet-info-list__item"><strong>Inoculations: </strong><span>${inoculations}</span></li>
							<li class="pet-info-list__item"><strong>Diseases: </strong><span>${diseases}</span></li>
							<li class="pet-info-list__item"><strong>Parasites: </strong><span>${parasites}</span></li>
						</ul>
					</div>
				</div>
				<button class="popup__btn nav-btn nav-btn_close close-popup">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
`
	return popup;
}

const initPopups = () => {
	if (popupLinks.length > 0) {
		for (let i = 0; i < popupLinks.length; i++) {
			const popupLink = popupLinks[i];
			
			
			
			popupLink.addEventListener('click', function() {
				const placement = document.querySelector('.insert-popup');
				placement.innerHTML = '';
				const popupHTML = createPopupTemplate(pets, popupLink.dataset.number);
				placement.insertAdjacentHTML('beforeend', popupHTML);
				const popup = document.getElementById('popup');
				popupOpen(popup);
			})
		}
	}
}

initPopups();

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
	for (let i = 0; i < popupCloseIcon.length; i++) {
		const el = popupCloseIcon[i];

		el.addEventListener('click', function() {
			popupClose(el.closest('.popup'));
		})
	}
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		const popupActive = document.querySelector('popup.open');
		popupClose(popupActive);
	}
})

const slider = document.querySelector('.friends-slider__wrapper');
const btnPrev = document.querySelector('.friends-slider__button-prev');
const btnNext = document.querySelector('.friends-slider__button-next');
const slideSetLeft = document.getElementById('slide-set-left');
const slideSetActive = document.getElementById('slide-set-active');
const slideSetRight = document.getElementById('slide-set-right');
const breakpoint992 = 991.98;
const breakpoint576 = 575.98;
const toEm = (px) => {return px / 16 + 'em'};

let count = 1;
let lastMove;

const createCardTemplate = (object, number) => {
	const card =   `<div class="friends-slider__slide pet-card popup-link" data-number="${number}">
						<div class="pet-card__content">
							<div class="pet-card__row">
								<img src="${object[number].img}" alt="pet" class="pet-card__image">
							</div>
							<div class="pet-card__row">
								<span class="pet-card__title">${object[number].name}</span>
								<a href="our-pets.html" class="pet-card__button btn btn_light">Learn more</a>
							</div>
						</div>  
					</div>`
	return card;
}

const randomArray = (uniqueArr = false, maxValues = 3) => {
	let arr = [];
	let randomNum;
	
	while (arr.length < maxValues) {
		randomNum = Math.floor(Math.random() * pets.length);
		if (uniqueArr) {
			if (arr.indexOf(randomNum) == -1 && uniqueArr.indexOf(randomNum) == -1) { arr.push(randomNum); }
		} else {
			if (arr.indexOf(randomNum) == -1) { arr.push(randomNum); }
		}
	}
	return arr;
}
let activeArray;
let leftArray;
let rightArray;

const init = () => {
	activeArray = randomArray();
	leftArray = randomArray(activeArray);
	rightArray = randomArray(activeArray);

	const mediaQuery992 = window.matchMedia(`(max-width: ${toEm(breakpoint992)})`);
	const mediaQuery576 = window.matchMedia(`(max-width: ${toEm(breakpoint576)})`);
	let elementCount;
	
	if (mediaQuery576.matches) {
		elementCount = 1;
	} else if (mediaQuery992.matches) {
		elementCount = 2;
	} else {
		elementCount = 3;
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

	let q = [];
	let w = [];
	let e = [];
	for (let i = 0; i < elementCount; i++) {
		const cardLeft = createCardTemplate(pets, leftArray[i]);
		const cardActive = createCardTemplate(pets, activeArray[i]);
		const cardRight = createCardTemplate(pets, rightArray[i]);

		slideSetLeft.insertAdjacentHTML('beforeend', cardLeft);
		slideSetActive.insertAdjacentHTML('beforeend', cardActive);
		slideSetRight.insertAdjacentHTML('beforeend', cardRight);
		q.push(pets[leftArray[i]].name + leftArray[i]);
		w.push(pets[activeArray[i]].name + activeArray[i]);
		e.push(pets[rightArray[i]].name + rightArray[i]);
	}
	console.log('left:', q);
	console.log('active:', w);
	console.log('right:', e);
	const width = slider.offsetWidth;
	slider.style.left = -(width) + 'px';

	initPopups();
}

window.addEventListener('resize', init);

init();

const setDefaultState = () => {
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

slider.addEventListener('transitionend', function(event) {
	if (event.target === slider) {
		setDefaultState();
	}
});

btnPrev.addEventListener('click', function() {
	lastMove = 'prev';
	count == 0 ? count : count--;
	rollSlider();
})

btnNext.addEventListener('click', function() {
	lastMove = 'next';
	count == 2 ? count : count++;
	rollSlider();
})

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

	const mediaQuery992 = window.matchMedia(`(max-width: ${toEm(breakpoint992)})`);
	const mediaQuery576 = window.matchMedia(`(max-width: ${toEm(breakpoint576)})`);

	let elementCount;
	
	if (mediaQuery576.matches) {
		elementCount = 1;
	} else if (mediaQuery992.matches) {
		elementCount = 2;
	} else {
		elementCount = 3;
	}

	while (changedItem.firstChild) {
		changedItem.removeChild(changedItem.firstChild);
	}

	
	activeArray = randomArray(activeArray);
	for (let i = 0; i < elementCount; i++) {
		const card = createCardTemplate(pets, activeArray[i]);
		changedItem.insertAdjacentHTML('beforeend', card);
	}

	initPopups();
}