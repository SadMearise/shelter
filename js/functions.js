import pets from '../pets.json' assert { type: "json" };

export const randomArray = (uniqueArr = false, maxValues = 3) => {
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

export const toEm = (px) => {return px / 16 + 'em'};

export const shuffle = (array) => {
	let sortedArray = [...array].sort(() => Math.random() - 0.5);

	if (array.every((el, index) => el == sortedArray[index])) {
		return shuffle(array)
	} 
	return sortedArray;
}