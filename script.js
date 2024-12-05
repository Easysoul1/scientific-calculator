
const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const buttons = document.querySelectorAll("button");
let memory = 0;

// Scientific function handler
function handleScientificFunction(functionName) {
    const inputValue = parseFloat(display.value);
    if (!isNaN(inputValue)) {
        let result;
        switch (functionName) {
            case 'sin':
                result = Math.sin(inputValue * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(inputValue * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(inputValue * Math.PI / 180);
                break;
            case '√':
                result = Math.sqrt(inputValue);
                break;
            case 'x²':
                result = Math.pow(inputValue, 2);
                break;
            case 'x³':
                result = Math.pow(inputValue, 3);
                break;
            case 'log':
                result = Math.log10(inputValue);
                break;
            case 'exp':
                result = Math.exp(inputValue);
                break;
            default:
                result = inputValue;
        }
        display.value = result;
        updateHistory(`${functionName}(${inputValue}) = ${result}`);
    }
}

// Update event listeners for all buttons
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = button.textContent.toLowerCase();
        if (['sin', 'cos', 'tan', '√', 'x²', 'x³', 'log', 'exp'].includes(buttonText)) {
            handleScientificFunction(buttonText);
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === 'c') {
            clearDisplay();
        } else {
            appendToDisplay(button.textContent);
        }
    });
});



// Calculate and update display
function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
    } catch {
        display.value = "Error!";
    }
}

// Keyboard support
document.addEventListener("keydown", (event) => {
    if (event.key.match(/[0-9+\-*/.=]/)) {
        appendToDisplay(event.key);
    }
    if (event.key === "Enter") {
        calculate();
    }
    if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
});

// Clear display
function clearDisplay() {
    display.value = "";
}

// Append input to display
function appendToDisplay(input) {
    display.value += input;
}


// Theme toggle
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        document.body.style.backgroundColor = "#1a1a1a";
    } else {
        document.body.style.backgroundColor = "#dedede";
    }
}