// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateDateTime();
    setInterval(updateDateTime, 60000);
    setInterval(spawnCat, 30000);
});

// Function to update the current date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const now = new Date();

    // Get the current day of the week and format the time
    const options = { weekday: 'long' };  // Options for day name
    const day = now.toLocaleDateString('en-US', options); // Get the day name

    // Format hours and minutes with leading zeros
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;
    dateTimeElement.textContent = `Today is ${day}, ${formattedTime}`;
}

// Load tasks from localStorage when the page loads
function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((taskText) => {
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
    });
}

// Add event listener for adding tasks
document.getElementById('addButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = createTaskElement(taskText);

        taskList.appendChild(listItem);

        saveTask(taskText); // Save the task to localStorage
        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        removeTask(listItem);
    });

    listItem.appendChild(removeButton);
    return listItem;
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(listItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);

    const taskText = listItem.firstChild.textContent;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeToggle.checked ? 'enabled' : 'disabled');
});

// Initialize dark mode based on localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.querySelector('.container').classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Function to randomly spawn a cat
function spawnCat() {
    const catContainer = document.getElementById('catContainer');
    const catImages = ['assets/cat1.png', 'assets/cat2.png', 'assets/source.gif', 'assets/giphy (1).webp', 'assets/cat.gif']; // Adjust paths if necessary

     // Create a new cat element
     const cat = document.createElement('div');
     cat.className = 'cat';
     cat.style.backgroundImage = `url(${catImages[Math.floor(Math.random() * catImages.length)]})`;
 
     // Randomly position the cat within the viewport
     const randomX = Math.random() * (window.innerWidth - 64);
     const randomY = Math.random() * (window.innerHeight - 64);
     cat.style.left = `${randomX}px`;
     cat.style.top = `${randomY}px`;
 
     // Append to the container and remove after animation
     catContainer.appendChild(cat);
     setTimeout(() => {
         catContainer.removeChild(cat);
     }, 6000); // Remove after the animation duration
 }
    


function randomizeInterval() {
    const randomInterval = Math.random() * 10000 + 5000; // Between 5000ms (5s) and 15000ms (15s)
    setTimeout(() => {
        spawnCat();
        randomizeInterval(); // Re-schedule with a new random time
    }, randomInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update time every minute
    randomizeInterval(); // Start the randomized spawning
});

//zfzenuz
//zjbiuzbui