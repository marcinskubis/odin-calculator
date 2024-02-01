//components selection
const numericButtons = document.querySelectorAll(".number");
const input = document.querySelector("input");
const clearButton = document.querySelector("#clear").addEventListener('click', clearInput);
const signButton = document.querySelector("#sign").addEventListener('click', changeSign);
const operationButtons = document.querySelectorAll(".operation");
const dashButton = document.querySelector("#dot");

//variables
let previousValue = '0';
let currentOperation = null;
let operationPressed = false;

//logic
numericButtons.forEach((button) => {
    button.addEventListener('click', function(event){
        console.log('operation pressed ' + operationPressed);
        if(operationPressed) input.value = 0;
        input.value = input.value === '0' ? button.textContent : input.value + button.textContent;
        operationPressed = false;
    })
});
operationButtons.forEach((button) => {
    button.addEventListener('click', function(event){
        performCalculation(button.id);
    });
});

dashButton.addEventListener('click', addFloatingPoint);

function performCalculation(newOperation){
    // console.log("before");
    // console.log("new operation: " + newOperation);
    // console.log("current operation: " + currentOperation);
    // console.log("previous value: " + previousValue);
    // console.log("current value: " + input.value);
    if(currentOperation && !operationPressed){
        let result;
        switch(currentOperation){
            case 'div':
                result = div(Number.parseFloat(previousValue), Number.parseFloat(input.value));
                //return div(a, b);
                break;
            case 'mul':
                result = mul(Number.parseFloat(previousValue), Number.parseFloat(input.value));
                //return mul(a, b);
                break;
            case 'add':
                result = add(Number.parseFloat(previousValue), Number.parseFloat(input.value));
                break;
            case 'sub':
                result = sub(Number.parseFloat(previousValue), Number.parseFloat(input.value));
                break;
            case 'equ':
                equ();
                break;
            case 'percent':
                result = percent(Number.parseFloat(previousValue), Number.parseFloat(input.value));
                break;
        }
        if (!isNaN(result)) {
            let beforeDecimalCount = 0;
            let index = result.toString().indexOf('.');
            if(index !== -1){
                beforeDecimalCount = result.toString().substring(0, index).length;
            }
            console.log(beforeDecimalCount);
            input.value = beforeDecimalCount > 0 ? result.toFixed(7 - beforeDecimalCount) : result;
        }
        previousValue = input.value;
        currentOperation = newOperation;
        operationPressed = true;
    }
    else{
        currentOperation = newOperation;
        operationPressed = true;
        previousValue = input.value;
    }
    // console.log("   ");
    // console.log("after");
    // console.log("new operation: " + newOperation);
    // console.log("current operation: " + currentOperation);
    // console.log("previous value: " + previousValue);
    // console.log("current value: " + input.value);
}
//functions
// Addition function
function add(a, b) {
    return a + b;
}

// Subtraction function
function sub(a, b) {
    return a - b;
}

// Multiplication function
function mul(a, b) {
    return a * b;
}

// Division function
function div(a, b) {
    if (b === 0.0) {
        return "Error";
    }
    return a / b;
}
// Equals function
function equ() {
    currentOperation = null;
    performCalculation(null);
}

//Percent function
function percent(a, b){
    return a * b/100;
}

function clearInput(){
    input.value = 0;
    previousValue = '0';
    currentOperation = null;
}

function changeSign(){
    input.value = input.value * -1;
}

function addFloatingPoint(){
    if(!input.value.includes('.')) input.value = input.value + '.';
}
//set zero's button height the same as width of other buttons
window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const buttonWidth = button.offsetWidth;
    const zeroButton = document.querySelector("#zero-button");
    zeroButton.style.maxHeight = `${buttonWidth}px`;
});
