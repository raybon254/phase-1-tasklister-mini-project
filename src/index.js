document.addEventListener("DOMContentLoaded", () => {
  // your code here
    let  form = document.querySelector('#create-task-form')
    form.addEventListener('submit', (event) => {
          event.preventDefault();
          list()

          form.reset();
    })
});

function list(){
  
  let  formInput = document.querySelector('#new-task-description').value.trim()
  let  taskList = document.querySelector('#tasks')
  let  time = document.querySelector('#time').value
  let  date = document.querySelector('#date').value
  let  priority = document.getElementById('priority').value.trim();
  let textSpan = document.createElement("span");
  
  //create the elements <li> and <btn> and assign content                      
  const btn = document.createElement('button')
  const editBtn = document.createElement('button')
  const li = document.createElement('li')
  btn.textContent = 'X'
  editBtn.textContent = 'Edit'
  btn.style.marginLeft = '10px'
  editBtn.style.marginLeft = '10px'
  
  //removing the list and button in the click event
  btn.addEventListener('click',()=>{
      btn.parentNode.remove()
  })
  //assign span that holds the formInput and check if time is inserted
  textSpan.textContent = time ? `${formInput}  Time: ${time}  ${date}` : `${formInput}   ${date}`;

  editBtn.addEventListener('click', () => {
    let updatedTask = prompt('Edit your task:', textSpan.textContent);

    if (updatedTask !== null && updatedTask.trim() !== '') {
        textSpan.textContent = updatedTask
    }

  });
  
  li.appendChild(textSpan)
  li.appendChild(editBtn)
  li.appendChild(btn)
  li.setAttribute("data-priority", priority);
  color(textSpan)

//assign child node button to list and child node li to parent node ol
  
  
  taskList.appendChild(li)
  sortTasks()
  
}

//color function
function color (pref){
  const prior = document.getElementById('priority').value.trim()
      if(prior === 'High'){
        pref.style.color = 'red'
      }
      else if(prior === 'Medium'){
        pref.style.color = 'yellow'
      }
      else if(prior === 'Low'){
        pref.style.color = 'green'
      }
      else{
        pref.style.color = 'black'
      }
      return prior

  
}



//sort function
function sortTasks() {
  let taskList = document.querySelector('#tasks');
  let tasks = Array.from(taskList.children);

  // 🔹 Sort based on priority order (High → Medium → Low)
  tasks.sort((a, b) => {
      let priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
      let aPriority = priorityOrder[a.getAttribute("data-priority")] || 0;
      let bPriority = priorityOrder[b.getAttribute("data-priority")] || 0;
      return bPriority - aPriority;
  });

  // 🔹 sort tasks in sorted order
  taskList.innerHTML = "";
  tasks.forEach(task => taskList.appendChild(task));
}




