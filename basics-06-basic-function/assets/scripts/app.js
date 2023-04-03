const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput () {
    return parseInt(userInput.value);
}

function createAndWriteLog(operator, resultBeforeCalc, calcNumber) {
    const description = `${resultBeforeCalc} + ${operator} ${calcNumber}`;
    outputResult(currentResult, description);
}

function add () {
    const enteredNumber = getUserNumberInput();
    const initalResult = currentResult;
    currentResult += enteredNumber;
    createAndWriteLog('+',initalResult, enteredNumber);
    const logEntry = {
        operation: 'ADD',
        preResult: initalResult,
        number: enteredNumber,
        newResult: currentResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
   
}

function subtract () {
    const enteredNumber = getUserNumberInput();
    const initalResult = currentResult;
    currentResult -= enteredNumber;
    createAndWriteLog('-', initalResult, enteredNumber)
}

function multiply() {
    const enteredNumber = getUserNumberInput();
    const initalResult = currentResult;
    currentResult *= enteredNumber;
    createAndWriteLog('*', initalResult, enteredNumber)
}

function divide() {
    const enteredNumber = getUserNumberInput();
    const initalResult = currentResult;
    currentResult /= enteredNumber;
    createAndWriteLog('/', initalResult, enteredNumber)
}

addBtn.addEventListener('click' , add);
subtractBtn.addEventListener('click' , subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);