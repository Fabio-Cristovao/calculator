// variables

let total;
let firstNum = "";
let secondNum = "";
let operator = "";
let calculateArgs = [];

// keys event listener 

let keys = document.querySelectorAll(".keys .button");

let num = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".keys .button.operator");
let display = document.querySelector(".result");
equalsKey = document.querySelector('.total');
let acKey = document.querySelector(".reset");

keys.forEach(key => key.addEventListener("click", getCalculateArgs, false));
equalsKey.addEventListener("click", calculate, false)
acKey.addEventListener("click", reset, false)
total = "";

function getCalculateArgs(e) {

    // get the number arguments

    if (e.target.classList.contains("num") || (e.target.classList.contains("dot"))) { 

        if (calculateArgs.length === 0) {

            total += e.target.innerHTML;
            display.innerHTML = total;

        } else {

            display.innerHTML = "";
            secondNum += e.target.innerHTML;
            display.innerHTML = secondNum;
        }
    }

    // get the operator

    else if (e.target.classList.contains("operator")) {

        switch (e.target.innerHTML) {
            case "+": operator = "add";
                break;
            case '-': operator = "subtract";
                break;
            case '/': operator = "divide";
                break;
            case 'x': operator = "multiply";
                break;

            default: "Invalid operation!"
        }

        let dotCount = (display.innerHTML.match(/\./g) || []).length;

        if (dotCount > 1) {
            reset();
            display.innerHTML = "Invalid!";
        } else {

            numberOfDecimalNumbers = countDecimalPlaces(total);
            console.log(numberOfDecimalNumbers);

            formattedTotal = parseFloat(total).toFixed(6);
            console.log(formattedTotal);

            numberOfDecimalNumbers < 6 ? calculateArgs.push(parseFloat(total), operator) : calculateArgs.push(parseFloat(formattedTotal), operator);

            numberOfDecimalNumbers < 6 ? display.innerHTML = `${total}${e.target.innerHTML}` : display.innerHTML = `${formattedTotal}${e.target.innerHTML}`;
            // display.innerHTML = `${total}${e.target.innerHTML}`;
        }
    }

    // get the total

    else if (e.target.classList.contains("total")) {

        let dotCount = (display.innerHTML.match(/\./g) || []).length;

        if (dotCount > 1) {
            reset();
            display.innerHTML = "Invalid!";
        } else {
            calculateArgs.push(parseFloat(total), operator);
            console.log(calculateArgs);
            countDecimalPlaces(e.target.innerHTML);

            display.innerHTML = `${total}${e.target.innerHTML}`;

            let parsedTotal = parseFloat(total);
            let parsedSecondNum = parseFloat(secondNum);
            total = calculate(parsedTotal, operator, parsedSecondNum);

            numberOfDecimalNumbers = countDecimalPlaces(total);
            console.log(numberOfDecimalNumbers);

            numberOfDecimalNumbers < 6 ? display.innerHTML = total : display.innerHTML = parseFloat(total).toFixed(6);

            secondNum = "";
        }


    } else if (e.target.classList.contains("reset")) {
        reset();
    }

    else {
        console.log("error!");
    }
}

// global functions

function reset() {
    calculateArgs = [];
    total = 0;
    display.innerHTML = 0;
    total = "";
}

function calculate(total, operator, b) {

    console.log(total, operator, b);

    let result;

    switch (operator) {

        case 'add': result = total + b;
            console.log(result);
            break;
        case 'subtract': result = total - b;
            break;
        case 'multiply': result = total * b;;
            break;
        case 'divide': result = total / b;;
            break;

        default: "Invalid operation!"
    }

    return result;
}

// auxiliary functions

function countDecimalPlaces(number) {
    // Convert the number to a string
    let numberStr = number.toString();

    // Use a regular expression to count the decimal places
    let match = numberStr.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

    if (!match) {
        // No decimal places
        return 0;
    }

    // Get the decimal places, or 0 if there are none
    let decimalPart = match[1] || '0';

    // Get the exponent, if present, and adjust the decimal places accordingly
    let exponent = match[2] ? parseInt(match[2]) : 0;

    return Math.max(0, decimalPart.length - exponent);
}














































