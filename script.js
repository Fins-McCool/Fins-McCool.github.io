const container = document.getElementById('planner-container');
const currentYear = 2026;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

new Calendar('#calendar', {
    year: 2026,
    style: 'background'
});

months.forEach((month, monthIdx) => {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    monthDiv.innerHTML = `<div class="month-title">${month}</div>`;
    
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';
    
    const daysInMonth = new Date(currentYear, monthIdx + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = day;
        
        const storageKey = `note-${currentYear}-${monthIdx}-${day}`;
        if (localStorage.getItem(storageKey)) {
            dayDiv.classList.add('has-note');
        }
        
        dayDiv.addEventListener('click', () => {
            const existingNote = localStorage.getItem(storageKey) || "";
            const note = prompt(`Enter plan for ${month} ${day}:`, existingNote);
            if (note !== null) {
                if (note.trim() === "") {
                    localStorage.removeItem(storageKey);
                    dayDiv.classList.remove('has-note');
                } else {
                    localStorage.setItem(storageKey, note);
                    dayDiv.classList.add('has-note');
                }
            }
        });
        daysGrid.appendChild(dayDiv);
    }
    monthDiv.appendChild(daysGrid);
    container.appendChild(monthDiv);
});
