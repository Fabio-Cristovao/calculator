

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

// variables

let firstNum = [];
let operator;
let secondNum;

total = [];
let calculateArgs = [];
display.innerHTML = 0;
let dotCount = 0;

equalsKey.style.pointerEvents = "none";

/* function getCalculateArgs() {
    console.log("first num, operator and second num")
}; */

function getCalculateArgs(e) {

    if (e.target.classList.contains("num") || e.target.classList.contains("dot")) {
        let firstNum; 
        firstNum = parseFloat(e.target.innerHTML);
        calculateArgs.push(firstNum);
    }

    if (e.target.classList.contains("operator")) {

        operator = e.target.innerHTML;
        calculateArgs.push(operator);     
    }

    display.innerHTML = calculateArgs.join("");
    console.log(calculateArgs);

}

// global functions

function reset() {
    calculateArgs = [];
    total = 0;
    display.innerHTML = 0;
    total = "";
};

function calculate(total, operator, b) {

    let result;

    switch (operator) {

        case 'add': result = total + b;
            break;
        case 'subtract': result = total - b;
            break;
        case 'multiply': result = total * b;;
            break;
        case 'divide': result = total / b;;
            break;

        default: "Invalid operation!"
    }
    let parsedResult = parseFloat(result);

    if (typeof parsedResult !== 'number') {

        reset();
        display.innerHTML = "Invalid!";

    } else {

        operator = "";
        b = "";

        return parsedResult;
    }
};

// auxiliary functions

function getNumbersfromInput(inputArray) {
    const numericValue = parseFloat(inputArray.join('').replace(/,/g, ''));   
    return numericValue;
}

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
};

function countDots() {

    dotCount = 0;

    let screen = display.innerHTML;
    let dotMatches = screen.match(/\./g) || [].length;

    if (dotMatches) {
        dotCount += dotMatches.length;

        if (dotCount <= 1) {
            document.querySelector(".dot").style.pointerEvents = "all";
        } else {

            document.querySelector(".dot").style.pointerEvents = "none";
        }
    }

    return dotCount;
};

function removeLastDot(inputString) {

    if (inputString.charAt(inputString.length - 1) === '.') {

        return inputString.slice(0, -1);
    }

    return inputString;

};

function formatNUmberWithMaximumDecimals(num) {

    const formattedNumber = num.toFixed(6); // Format with up to 6 decimal places
    const withoutTrailingZeros = formattedNumber.replace(/\.?0+$/, ''); // Remove trailing zeros

    return withoutTrailingZeros;
};























































