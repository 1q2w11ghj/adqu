let display = '0';
        let history = '';
        let isDegree = true;

        const resultElement = document.getElementById('result');
        const historyElement = document.getElementById('history');
        const degBtn = document.getElementById('deg-mode');
        const radBtn = document.getElementById('rad-mode');

        degBtn.addEventListener('click', () => {
            isDegree = true;
            degBtn.classList.add('active');
            radBtn.classList.remove('active');
        });

        radBtn.addEventListener('click', () => {
            isDegree = false;
            radBtn.classList.add('active');
            degBtn.classList.remove('active');
        });

        function updateDisplay() {
            resultElement.textContent = display;
            historyElement.textContent = history;
        }

        function addToDisplay(value) {
            if (display === '0' && value !== '.') {
                display = value;
            } else {
                display += value;
            }
            updateDisplay();
        }

        function addFunction(func) {
            if (display === '0') {
                display = func;
            } else {
                display += func;
            }
            updateDisplay();
        }

        function addValue(value) {
            const values = {
                'π': Math.PI,
                'e': Math.E
            };
            if (display === '0') {
                display = values[value].toString();
            } else {
                display += values[value].toString();
            }
            updateDisplay();
        }

        function clearAll() {
            display = '0';
            history = '';
            updateDisplay();
        }

        function backspace() {
            display = display.length > 1 ? display.slice(0, -1) : '0';
            updateDisplay();
        }

        function factorial() {
            try {
                let num = parseFloat(display);
                if (num < 0 || !Number.isInteger(num)) {
                    display = 'Error';
                } else {
                    let result = 1;
                    for (let i = 2; i <= num; i++) {
                        result *= i;
                    }
                    display = result.toString();
                }
                updateDisplay();
            } catch {
                display = 'Error';
                updateDisplay();
            }
        }

        function calculate() {
            try {
                history = display;
                let expression = display;

                // Replace functions
                expression = expression.replace(/sin\(/g, isDegree ? 'Math.sin(toRad(' : 'Math.sin(');
                expression = expression.replace(/cos\(/g, isDegree ? 'Math.cos(toRad(' : 'Math.cos(');
                expression = expression.replace(/tan\(/g, isDegree ? 'Math.tan(toRad(' : 'Math.tan(');
                expression = expression.replace(/log\(/g, 'Math.log10(');
                expression = expression.replace(/ln\(/g, 'Math.log(');
                expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
                expression = expression.replace(/abs\(/g, 'Math.abs(');
                expression = expression.replace(/\^/g, '**');

                // Add closing parentheses for trig functions in degree mode
                if (isDegree) {
                    let openCount = (expression.match(/toRad\(/g) || []).length;
                    for (let i = 0; i < openCount; i++) {
                        expression += ')';
                    }
                }

                function toRad(degrees) {
                    return degrees * Math.PI / 180;
                }

                const result = eval(expression);
                display = Number.isFinite(result) ? result.toString() : 'Error';
            } catch {
                display = 'Error';
            }
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                addToDisplay(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                addToDisplay(e.key);
            } else if (e.key === 'Enter') {
                calculate();
            } else if (e.key === 'Escape') {
                clearAll();
            } else if (e.key === 'Backspace') {
                backspace();
            }
        });