document.addEventListener('DOMContentLoaded', () => {
	const displayActually = document.querySelector('.actually')
	const displayHistory = document.querySelector('.history')
	const clearButton = document.querySelector('.clear-btn')
	const buttons = document.querySelectorAll('.btn-grid button')

	let currentInput = ''
	let operator = ''
	let firstNumber = ''
	let secondNumber = ''
	let result = ''

	// Обработчик для всех кнопок
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const value = button.textContent

			// Обработчик чисел и запятой
			if (/[0-9]/.test(value) || value === ',') {
				if (value === ',' && currentInput.includes(',')) return
				currentInput += value
				displayActually.textContent = currentInput
			}

			// Обработчик оператора
			if (['+', '-', 'x', ':'].includes(value)) {
				if (currentInput !== '') {
					firstNumber = currentInput
					operator = value
					currentInput = ''
					displayActually.textContent = `${firstNumber} ${operator}`
				}
			}

			// Обработка "="
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
				}
			}
		})
	})

	// Кнопка очистки
	clearButton.addEventListener('click', () => {
		currentInput = ''
		displayActually.textContent = ''
		firstNumber = ''
		secondNumber = ''
		operator = ''
		result = ''
	})

	// Вычисление
	function calculate(num1, num2, op) {
		const nm1 = parseFloat(num1.replace(',', '.'))
		const nm2 = parseFloat(num2.replace(',', '.'))
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
				result = n2 !== 0 ? n1 / n1 : 'Error!'
				break
			default:
				return ''
		}

		// Форматирование result
		return result.toString().replace(',', '.')
	}
})
