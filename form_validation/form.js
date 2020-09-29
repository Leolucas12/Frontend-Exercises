const user = document.getElementById('name')
const password = document.getElementById('pass1')
const passwordConfirm = document.getElementById('pass2')
const signInForm = document.getElementById('signIn')
const errorMessages = document.getElementById('errors')

signInForm.addEventListener('submit', (e) => {
	var messages = []

	if (user.value === '' || user.value === null) {
		messages.push('Name is required')
	}

	if (user.value.length >= 20) {
		messages.push('Your usename must be less than 20 characters')
	}

	if (password.value.length <= 7) {
		messages.push('Password must be at least 8 characters')
	}

	if (password.value.length >= 20) {
		messages.push('Password must be less than 20 characters')
	}

	if (password.value == 'password' || password.value == '12345678') {
		messages.push('Your password is too easy')
	}

	if (password.value != passwordConfirm.value) {
		messages.push('Your passwords dont match')
	}

	if (password.value === user.value) {
		messages.push('Your password cant be your username')
	}

	if (messages.length > 0) {
		e.preventDefault()
		errorMessages.innerText = messages.join('; ')
	}
})
