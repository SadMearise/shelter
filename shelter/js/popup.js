
// let popupLinks = document.getElementsByClassName('popup-link');
// const popup = document.getElementById('popup');

// const popupClose = (popupActive) => {
// 	popupActive.classList.remove('open');
// 	document.body.classList.remove('lock');
// }


// const popupOpen = (currentPopup) => {
// 	if (currentPopup) {

// 		document.body.classList.add('lock');
// 		currentPopup.classList.add('open');

// 		currentPopup.addEventListener('click', function(event) {
// 			if (!event.target.closest('.popup__content')) {
// 				popupClose(event.target.closest('.popup'));
// 			}
// 		})
// 	}
// }

// export const initPopups = () => {
// 	if (popupLinks.length > 0) {
// 		for (let i = 0; i < popupLinks.length; i++) {
// 			const popupLink = popupLinks[i];
	
// 			popupLink.addEventListener('click', function() {
// 				popupOpen(popup);
// 			})
// 		}
// 	}
// }

// initPopups();

// const popupCloseIcon = document.querySelectorAll('.close-popup');

// if (popupCloseIcon.length > 0) {
// 	for (let i = 0; i < popupCloseIcon.length; i++) {
// 		const el = popupCloseIcon[i];

// 		el.addEventListener('click', function() {
// 			popupClose(el.closest('.popup'));
// 		})
// 	}
// }

// document.addEventListener('keydown', function(event) {
// 	if (event.key === 'Escape') {
// 		const popupActive = document.querySelector('popup.open');
// 		popupClose(popupActive);
// 	}
// })