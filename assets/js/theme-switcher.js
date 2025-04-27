class ThemeSwitcher {
	selectors = {
		switchThemeButton: '.theme-button',
		themeImage: '.theme-img',
		body: 'body',
		themeSwitch: '.theme-switch',
		clearBtn: '.clear-btn',
		calcBkg: '.calc-bkg',
		buttons: '.btn-grid button',
		name: '.name',
	}

	themes = {
		dark: 'dark-theme',
		light: 'light-theme',
	}

	stateClasses = {
		leftPosition: 'left-position',
		rightPosition: 'right-position',
	}

	storageKey = 'theme'

	constructor() {
		this.switchThemeButton = document.querySelector(
			this.selectors.switchThemeButton
		)
		this.themeImage = document.querySelector(this.selectors.themeImage)
		this.body = document.querySelector(this.selectors.body)
		this.themeSwitch = document.querySelector(this.selectors.themeSwitch)
		this.clearBtn = document.querySelector(this.selectors.clearBtn)
		this.calcBkg = document.querySelector(this.selectors.calcBkg)
		this.buttons = document.querySelectorAll(this.selectors.buttons)
		this.name = document.querySelector(this.selectors.name)

		this.setInitialTheme()
		this.bindEvents()
	}

	get isDarkThemeCached() {
		const storedTheme = localStorage.getItem(this.storageKey)
		// Default to dark theme if no theme is stored
		return storedTheme === null ? true : storedTheme === this.themes.dark
	}

	setInitialTheme() {
		const isDark = this.isDarkThemeCached
		// Set initial theme in localStorage if not set
		if (!localStorage.getItem(this.storageKey)) {
			localStorage.setItem(this.storageKey, this.themes.dark)
		}

		this.body.classList.toggle(this.themes.dark, isDark)
		this.body.classList.toggle(this.themes.light, !isDark)
		this.themeSwitch.classList.toggle(this.themes.dark, isDark)
		this.themeSwitch.classList.toggle(this.themes.light, !isDark)
		this.clearBtn.classList.toggle(this.themes.dark, isDark)
		this.clearBtn.classList.toggle(this.themes.light, !isDark)
		this.calcBkg.classList.toggle(this.themes.dark, isDark)
		this.calcBkg.classList.toggle(this.themes.light, !isDark)
		this.name.classList.toggle(this.themes.dark, isDark)
		this.name.classList.toggle(this.themes.light, !isDark)
		this.switchThemeButton.classList.toggle(this.themes.dark, isDark)
		this.switchThemeButton.classList.toggle(this.themes.light, !isDark)

		this.buttons.forEach(button => {
			button.classList.toggle('calc-dark-theme', isDark)
			button.classList.toggle('calc-light-theme', !isDark)
		})

		this.switchThemeButton.classList.toggle(
			this.stateClasses.rightPosition,
			isDark
		)
		this.themeImage.classList.toggle(this.stateClasses.leftPosition, isDark)

		this.themeImage.src = isDark
			? './assets/img/sun-light.svg'
			: './assets/img/moon-dark.svg'
		this.switchThemeButton.querySelector('img').src = isDark
			? './assets/img/moon-light.svg'
			: './assets/img/sun-dark.svg'
	}

	toggleTheme() {
		const isDark = this.isDarkThemeCached
		const newTheme = isDark ? this.themes.light : this.themes.dark

		localStorage.setItem(this.storageKey, newTheme)

		this.switchThemeButton.classList.toggle(this.stateClasses.rightPosition)
		this.themeImage.classList.toggle(this.stateClasses.leftPosition)

		// Change images after 0.25 seconds
		setTimeout(() => {
			this.themeImage.src = isDark
				? './assets/img/moon-dark.svg'
				: './assets/img/sun-light.svg'
			this.switchThemeButton.querySelector('img').src = isDark
				? './assets/img/sun-dark.svg'
				: './assets/img/moon-light.svg'
		}, 250)

		// Change theme after 0.25 seconds
		setTimeout(() => {
			this.body.classList.toggle(this.themes.dark)
			this.body.classList.toggle(this.themes.light)
			this.themeSwitch.classList.toggle(this.themes.dark)
			this.themeSwitch.classList.toggle(this.themes.light)
			this.clearBtn.classList.toggle(this.themes.dark)
			this.clearBtn.classList.toggle(this.themes.light)
			this.calcBkg.classList.toggle(this.themes.dark)
			this.calcBkg.classList.toggle(this.themes.light)
			this.name.classList.toggle(this.themes.dark)
			this.name.classList.toggle(this.themes.light)
			this.switchThemeButton.classList.toggle(this.themes.dark)
			this.switchThemeButton.classList.toggle(this.themes.light)

			this.buttons.forEach(button => {
				button.classList.toggle('calc-dark-theme')
				button.classList.toggle('calc-light-theme')
			})
		}, 250)
	}

	bindEvents() {
		this.switchThemeButton.addEventListener('click', () => this.toggleTheme())
	}
}

new ThemeSwitcher()
