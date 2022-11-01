{
    const tasks = [];
  
    const addNewTask = (newTaskContent) => {
      tasks.push({
        content: newTaskContent,
      });
  
      render();
    };
  
    const removeTask = (taskIndex) => {
      tasks.splice(taskIndex, 1);
      render();
    };
  
    const toggleTaskDone = (taskIndex) => {
      tasks[taskIndex].done = !tasks[taskIndex].done;
      render();
    };
  
    const bindEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");
      removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
          removeTask(index);
        });
      });
  
      const toggleDoneButtons = document.querySelectorAll(".js-done");
      toggleDoneButtons.forEach((toggleDoneButton, index) => {
        toggleDoneButton.addEventListener("click", () => {
          toggleTaskDone(index);
        });
      });
      document.querySelector(".js-nT").value = "";
    };
  
    const render = () => {
      let htmlString = "";
      for (const task of tasks) {
        htmlString += `
        <li class="list__item">
          <button class="list__button list__button--toggleDone js-done">
            ${task.done ? "✔" : ""}
          </button>
          <span class="${task.done ? "list__item--done" : ""}">
            ${task.content}
          </span>
          <button class="list__button list__button--remove js-remove">
            🗑
          </button>
        </li>`;
      }
  
      document.querySelector(".js-tought").innerHTML = htmlString;
      bindEvents();
    };
    const onFormSubmit = (event) => {
      event.preventDefault();
      const newTaskContent = document.querySelector(".js-nT").value.trim();
      if (newTaskContent === "") {
        return;
      }
      addNewTask(newTaskContent);
    };
  
    const init = () => {
      render();
      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);
      const addNewTask = document.querySelector(".js-addnTButton");
      form.addEventListener("click", (event) => {
        document.querySelector(".js-nT").focus();
        onFormSubmit(event);
      });
    };
  
    init();
  }