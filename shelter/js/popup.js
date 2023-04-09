const popupLinks = document.getElementsByClassName('popup-link');
const placement = document.querySelector('.insert-popup');
const popupCloseIcon = document.querySelectorAll('.close-popup');

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

export const initPopups = (object) => {
	if (popupLinks.length > 0) {
		for (let i = 0; i < popupLinks.length; i++) {
			const popupLink = popupLinks[i];
					
			popupLink.addEventListener('click', function() {
				placement.innerHTML = '';

				const popupHTML = createPopupTemplate(object, popupLink.dataset.number);
				placement.insertAdjacentHTML('beforeend', popupHTML);

				const popup = document.getElementById('popup');
				console.log(popup);
				popupOpen(popup);
			})
		}
	}
}

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