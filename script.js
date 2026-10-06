const currentYear = new Date().getFullYear();
document.getElementById('current-year').innerText = currentYear;

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

let taskStorage = JSON.parse(localStorage.getItem('yearlyPlannerTasks')) || {};

const container = document.getElementById('planner-container');
const modal = document.getElementById('task-modal');
const modalTitle = document.getElementById('modal-date-title');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('new-task-input');
let activeDateKey = ""; 

months.forEach((monthName, monthIndex) => {
    const monthCard = document.createElement('div');
    monthCard.className = 'month-card';
    
    const title = document.createElement('h2');
    title.innerText = monthName;
    monthCard.appendChild(title);
    
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';
    
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-name';
        header.innerText = day;
        daysGrid.appendChild(header);
    });
    
    const firstDayIndex = new Date(currentYear, monthIndex, 1).getDay();
    const totalDays = new Date(currentYear, monthIndex + 1, 0).getDate();
    
    for(let i = 0; i < firstDayIndex; i++) {
        daysGrid.appendChild(document.createElement('div'));
    }
    
    for(let dayNum = 1; dayNum <= totalDays; dayNum++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.innerText = dayNum;
        
        const dateKey = `${currentYear}-${monthIndex + 1}-${dayNum}`;
        dayEl.dataset.date = dateKey;
        
        if (taskStorage[dateKey] && taskStorage[dateKey].length > 0) {
            dayEl.classList.add('has-tasks');
        }
        
        dayEl.addEventListener('click', () => openModal(dateKey));
        daysGrid.appendChild(dayEl);
    }
    
    monthCard.appendChild(daysGrid);
    container.appendChild(monthCard);
});

function openModal(dateKey) {
    activeDateKey = dateKey;
    modalTitle.innerText = `Tasks for ${dateKey}`;
    renderTasks();
    modal.classList.remove('hidden');
}

function renderTasks() {
    taskList.innerHTML = "";
    const tasks = taskStorage[activeDateKey] || [];
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.innerText = task;
        taskList.appendChild(li);
    });
}

document.getElementById('save-task-btn').addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) return;
    
    if (!taskStorage[activeDateKey]) taskStorage[activeDateKey] = [];
    taskStorage[activeDateKey].push(text);
    
    localStorage.setItem('yearlyPlannerTasks', JSON.stringify(taskStorage));
    taskInput.value = "";
    renderTasks();
    
    document.querySelector(`[data-date="${activeDateKey}"]`).classList.add('has-tasks');
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
});
