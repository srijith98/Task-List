//UI variables

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load event listeners

loadEventListeners();

function loadEventListeners()
{
    //DOM event to load stored tasks after each refresh
    document.addEventListener('DOMContentLoaded', loadTasks)
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks event
    clearBtn.addEventListener('click', removeAll);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

//Add task
function addTask(e){
    if(taskInput.value === '')
        alert("Enter a task to be added");
    else
    {
        //create li element
        const li = document.createElement('li');
        li.className = "collection-item";

        //create text node
        li.appendChild(document.createTextNode(taskInput.value));

        //Create link for deletion of a list item
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //Create cross icon inside link
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        //append the link to the created li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

        //Store task to local storage
        storeTask(taskInput.value);
                
        //Clear input
        taskInput.value = '';
    }

    //To prevent from submitting the form
    e.preventDefault();
}

//Remove task
function removeTask(e)
{
    //Delete item only if the delete icon is clicked
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

//Clear tasks
function removeAll(e)
{
    if(confirm('Clear all tasks?'))
    {
        while(taskList.firstChild)
        {
            taskList.removeChild(taskList.firstChild);
        }
        //Remove all tasks from local storage
        removeAllFromLS();
    }
}

//Filter tasks
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.textContent;
        
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none';
        }
    });
}

//Store task
function storeTask(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Load existing tasks
function loadTasks(e)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task) {
        //create li element
        const li = document.createElement('li');
        li.className = "collection-item";

        //create text node
        li.appendChild(document.createTextNode(task));

        //Create link for deletion of a list item
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //Create cross icon inside link
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        //append the link to the created li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

//Remove task from LS
function removeTaskFromLS(taskElement)
{
    
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(task === taskElement.textContent){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove all tasks from LS
function removeAllFromLS()
{
    localStorage.clear();
}