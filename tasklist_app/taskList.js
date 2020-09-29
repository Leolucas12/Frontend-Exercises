var listElement = document.querySelector('#app ul')
var inputElement = document.querySelector('#app input')
var buttonAdd = document.querySelector('#app button')

var tasks = JSON.parse(localStorage.getItem('list_tasks')) || ['Study Javascript', 'Publish on Github']

function renderTasks() {
	listElement.innerHTML = ''

	for (task of tasks) {
		var taskElement = document.createElement('li')
		var taskText = document.createTextNode(task)

		var buttonDelete = document.createElement('button')
		buttonDelete.classList.add('delete')
		var buttonText = document.createTextNode('Delete')

		var position = tasks.indexOf(task)
		buttonDelete.setAttribute('onclick', 'removeTask('+ position +')')

		buttonDelete.appendChild(buttonText)

		taskElement.appendChild(taskText)
		taskElement.appendChild(buttonDelete)

		listElement.appendChild(taskElement)
	}
}

renderTasks()

function addTask() {
	var taskText = inputElement.value

	if (taskText === '') { return }
	tasks.push(taskText)
	inputElement.value = ''
	renderTasks()
	saveTasksToStorage()
}

buttonAdd.onclick = addTask

function removeTask(position) {
	tasks.splice(position, 1)
	renderTasks()
	saveTasksToStorage()
}

function saveTasksToStorage() {
	localStorage.setItem('list_tasks', JSON.stringify(tasks))
}
