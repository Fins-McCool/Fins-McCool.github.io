const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    if (taskInput.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = taskInput.value;
      
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
          
        });
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = " ❌";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            li.remove();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
    }
});
