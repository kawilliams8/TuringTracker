class Project {
  constructor(id, title, description, star, quality) {
    this.id = id;
    this.title = title || "";
    this.description = description || "";
    this.star = false;
    this.quality = quality || 0;
  }

  saveToStorage() {
    let projects = JSON.stringify(projectCollection);
    localStorage.setItem("projects", projects);
  }

  deleteFromStorage(index) {
    projectCollection.splice(index, 1);
    this.saveToStorage();
  }

  updateIdea() {

  }

  updateQuality() {
    
  }
}