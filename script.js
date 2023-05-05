// 연산자 상수
const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';

// 계산기 상수
const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('#result');
const clearButton = calculator.querySelector('#clear');
const equalsButton = calculator.querySelector('#equals');
const operatorButtons = calculator.querySelectorAll('.operator');
const numberButtons = calculator.querySelectorAll('.number');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// 계산 함수
function calculate() {
	let result = '';
	const first = parseFloat(firstNumber);
	const second = parseFloat(secondNumber);

	switch (currentOperator) {
		case ADD:
			result = first + second;
			break;
		case SUBTRACT:
			result = first - second;
			break;
		case MULTIPLY:
			result = first * second;
			break;
		case DIVIDE:
			result = first / second;
			break;
		default:
			return;
	}

	display.value = result;
	firstNumber = result;
	secondNumber = '';
	currentOperator = null;
}

// 계산기 초기화 함수
function clear() {
	display.value = '0';
	firstNumber = '';
	secondNumber = '';
	currentOperator = null;
}

// 버튼 이벤트 핸들러 함수
function handleButtonClick(event) {
	const button = event.target;
	const buttonText = button.textContent;

	if (button.classList.contains('number')) {
		if (display.value === '0' || shouldResetDisplay) {
			display.value = buttonText;
			shouldResetDisplay = false;
		} else {
			display.value += buttonText;
		}
	} else if (button.classList.contains('operator')) {
		if (currentOperator !== null) {
			calculate();
		}
		firstNumber = display.value;
		currentOperator = buttonText;
		shouldResetDisplay = true;
	} else if (button === clearButton) {
		clear();
	} else if (button === equalsButton) {
		if (currentOperator === null) {
			return;
		}
		calculate();
		shouldResetDisplay = true;
	}
}

// 버튼 이벤트 리스너 등록
for (const button of operatorButtons) {
	button.addEventListener('click', handleButtonClick);
}

for (const button of numberButtons) {
	button.addEventListener('click', handleButtonClick);
}

clearButton.addEventListener('click', handleButtonClick);
equalsButton.addEventListener('click', handleButtonClick);
