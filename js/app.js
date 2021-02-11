const display = document.querySelector('.display')
const clearBtn = document.querySelector('#clear')
const signBtn = document.querySelector('#sign')
const percentageBtn = document.querySelector('#percent')
const equalBtn = document.querySelector('#equal')

const operators = ["+", "-", "*", "/"]
let numberString = ""
let equation = ""
let result = null
let operator = ""

// Evento utilizado cuando se da click en un botón
document.addEventListener("click", e => {
  if (!e.target.matches('.numbers')) return
  // Si el valor de la cadena es vacio, se comienza una nueva cadena
  if (numberString === "") {
    display.value = ""
  }
  // Si el resultado no es nulo, limpia la operación
  if (result != null) {
    clear()
  }
  // Obtener el valor del botón y mostrarlo en el 'display'
  const value = e.target.innerText
  if (value === ".") {
    checkDecimal()
    return
  }
  display.value += value
  numberString = display.value
})

// Evento utilizado cuando se da click en un operador
document.addEventListener("click", e => {
  if (!e.target.matches('.operator')) return

  // Si el resultado no es nulo, se agrega el resultado a la operación, si no, se agrega la cadena de números.
  if (result != null) {
    equation = result.toString()
    display.value = equation
    result = null
  } else {
    equation += numberString
  }

  // Obtener el operador
  operator = e.target.innerText
  if (operator === "x") {
    operator = "*"
  }
  if (operator === "÷") {
    operator = "/"
  }
  numberString = ""
  checkOperator()
})

// Evento utilizado para el botón de porcentaje
percentageBtn.addEventListener("click", () => {
  const convertDisplay = parseFloat(display.value)
  const percentage = convertDisplay / 100
  display.value = percentage.toString()
  numberString = display.value
  if (result !== null) {
    equation = ""
    result = null
  }
})

// Evento utilizado para el botón +/-
signBtn.addEventListener("click", () => {
  const convertDisplay = parseFloat(display.value)
  // Si el resultado no es nulo, se quita el signo'-'
  if (result !== null) {
    equation = ""
    if (convertDisplay > 0) {
      display.value = "-" + result.toString()
      numberString = display.value
    } else if (convertDisplay < 0) {
      const string = result.toString()
      const negativeSign = display.value.substr(string[0], 1)
      display.value = string.replace(negativeSign, "")
      numberString = display.value
    }
    result = null
    return
  }
  // Si el resultado es nulo, se agrega el signo '-'
  if (convertDisplay > 0) {
    display.value = "-" + display.value
    numberString = display.value
  } else if (convertDisplay < 0) {
    const negativeSign = display.value.substr(display.value[0], 1)
    display.value = display.value.replace(negativeSign, "")
    numberString = display.value
  }
})

// Limpiar todo (AC)
clearBtn.addEventListener("click", clear)

// Obtener resultado de la operación
equalBtn.addEventListener("click", () => {
  equation += numberString
  result = eval(equation)
  display.value = result
})

// Evita colocar dos signos . seguidos
function checkDecimal() {
  const lastChar = numberString.charAt(numberString.length - 1)
  if (lastChar === ".") return
  else {
    numberString += "."
    display.value = numberString
  }
}

// Evita colocar operadores seguidos
function checkOperator() {
  const lastChar = equation.charAt(equation.length - 1)
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === lastChar) {
      const remove = equation.substr(equation.length - 1, 1)
      equation = equation.replace(remove, operator)
      return
    }
  }
  equation += operator
}

// Funcion para el botón AC
function clear() {
  display.value = ""
  numberString = ""
  equation = ""
  result = null
}

// Total de caracteres visibles en el 'display'
function limit(e) {
  var max_chars = 12;

  if (e.value.length > max_chars) {
    e.value = e.value.substr(0, max_chars);
  }
}