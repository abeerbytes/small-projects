let display = document.getElementById('result');
let currentValue = '0';

function updateDisplay() {
    display.textContent = currentValue;
}

function appendToDisplay(value) {

    // prevent multiple operators in a row
    const operators = ['+', '−', 'x', '/'];
    const lastChar = currentValue.slice(-1);

    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    // prevent multiple dots in same number
    if (value === '.') {
        let parts = currentValue.split(/[+\−x/]/);
        if (parts[parts.length - 1].includes('.')) return;
    }

    if (currentValue === '0' && value !== '.') {
        currentValue = value;
    } else {
        currentValue += value;
    }

    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    updateDisplay();
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    if (currentValue === '') currentValue = '0';
    updateDisplay();
}

function calculate() {
    try {
        // convert symbols to JS operators
        let expression = currentValue
            .replace(/x/g, '*')
            .replace(/−/g, '-');

        // safety check
        if (/[^0-9+\-*/.]/.test(expression)) throw "Invalid";

        let result = Function("return " + expression)();

        if (!isFinite(result)) throw "Math Error";

        currentValue = result.toString();
        updateDisplay();
    } catch (e) {
        currentValue = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

// initial display
updateDisplay();
