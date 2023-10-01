import * as sliderjs from "./slider.js";
import * as popup from "./popup.js";
import pets from '../pets.json' assert { type: "json" };

sliderjs.init();
popup.initPopups(pets);

window.addEventListener('resize', () => {
	sliderjs.init();
	popup.initPopups(pets);
});

sliderjs.slider.addEventListener('transitionend', function(event) {
	if (event.target === sliderjs.slider) {
		sliderjs.setDefaultState();
		popup.initPopups(pets);
	}
});