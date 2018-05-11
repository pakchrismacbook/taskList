// define ui vars
const
form = document.getElementById('task-form'),
taskList = document.querySelector('.collection'),
clearBtn = document.querySelector('.clear-tasks'),
filter = document.getElementById('filter'),
taskInput = document.getElementById('task')
;

loadEventListeners();

function loadEventListeners(){
	// dom load event
	document.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks')===null) tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(task=>{
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
}
function addTask(e){
	e.preventDefault();
	if(taskInput.value==='') alert('add task');
	// create li element
	const li = document.createElement('li');
	li.className = 'collection-item';
	// create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// create new link element
	const link = document.createElement('a');
	// add class to link
	link.className = 'delete-item secondary-content';
	// add icon html to link
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// append link to li
	li.appendChild(link);
	// append li to ul
	taskList.appendChild(li);

	// store in local storage
	storeTaskInLocalStorage(taskInput.value);

	// clear input
	taskInput.value = '';

	console.log(li)
}
function storeTaskInLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks')===null) tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you certain?')) e.target.parentElement.parentElement.remove();

		// remove from local storage
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
}

// remove from local storage function
function removeTaskFromLocalStorage(taskItem){
	let tasks;
	if(localStorage.getItem('tasks')===null) tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task, i)=>{
		if(taskItem.textContent===task) tasks.splice(i,1);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});
}

function clearTasks(){
	// taskList.innerHTML = '';
	while(taskList.firstChild) taskList.removeChild(taskList.firstChild);
	// clear all tasks from local storage
	clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
	localStorage.clear();
}
function filterTasks(e){
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(task=>{
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text)!=-1) task.style.display = 'block';
		else task.style.display = 'none';
	});
}