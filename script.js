class Calculator {

    constructor(subResultTextElement, resultTextElement) {
        this.subResultTextElement = subResultTextElement;
        this.resultTextElement = resultTextElement;
        this.clear()
    }

    clear() {
        this.subResultText = '';
        this.resultText = '';
        this.operation = '';
    }

    delete() {
        this.resultText = this.resultText.slice(0, -1);
    }

    appendNumber(value) {
        if (value == '.' && (this.resultText == '' || this.resultText.includes('.'))) return;

        if (this.resultText === 0 && value != '.'){
            this.resultText = value;
            return;
        }

        this.resultText += value;
    }

    renderDisplay() {
        this.resultTextElement.textContent = this.resultText;
        this.subResultTextElement.textContent = this.subResultText;
    }

    solve() {
        let result;

        const prev = Number(this.subResultText);
        const curr = Number(this.resultText);

        switch (this.operation) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "*":
                result = prev * curr;
                break;
            case "/":
                result = prev / curr;
                break;
            default:
                return "error";
        }

        this.resultText = result.toString();
        return result;
    }

    setOperand(value) {
        switch (value) {
            case "^2":
                this.resultText = (this.resultText * this.resultText).toString();
                break;
            case "%":
                this.resultText = (this.resultText / 100).toString();
                break;
            case "+/-":
                this.resultText = (this.resultText * -1).toString();
                break;
            default:
                this.operation = value;
                this.subResultText = this.resultText;
                this.resultText = "";
                break;
        }
    }
}

const numButtons = document.querySelectorAll('.btn-num');
const operationButtons = document.querySelectorAll('.btn-operation');
const deleteButton = document.querySelector('.btn-delete');
const allClearButton = document.querySelector('.btn-all-clear');
const equalsButton = document.querySelector('.btn-equals');

const resultTextElement = document.querySelector('.result');
const subResultTextElement = document.querySelector('.subresult');

const calculator = new Calculator(subResultTextElement, resultTextElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        calculator.appendNumber(button.textContent);
        calculator.renderDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        calculator.setOperand(button.textContent);
        calculator.renderDisplay();
    })
})

deleteButton.addEventListener('click', () => {
    console.log('delete');
    calculator.delete();
    calculator.renderDisplay();
})

allClearButton.addEventListener('click', () => {
    console.log('AC');
    calculator.clear();
    calculator.renderDisplay();
})

equalsButton.addEventListener('click', () => {
    console.log('solve');
    console.log(calculator.solve());
    calculator.renderDisplay();
})