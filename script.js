class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') this.compute()
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':  
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay = isNaN(integerDigits)
      ? ''
      : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })

    return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    this.previousOperandTextElement.innerText =
      this.operation != null
        ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        : ''
  }
}

// ----------------------- DOM & Audio -----------------------

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous]')
const currentOperandTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

const hoverSound = new Audio('Assets/Sound/hover.wav')
const clickSound = new Audio('click.mp3')
const equalSound = new Audio('Assets/Sound/equal.wav')

hoverSound.volume = 0.5
clickSound.volume = 0.3
equalSound.volume = 0.5

function playHoverSound() {
  hoverSound.currentTime = 0
  hoverSound.play()
}

// -------------------- Event Listeners ---------------------

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    clickSound.currentTime = 0
    clickSound.play()
  })

  button.addEventListener('mouseenter', playHoverSound)
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    clickSound.currentTime = 0
    clickSound.play()
  })

  button.addEventListener('mouseenter', playHoverSound)
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
  equalSound.currentTime = 0
  equalSound.play()
})
equalsButton.addEventListener('mouseenter', playHoverSound)

clearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
  clickSound.currentTime = 0
  clickSound.play()
})
clearButton.addEventListener('mouseenter', playHoverSound)

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
  clickSound.currentTime = 0
  clickSound.play()
})
deleteButton.addEventListener('mouseenter', playHoverSound)
