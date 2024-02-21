let currentInput = "";
let previousInput = "";
let currentOperator = null;
let resultDisplayed = false;

function inputDigit(digit) {
    if (digit === '.' && currentInput.includes('.')) return;
  
    if (resultDisplayed) {
      currentInput = digit;
      resultDisplayed = false;
    } else {
      currentInput += digit;
    }
    updateDisplay(currentInput);
  }
  

function inputDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay(currentInput);
}

function performOperation(operator) {
  if (previousInput && currentInput && currentOperator) {
    calculate();
  }
  previousInput = currentInput;
  currentInput = "";
  currentOperator = operator;
}

function calculate() {
  if (previousInput && currentInput && currentOperator) {
    const firstNum = parseFloat(previousInput);
    const secondNum = parseFloat(currentInput);
    switch (currentOperator) {
      case "+":
        currentInput = (firstNum + secondNum).toString();
        break;
      case "-":
        currentInput = (firstNum - secondNum).toString();
        break;
      case "*":
        currentInput = (firstNum * secondNum).toString();
        break;
      case "/":
        if (secondNum !== 0) {
          currentInput = (firstNum / secondNum).toString();
        } else {
          currentInput = "Error";
        }
        break;
    }
    resultDisplayed = true;
    updateDisplay(currentInput);
    currentOperator = null;
  }
}


let xValue = 0;
let currentFunction = '';

function drawGraph(func) {
    currentFunction = func;
}

function draw() {
    xValue = document.getElementById('xValue').value;
    let yValues = [];

    // Calculate y values based on the function
    switch(currentFunction) {
        case 'sin':
            for(let i = 0; i <= xValue; i++) {
                yValues.push(Math.sin(i));
            }
            break;
        case 'cos':
            // Similar to 'sin'
            break;
        case 'tan':
            // Similar to 'sin'
            break;
        case 'log':
            // Similar to 'sin'
            break;
    }

    // Draw the graph using Chart.js
    var ctx = document.getElementById('graphCanvas').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: xValue}, (_, i) => i + 1),
            datasets: [{
                label: currentFunction,
                data: yValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




function updateDisplay(value) {
  document.getElementById("display").value = value;
}

function clearCalculator() {
  currentInput = "";
  previousInput = "";
  currentOperator = null;
  resultDisplayed = false;
  updateDisplay("0");
}

// Event listener for keyboard input
document.addEventListener("keydown", function (event) {
  if (
    (event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 96 && event.keyCode <= 105)
  ) {
    inputDigit(event.key);
  } else if (
    event.keyCode === 107 ||
    event.keyCode === 109 ||
    event.keyCode === 106 ||
    event.keyCode === 111
  ) {
    performOperation(event.key);
  } else if (event.keyCode === 13) {
    calculate();
  } else if (event.keyCode === 110 || event.keyCode === 190) {
    inputDecimal();
  }
});

function calculateSquareRoot() {
  if (currentInput) {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
  }
}

function calculatePercentage() {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
  }
}

function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
  

// Call clearCalculator to set initial display
clearCalculator();
