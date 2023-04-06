const burgerMenu = function () {
	const menu = document.querySelector('.icon-menu');
	const headerBackground = document.querySelector('.header-nav-menu__background');
	const headerBody = document.querySelector('.header-nav-menu__body');

	const toggleClassActive = function () {
		document.body.classList.toggle('lock');
		menu.classList.toggle('active');
		headerBackground.classList.toggle('active');
		headerBody.classList.toggle('active');
	}

	const removeClassActive = function () {
		document.body.classList.remove('lock');
		menu.classList.remove('active');
		headerBackground.classList.remove('active');
		headerBody.classList.remove('active');
	}

	menu.addEventListener('click', toggleClassActive);
	headerBackground.addEventListener('click', removeClassActive);

	const list = document.querySelector('.header-nav-menu__list');

	list.addEventListener('click', (event) => {
		const target = event.target;
		if (target.tagName == 'A') removeClassActive();
	})
}

burgerMenu();


