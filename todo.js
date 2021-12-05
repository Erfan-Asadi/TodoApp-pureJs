const todo_items = document.querySelectorAll('.todo-list .todo-item');
const check_sound = new Audio("sounds/click-audio.mp3");

let todoEditingState = false;
for (let item of todo_items) {
    item.querySelector(".container-left").addEventListener("click", toggleCheckTask);
    item.querySelector(".container-left").addEventListener("click", updateCompletedTasksCount);

}

function toggleCheckTask(e) {
    if (todoEditingState) return;
    let todo_item = e.target.closest(".todo-item");
    todo_item.classList.toggle("completed");

    playCheckSound();
}

function playCheckSound() {
    check_sound.play();
}


const todo_filter_items = document.querySelectorAll(".todo__filter .filter-item");
const active_bar = document.querySelector(".active-bar");
for (let item of todo_filter_items) {
    item.addEventListener("click", changeActivebarPosition);
}

function changeActivebarPosition(e) {
    // e.target means, elements that runs this func
    const item_offsetLeft = e.target.offsetLeft;
    const item_width = e.target.offsetWidth;

    // remove prev active filter-item styles
    document.querySelector('.filter-item.active').classList.remove('active');

    e.target.closest(".filter-item").classList.add("active");
    active_bar.style.left = (item_offsetLeft - Math.round(item_width / 2)) + `px`;
}


function updateCompletedTasksCount() {
    const completed_tasks = document.querySelectorAll('.todo-item.completed');
    const completed_tasks_count = document.querySelector('.completed-task-count');

    completed_tasks_count.innerHTML = completed_tasks.length;
}

function updateAllTasksCount() {
    const all_tasks = document.querySelectorAll('.todo-list .todo-item').length;
    const all_tasks_count = document.querySelector('.all-tasks-count');
    console.log(all_tasks)
    all_tasks_count.innerHTML = `/ ${all_tasks}`;
}
updateAllTasksCount();



const todoItem_containerRight = document.querySelectorAll(".todo-item .container-right");
for (let item of todoItem_containerRight) {
    item.addEventListener("click", toggleTodoOption);
}

function toggleTodoOption(e) {
    let closest_todo = e.target.closest(".todo-item");

    if (e.target.classList.contains('fa-check')) {
        e.target.className = 'fa fa-chevron-right';
        e.target.style.color = '';

        todoEditingState = false;
        closest_todo.querySelector('.subject').removeAttribute("contenteditable");
    }

    if (todoEditingState) return;

    let closest_todoOption = closest_todo.querySelector(".todo-options");
    closest_todoOption.classList.toggle("expand");
    playCheckSound();
}


const removeTodo_buttons = document.querySelectorAll(".remove-todo");
for (let button of removeTodo_buttons) {
    button.addEventListener("click", removeTodoItem);
}

function removeTodoItem(e) {
    if (todoEditingState) return;

    let closest_todoItem = e.target.closest('.todo-item');
    closest_todoItem.remove();

    updateAllTasksCount();
}

const editTodo_buttons = document.querySelectorAll(".edit-todo");
for (let button of editTodo_buttons) {
    button.addEventListener("click", editTodoItem);
}

function editTodoItem(e) {
    if (todoEditingState) return;

    let closest_subject = e.target.closest('.todo-item').querySelector(".subject");
    let closest_chevronRight = e.target.closest('.todo-item').querySelector('.fa.fa-chevron-right');

    closest_chevronRight.className = 'fa fa-check';
    closest_chevronRight.style.color = '#35D94F';
    todoEditingState = true;
    closest_subject.setAttribute("contenteditable", 'true');
    closest_subject.focus();
}



const showAllTasks_button = document.querySelector('button.all-tasks');
const showCheckedTasks_button = document.querySelector('button.checked-tasks');
const showUncheckedTasks_button = document.querySelector('button.unchecked-tasks');

showAllTasks_button.addEventListener('click', showAllTasks);
showCheckedTasks_button.addEventListener('click', showCheckedTasks);
showUncheckedTasks_button.addEventListener('click', showUncheckedTasks);


function showCheckedTasks() {
    const all_tasks = document.querySelectorAll('.todo-list .todo-item');
    for(let task of all_tasks) {
        if(task.classList.contains('completed')) {
            task.style.display = '';
            continue;
        } 
        task.style.display = 'none';
    }
}
function showUncheckedTasks() {
    const all_tasks = document.querySelectorAll('.todo-list .todo-item');
    for(let task of all_tasks) {
        if(!task.classList.contains('completed')) {
            task.style.display = '';
            continue;
        }
        task.style.display = 'none';
    }
}
function showAllTasks() {
    const all_tasks = document.querySelectorAll('.todo-list .todo-item');
    for(let task of all_tasks) {
        
        task.style.display = '';
    }
}