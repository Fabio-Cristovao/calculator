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
let dotCount = 0;

function getCalculateArgs(e) {

    // get the number arguments

    if (e.target.classList.contains("num") || (e.target.classList.contains("dot"))) {

        if (calculateArgs.length === 0) {

            document.querySelector(".dot").style.pointerEvents = "all";

            total += e.target.innerHTML;
            display.innerHTML = total;

            dotNumber = countDots();

            if (dotNumber >= 1) {
                console.log("dot number exceeded");
                document.querySelector(".dot").style.pointerEvents = "none";
            }

        } else {
 
            if (calculateArgs.length === 2) {

                document.querySelector(".dot").style.pointerEvents = "all";

                display.innerHTML = "";
                secondNum += e.target.innerHTML;
                display.innerHTML = secondNum;

                dotNumber = countDots();

                console.log(dotNumber);

                if (dotNumber >= 1) {
                    console.log("dot number exceeded");
                    document.querySelector(".dot").style.pointerEvents = "none";
                }
            }
        }
    }

    // get the operator

    if (e.target.classList.contains("operator")) {

        dotNumber = 0;
        dotNumber = countDots();

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

        if (dotCount <= 1) {
            document.querySelector(".dot").style.pointerEvents = "none";
        }

        numberOfDecimalNumbers = countDecimalPlaces(total);
        formattedTotal = parseFloat(total).toFixed(6);
        numberOfDecimalNumbers < 6 ? calculateArgs.push(parseFloat(total), operator) : calculateArgs.push(parseFloat(formattedTotal), operator);
        numberOfDecimalNumbers < 6 ? display.innerHTML = `${total}${e.target.innerHTML}` : display.innerHTML = `${formattedTotal}${e.target.innerHTML}`;
    }

    // get the total

    else if (e.target.classList.contains("total")) {

        let dotCount = (display.innerHTML.match(/\./g) || []).length;

        if (dotCount > 1 || display.innerHTML === "Invalid!" || total === undefined) {

            reset();
            display.innerHTML = "Invalid!";
        } else {

            countDecimalPlaces(e.target.innerHTML);

            let parsedTotal = parseFloat(total);
            let parsedSecondNum = parseFloat(secondNum);

            console.log(total, operator, secondNum);

            total = calculate(parsedTotal, operator, parsedSecondNum);

            console.log(parsedTotal);

            numberOfDecimalNumbers = countDecimalPlaces(total);

            numberOfDecimalNumbers < 6 ? display.innerHTML = parseFloat(total) : display.innerHTML = parseFloat(total).toFixed(6);
        }

        secondNum = "";

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

    let result;

    if (b === "") {
        console.log("here");
    }

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

        console.log("here");

        reset();
        display.innerHTML = "Invalid!";

    } else {

        operator = "";
        b = "";

        return parsedResult;
    }
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

function countDots() {

    dotCount = 0;

    console.log(calculateArgs.length);

    let screen = display.innerHTML;
    let dotMatches = screen.match(/\./g) || [].length;

    if (dotMatches) {
        dotCount += dotMatches.length;
    }

    console.log(dotCount);

    return dotCount;
}






















































