const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');

let currentValue = '0';
let previousValue = '';
let operator = '';

function updateDisplay() {
  resultEl.textContent = currentValue;
}

function inputNumber(num) {
  if (currentValue === '0') {
    currentValue = num;
  } else {
    currentValue += num;
  }
  updateDisplay();
}

function inputOperator(op) {
  if (previousValue && operator) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  currentValue = '0';
  expressionEl.textContent = `${previousValue} ${operator}`;
}

function calculate() {
  if (!previousValue || !operator) return;
  
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  let result;

  if (operator === '+') result = prev + curr;
  else if (operator === '−') result = prev - curr;
  else if (operator === '×') result = prev * curr;
  else if (operator === '÷') result = prev / curr;
  else if (operator === '%') result = prev * (curr / 100);

  currentValue = result.toString();
  previousValue = '';
  operator = '';
  expressionEl.textContent = '';
  updateDisplay();
}

function clearAll() {
  currentValue = '0';
  previousValue = '';
  operator = '';
  expressionEl.textContent = '';
  updateDisplay();
}

function backspace() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
  updateDisplay();
}

document.querySelectorAll('.btn-number').forEach(btn => {
  btn.addEventListener('click', () => inputNumber(btn.dataset.value));
});

document.querySelectorAll('.btn-operator').forEach(btn => {
  const action = btn.dataset.action;
  btn.addEventListener('click', () => {
    if (action === 'add') inputOperator('+');
    else if (action === 'subtract') inputOperator('−');
    else if (action === 'multiply') inputOperator('×');
    else if (action === 'divide') inputOperator('÷');
    else if (action === 'percent') inputOperator('%');
  });
});

document.querySelector('.btn-equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('backspace').addEventListener('click', backspace);
