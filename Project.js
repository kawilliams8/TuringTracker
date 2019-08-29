class Project {
  constructor(id, title, body, star, quality) {
    this.id = id;
    this.title = title || "";
    this.body = body || "";
    this.star = false;
    this.quality = quality || 0;
  }

  saveToStorage() {
    let projects = JSON.stringify(projectCollection);
    localStorage.setItem("projects", projects);
  }

  deleteFromStorage(index) {
    projectsCollection.splice(index, 1);
    this.saveToStorage();
  }

  updateIdea() {

  }

  updateQuality() {

  }
}