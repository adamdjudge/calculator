// setup
const { BrowserWindow, dialog } = require('electron').remote;
const path = require('path');
const url = require('url');
let currentValue = 0;
let func = '';
let prev = 0;
let clearOnKey = false;

function addDigit(digit) {
    if (clearOnKey) {
        currentValue = 0;
        clearOnKey = false;
    }
    if (currentValue.toString().length < 11) {
        currentValue = currentValue * 10 + digit;
        document.getElementById('number').innerHTML = currentValue.toString();
    }
}

function pressClear() {
    clearOnKey = false;
    currentValue = 0;
    document.getElementById('number').innerHTML = '0';
}

function pressSign() {
    if (currentValue.toString().length < 11) {
        currentValue = -currentValue;
        document.getElementById('number').innerHTML = currentValue.toString();
    }
}

function setFunction(f) {
    func = f;
    prev = currentValue;
    clearOnKey = true;
}

function pressEquals() {
    if (clearOnKey) {
        currentValue = 0;
        document.getElementById('number').innerHTML = 'error';
    }
    else {
        let newValue = 0;
        switch (func) {
            case '+':
                newValue = prev + currentValue;
                break;
            case '-':
                newValue = prev - currentValue;
                break;
            case '*':
                newValue = prev * currentValue;
                break;
            case '/':
                if (currentValue == 0) {
                    document.getElementById('number').innerHTML = 'division by 0';
                    return;
                }
                newValue = prev / currentValue;
                break;
            default:
                return;
        }
        func = '';
        currentValue = newValue;
        prev = 0;
        if (currentValue.toString().length > 11) {
            document.getElementById('number').innerHTML = 'overflow error';
            currentValue = 0;
        }
        else document.getElementById('number').innerHTML = currentValue.toString();
    }
}