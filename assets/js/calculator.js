document.addEventListener('DOMContentLoaded', () => {
	const displayActually = document.querySelector('.actually')
	const displayHistory = document.querySelector('.history')
	const clearBtn = document.querySelector('.clear-btn')
	const buttons = document.querySelectorAll('.btn-grid button')

	let currentInput = ''
	let operator = ''
	let firstNumber = ''
	let secondNumber = ''
	let result = ''
	let expression = '' // Полное выражение

	// Обработчик для всех кнопок
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const value = button.textContent

			// Обработка чисел и запятой
			if (/[0-9]/.test(value) || value === ',') {
				if (value === ',' && currentInput.includes(',')) return
				currentInput += value
				expression =
					firstNumber + (operator ? ` ${operator} ` : '') + currentInput
				displayActually.textContent = expression
			}

			// Обработка операторов
			if (['+', '-', 'x', ':'].includes(value)) {
				if (currentInput !== '') {
					firstNumber = currentInput
					operator = value
					currentInput = '' // Сбрасываем для ввода второго числа
					expression = `${firstNumber} ${operator}`
					displayActually.textContent = expression
				}
			}

			// Обработка равно
			if (value === '=') {
				if (firstNumber && operator && currentInput) {
					secondNumber = currentInput
					result = calculate(firstNumber, secondNumber, operator)
					displayHistory.textContent = `${firstNumber} ${operator} ${secondNumber}`
					displayActually.textContent = result
					currentInput = result
					firstNumber = ''
					secondNumber = ''
					operator = ''
					expression = result
				}
			}
		})
	})

	// Обработчик кнопки очистки
	clearBtn.addEventListener('click', () => {
		displayActually.textContent = ''
		displayHistory.textContent = result
		expression = ''
		firstNumber = ''
		secondNumber = ''
		operator = ''
		result = ''
		currentInput = ''
	})

	// Функция вычисления
	function calculate(num1, num2, op) {
		const n1 = parseFloat(num1.replace(',', '.'))
		const n2 = parseFloat(num2.replace(',', '.'))
		let result

		switch (op) {
			case '+':
				result = n1 + n2
				break
			case '-':
				result = n1 - n2
				break
			case 'x':
				result = n1 * n2
				break
			case ':':
				result = n2 !== 0 ? n1 / n2 : 'Нельзя делить на 0'
				break
			default:
				return ''
		}

		// Форматирование результата
		return result.toString().replace('.', ',')
	}
})
