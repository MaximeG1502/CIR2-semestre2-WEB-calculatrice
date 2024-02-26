const display = document.getElementById("display"); //recover the elements

let currentFunction = null; // variable for the switch case 


document.addEventListener('keydown', function(event) { // type with keyboard
    const key = event.key; 
    if (!isNaN(key)) {
        appendToDisplay(key);
    } else if (key === 'Backspace') {
        clearDisplay();
    }else if (key === '+') {
        appendToDisplay(key);
    }else if (key === '-') {
        appendToDisplay(key);
    }else if (key === '*') {
        appendToDisplay(key);
    }else if (key === '/') {
        appendToDisplay(key);
    }else if (key === 'Enter') {
        display.value = eval(display.value);
    }
});



function selectFunction(func) { //process the different calculation cases
    currentFunction = func;
}

function appendToDisplay(input) { // function to show user inputs on the screen
    display.value += input;
}

function clearDisplay() { // clear the screen
    display.value = "";
}


function calculate() {
    try {
        if (currentFunction !== null) {
            const inputValue = parseFloat(display.value); // conversion to decimal
            if (!isNaN(inputValue)) {
                let result;
                switch (currentFunction) { //switch for differents cases sin,cos,tan or log functions
                    case 'sin':
                        result = Math.sin(inputValue);
                        display.value = `sin(${inputValue}) = ${result}`;
                        break;
                    case 'cos':
                        result = Math.cos(inputValue);
                        display.value = `cos(${inputValue}) = ${result}`;
                        break;
                    case 'tan':
                        result = Math.tan(inputValue);
                        display.value = `tan(${inputValue}) = ${result}`;
                        break;
                    case 'log':
                        if (inputValue > 0) { // only positives values for log
                            result = Math.log(inputValue);
                            display.value = `log(${inputValue}) = ${result}`;
                        } else {
                            display.value = "No valid Argument for Log";
                        }
                        break;
                    case '%':l
                        display.value = inputValue / 100; // function modulo
                        break;
                    case '√':
                        display.value = Math.sqrt(inputValue); // squareroot function
                        break;
                    default:
                        display.value = "Function is not valid"; // error
                }
            } else {
                display.value = "Error, please retry";
            }
        } else {
            display.value = eval(display.value); // using eval function for basics operations
        }
    } catch (error) {
        display.value = "Erreur";
    }
    currentFunction = null; // set the variable at default at the end of each iterations
}

function toggleDarkMode() { // dark mode function
    document.body.classList.toggle("dark-mode");
}


let myChart; // graph variable

function drawGraph() {

    // differents variables for the plot and to recover the function's expression written by users
    const expression = document.getElementById('expression').value;
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const step = parseFloat(document.getElementById('step').value);

    const xValues = generateRange(xMin, xMax, step);
    const yValues = xValues.map(x => evaluateFunction(expression, x));

    // reset the graph if one is already created
    if (myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d'); // create the graph
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues, // x values
            datasets: [{
                label: 'Function',
                data: yValues, // y values
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}

function generateRange(min, max, step) { //function to determined the domain and the step for each points
    const range = [];
    for (let i = min; i <= max; i += step) {
        range.push(i);
    }
    return range;
}

function evaluateFunction(expression, x) {
    // calculate the differents values of the function for each values of x
    try {
        // cos, sin, tan & log functions
        const sin = Math.sin;
        const cos = Math.cos;
        const tan = Math.tan;
        const log = Math.log;

        const result = eval(expression.replace(/x/g, x)); // using eval function to calculate

        return result;

    } catch (error) {
        console.error("Error while calculating", error); // case for error
        return NaN;
    }
}




