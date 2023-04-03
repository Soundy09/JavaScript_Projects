const defaultResult = 0;
let currentResult = defaultResult;

function addNumbers() {
    currentResult = currentResult + userInput.value;
    outputResult(currentResult, '');
}

addBtn.addEventListener('click', add)
