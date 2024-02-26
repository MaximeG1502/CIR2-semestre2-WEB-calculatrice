const display = document.getElementById("display");
let currentFunction = null;

function selectFunction(func) {
    currentFunction = func;
}

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}


function calculate() {
    try {
        if (currentFunction !== null) {
            const inputValue = parseFloat(display.value);
            if (!isNaN(inputValue)) {
                let result;
                switch (currentFunction) {
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
                        if (inputValue > 0) { // valeurs positives pour le log
                            result = Math.log(inputValue);
                            display.value = `log(${inputValue}) = ${result}`;
                        } else {
                            display.value = "Erreur: Argument invalide pour log";
                        }
                        break;
                    case '%':l
                        display.value = inputValue / 100;
                        break;
                    case '√':
                        display.value = Math.sqrt(inputValue);
                        break;
                    default:
                        display.value = "Erreur: Fonction non reconnue";
                }
            } else {
                display.value = "Erreur: Argument invalide";
            }
        } else {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = "Erreur";
    }
    currentFunction = null;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


let myChart; // Déclarer la variable du graphique en dehors de la fonction

function drawGraph() {
    const expression = document.getElementById('expression').value;
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const step = parseFloat(document.getElementById('step').value);

    const xValues = generateRange(xMin, xMax, step);
    const yValues = xValues.map(x => evaluateFunction(expression, x));

    // Vérifier si un graphique existe déjà et le détruire
    if (myChart) {
        myChart.destroy();
    }

    // Configuration du nouveau graphique
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues, // Valeurs de x
            datasets: [{
                label: 'Fonction',
                data: yValues, // Valeurs de y correspondantes
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

function generateRange(min, max, step) {
    const range = [];
    for (let i = min; i <= max; i += step) {
        range.push(i);
    }
    return range;
}

function evaluateFunction(expression, x) {
    // Évalue l'expression de la fonction pour la valeur de x donnée
    try {
        const result = eval(expression.replace(/x/g, x));
        return result;
    } catch (error) {
        console.error("Erreur lors de l'évaluation de l'expression:", error);
        return NaN;
    }
}



