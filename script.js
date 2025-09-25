document.addEventListener('DOMContentLoaded', () => {
    // Lógica para la navegación single-page
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.content-section');

    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Lógica para la calculadora
    const calculator = document.querySelector('.calculator-covenant');
    const keys = calculator.querySelector('.calculator-keys');
    const display = calculator.querySelector('.calculator-screen');
    const historyList = document.getElementById('history-list');

    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;
    let historyEntry = '';

    function calculate(n1, op, n2) {
        if (op === '+') return parseFloat(n1) + parseFloat(n2);
        if (op === '-') return parseFloat(n1) - parseFloat(n2);
        if (op === '*') return parseFloat(n1) * parseFloat(n2);
        if (op === '/') return parseFloat(n1) / parseFloat(n2);
        return n2;
    }

    keys.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const value = key.value;

        if (key.classList.contains('operator')) {
            if (value === '=') {
                if (firstValue !== null && operator !== null && !waitingForSecondValue) {
                    const secondValue = display.value;
                    const result = calculate(firstValue, operator, secondValue);
                    
                    // Añade la operación al historial
                    const historyItem = document.createElement('li');
                    historyItem.textContent = `${firstValue} ${operator} ${secondValue} = ${result}`;
                    historyList.appendChild(historyItem);
                    historyList.scrollTop = historyList.scrollHeight; // Auto-scroll

                    display.value = result;
                    firstValue = result;
                    operator = null;
                    waitingForSecondValue = true;
                }
            } else if (value === 'all-clear') {
                display.value = '';
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            } else {
                if (firstValue === null) {
                    firstValue = display.value;
                } else if (!waitingForSecondValue) {
                    const result = calculate(firstValue, operator, display.value);
                    display.value = result;
                    firstValue = result;
                }
                operator = value;
                waitingForSecondValue = true;
            }
        } else {
            if (waitingForSecondValue) {
                display.value = value;
                waitingForSecondValue = false;
            } else {
                display.value = display.value === '0' ? value : display.value + value;
            }
        }
    });

    // Lógica para el Popup de Bienvenida
    const popup = document.getElementById('welcome-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    // Muestra el popup al cargar la página
    popup.style.display = 'flex';

    acceptBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});