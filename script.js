const year = 2027;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

let tasks = JSON.parse(localStorage.getItem('planner-tasks')) || {};

const container = document.getElementById('planner-container');
const modal = document.getElementById('task-modal');
const taskInput = document.getElementById('task-input');
let activeDateKey = "";

months.forEach((month, monthIndex) => {
    const monthCard = document.createElement('div');
    monthCard.className = 'month-card';
    monthCard.innerHTML = `<h3>${month}</h3>`;

    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';

    dayNames.forEach(d => daysGrid.innerHTML += `<div class="day-name">${d}</div>`);

    const firstDayIndex = new Date(year, monthIndex, 1).getDay();
    for (let i = 0; i < firstDayIndex; i++) {
        daysGrid.innerHTML += `<div></div>`;
    }

    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    for (let day = 1; day <= totalDays; day++) {
        const dateKey = `${year}-${monthIndex + 1}-${day}`;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = day;
        
        if (tasks[dateKey] && tasks[dateKey].length > 0) {
            dayDiv.classList.add('has-tasks');
        }

        dayDiv.addEventListener('click', () => openModal(dateKey));
        daysGrid.appendChild(dayDiv);
    }

    monthCard.appendChild(daysGrid);
    container.appendChild(monthCard);
});

function openModal(dateKey) {
    activeDateKey = dateKey;
    document.getElementById('modal-date-title').innerText = `Tasks for ${dateKey}`;
    taskInput.value = "";
    updateTaskList();
    modal.classList.remove('hidden');
}

document.getElementById('close-modal-btn').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('save-task-btn').addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        if (!tasks[activeDateKey]) tasks[activeDateKey] = [];
        tasks[activeDateKey].push(text);
        localStorage.setItem('planner-tasks', JSON.stringify(tasks));
        location.reload();
    }
});

function updateTaskList() {
    const list = document.getElementById('day-tasks-list');
    list.innerHTML = "";
    if (tasks[activeDateKey]) {
        tasks[activeDateKey].forEach(task => {
            list.innerHTML += `<li>${task}</li>`;
        });
    }
}
