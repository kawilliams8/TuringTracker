var titleInput = document.querySelector(".projectTitle-input");
var bodyInput = document.querySelector(".projectDescription-input");
var saveButton = document.querySelector(".projectSubmit-button");
var projectContainer = document.querySelector(".projects");

var qualityList = ['Swill', 'Plausible', 'Genius'];
var projectCollection;

window.addEventListener('load', getStoredProjects);
saveButton.addEventListener('click', createProject);

function getStoredProjects() {
  projectCollection = JSON.parse(localStorage.getItem("projects")) || [];
  reinstantiateStoredProject();
}

function createProject(e) {
  e.preventDefault()
  var project = new Project(Date.now(), titleInput.value, bodyInput.value, false, qualityList[0]);
  projectCollection.push(project);
  project.saveToStorage(projectCollection);
  displayProjects(project);
  bodyInput.value = "";
  titleInput.value = "";
  saveButton.disabled = true;
}

function displayProjects(project) {
  let projectCard = `
    <div class="card" data-id="${project.id}">
        <section class="card-top"></section>
        <section class="card-middle">
          <h3 class="cards__middle--title" id="editable-title" contenteditable="true">${project.title}</h3>
          <p class="cards__middle--text" id="editable-body" contenteditable="true">${project.body}</p>
        </section>
        <section class="cards__bottom card--section">
          <p class="cards__bottom--text">Quality: ${project.quality}</p>
        </section>
      </div>`;
  projectContainer.insertAdjacentHTML('afterbegin', projectCard)
}

function reinstantiateStoredProject() {
  let projects = projectCollection.map(project => {
    return new Project(project.id, project.title, project.body, project.star, project.quality);
  });
  projectCollection = projects;
  displayStoredProjects(projectCollection);
}

function displayStoredProjects(projectCollection) {
  projectCollection.forEach(project => {
    displayProjects(project);
  });
}