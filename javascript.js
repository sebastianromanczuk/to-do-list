{
    let tasks = [];
    let hideDoneButtons = false;
  
    const toggleTaskDone = (index) => {
      tasks = [
        ...tasks.slice(0, index),
        { ...tasks[index], done: !tasks[index].done },
        ...tasks.slice(index + 1),
      ];
      render();
    };
  
    const bindEvents = () => {
      const remoeveButtons = document.querySelectorAll(".js-remove");
  
      remoeveButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
          removeTask(index);
        });
      }); 
  
      const toggleDoneButtons = document.querySelectorAll(".js-done");
  
      toggleDoneButtons.forEach((toggleDoneButton, index) => {
        toggleDoneButton.addEventListener("click", () => {
          toggleTaskDone(index);
          render();
        });
      }); 
    };
  
    const addNewTask = (newTaskContent) => {
      tasks = [...tasks, { content: newTaskContent }];
  
      render();
    };
  
    const removeTask = (index) => {
      tasks = [
        ...tasks.slice(0, index),
        ...tasks.slice(index +1)
      ];
      render();
    };
  
    const toggleAllTasksDone = () => {
      tasks = tasks.map((task) => ({
        ...task,
        done: true,
      }));
      render();
    };
  
    const toggleHideDoneTasks = () => {
     hideDoneButtons = !hideDoneButtons;
      render();
    };
  
    const renderTasks = () => {
      let htmlString = "";
  
      for (const task of tasks) {
        htmlString += `
    <li class="list__item  ${
      task.done && hideDoneButtons ? "list__item--hide": ""
    }">
              
    <button class="list__button list__button--done js-done">
    ${task.done ? "✔" : ""}
    </button>
    <span class="${task.done ? "list__item--done" : ""}">
    ${task.content}
    </span>
    <button class=" list__button list__button--remove js-remove">🗑</button>
    
    </li>
          `;
      }
      document.querySelector(".js-tasks").innerHTML = htmlString;
    };
  
    const bindButtonEvents = () => {
      const hideTasks = document.querySelector(".js-hideDoneTasks");
      if (hideTasks) {
        hideTasks.addEventListener("click", toggleHideDoneTasks)
      };
  
      const tasksCompleted = document.querySelector(".js-allTasksDone");
      if (tasksCompleted) {
        tasksCompleted.addEventListener("click", toggleAllTasksDone)
      }
    }

    const renderButtons = () => {
      const hiddenButtons = document.querySelector(".js-hiddenButtons");
      const htmlString =
        tasks.length === 0
          ? ""
          : `
    <button class = "button__transition form__newButtons js-hideDoneTasks">
    ${hideDoneButtons ? "Pokaż ukonczone zadanie" : "Ukryj ukonczone zadanie"}
    </button>
    <button ${
      tasks.every(({ done }) => done === true) ? "disabled" : ""
    } class = "button__transition form__newButtons js-allTasksDone" > Zaznacz wszystkie obiekty
    </button>
    `;
      hiddenButtons.innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
      event.preventDefault();
  
      const newTaskElement = document.querySelector(".js-addTask");
      const newTaskContent = newTaskElement.value.trim();
  
      if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = "";
      }
      newTaskElement.focus();
    };
  
    const render = () => {
      renderTasks();
      renderButtons();
      
      bindButtonEvents();
      bindEvents();
    };
  
    function init() {
      render();
  
      const form = document.querySelector(".js-form");
  
      form.addEventListener("submit", onFormSubmit);
    }
  
    init();
  }