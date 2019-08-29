var titleInput = document.querySelector(".projectTitle-input");
var descriptionInput = document.querySelector(".projectDescription-input");
var saveButton = document.querySelector(".projectSubmit-button");
var projectContainer = document.querySelector(".projects");
var deleteButton = document.querySelector(".card-delete");

var qualityList = ['Swill', 'Plausible', 'Genius'];
var projectCollection;

window.addEventListener('load', getStoredProjects);
saveButton.addEventListener('click', createProject);
titleInput.addEventListener('keyup', enableSaveButton);
descriptionInput.addEventListener('keyup', enableSaveButton);
projectContainer.addEventListener('click', cardActions);

function getStoredProjects() {
  saveButton.disabled = true;
  projectCollection = JSON.parse(localStorage.getItem("projects")) || [];
  reinstantiateStoredProject();
}

function createProject(e) {
  e.preventDefault()
  var project = new Project(Date.now(), titleInput.value, descriptionInput.value, false, qualityList[0]);
  projectCollection.push(project);
  project.saveToStorage(projectCollection);
  displayProjects(project);
  clearForm();
}

function clearForm() {
  descriptionInput.value = "";
  titleInput.value = "";
  saveButton.disabled = true;
}

function displayProjects(project) {
  let projectCard = `
    <div class="card" data-id="${project.id}">
        <section class="card-top"></section>
        <section class="card-middle">
          <h3 class="card-title" contenteditable="true">${project.title}</h3>
          <p class="card-description" contenteditable="true">${project.description}</p>
        </section>
        <section class="card-bottom">
          <p class="card-quality-text">Quality: ${project.quality}</p>
          <button class="card-delete">DELETE</button>
        </section>
      </div>`;
  projectContainer.insertAdjacentHTML('afterbegin', projectCard)
}

function reinstantiateStoredProject() {
  let projects = projectCollection.map(project => {
    return new Project(project.id, project.title, project.description, project.star, project.quality);
  });
  projectCollection = projects;
  displayStoredProjects(projectCollection);
}

function displayStoredProjects(projectCollection) {
  projectCollection.forEach(project => {
    displayProjects(project);
  });
}

function enableSaveButton() {
  if (titleInput.value === "" || descriptionInput.value === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function cardActions(e) {
  if (e.target.className === "card-delete") {
    let clickedCard = e.target.closest('.card')
    clickedCard.remove();
    let index = projectCollection.findIndex(project => project.id === parseInt(clickedCard.dataset.id));
    let project = projectCollection[index];
    project.deleteFromStorage(index);
  }
}