'use strict';
function MatrixChallenge(strArr) {
	let result = true;
	for (let i = 0; i < strArr.length; i++) {

		result = checkQueen(i, strArr);
		if (result !== true) {
			return result;
		}
	}

	return result;
}

function checkQueen(i, arrCoordinats) {
	const queenEl = arrCoordinats[i];
	let x = +queenEl[1];
	let y = +queenEl[3];

	let result = true;

	arrCoordinats.forEach((el, idx) => {
		if (i !== idx) {
			return;
		}
		const isDiagonalsIntrersect = Math.abs(x - +el[1]) === Math.abs(y - +el[3]);

		if (+el[1] === x || +el[3] === y || isDiagonalsIntrersect) {
			result = queenEl;
		}
	});

	return result;
}

console.log(MatrixChallenge(["(2,1)", "(5,3)", "(6,3)", "(8,4)", "(3,4)", "(1,8)", "(7,7)", "(5,8)"]));




/*
function countSmileys(arr) {
	if (arr.length === 0) { return 0; }
	let count = 0;

	const resultArr = arr.forEach(element => {
		let smyleEl = element.split('');

		if (smyleEl.length === 2 && (smyleEl[0] === ':' || smyleEl[0] === ';') && (smyleEl[1] === ')' || smyleEl[1] === 'D')) {
			count++;
		}
		if (smyleEl.length === 3 && (smyleEl[0] === ':' || smyleEl[0] === ';') && (smyleEl[1] === '-' || smyleEl[1] === '~') && (smyleEl[2] === ')' || smyleEl[2] === 'D')) {
			count++;
		}
		return count;
	});
	return count;
}
*/
//countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
//countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
//countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;
/*
function basicOp(operation, value1, value2) {
	switch (operation) {
		case '+':
			return value1 + value2;
		case '-':
			return value1 - value2;
		case '*':
			return value1 * value2;
		case '/':
			return value1 / value2;
	}
}

console.log(basicOp('+', 10, 2));
*/