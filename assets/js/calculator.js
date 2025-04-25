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
			if (['+', '-', '·', ':'].includes(value)) {
				if (currentInput !== '') {
					firstNumber = currentInput
					operator = value
					currentInput = '' // Сбрасываем для ввода второго числа
					expression = `${firstNumber} ${operator}`
					displayActually.textContent = expression
				}
			}

			// Обработка "="
			if (value === '=') {
				if (firstNumber && operator && currentInput) {
					secondNumber = currentInput
					result = calculate(firstNumber, secondNumber, operator)
					if (result === 'Error') {
						displayActually.textContent = 'Нельзя делить на 0'
						displayHistory.textContent = 'Error'
					} else {
						displayHistory.textContent = `${firstNumber} ${operator} ${secondNumber}`
						displayActually.textContent = result
					}
					currentInput = result === 'Error' ? '' : result
					firstNumber = ''
					secondNumber = ''
					operator = ''
					expression = result === 'Error' ? '' : result
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
			case '·':
				result = n1 * n2
				break
			case ':':
				if (n2 === 0) return 'Error'
				result = n1 / n2
				break
			default:
				return ''
		}

		// Округление
		result = Math.round(result * 1000) / 1000

		// Форматирование результата
		return result.toString().replace('.', ',')
	}
})
