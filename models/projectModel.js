const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dataFolderPath = path.join(__dirname, '../data');
const projectsFilePath = path.join(dataFolderPath, 'projects.json');

function getProjects() {
  try {
    const data = fs.readFileSync(projectsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveProjects(projects) {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
}

module.exports = {
  getProjects,
  createProject: (project) => {
    const projects = getProjects();
    project.projectId = uuid.v4(); // UUID ile benzersiz ID oluştur
    const currentTime = new Date().toISOString();
    project.projectCreated = currentTime; // Oluşturulma zamanını ekleyin
    project.projectUpdated = currentTime; // Güncelleme zamanını ekleyin
    projects.push(project);
    saveProjects(projects);
  },
  saveProjects,
  findProjectById: (projectId) => {
    const projects = getProjects();
    return projects.find((project) => project.projectId === projectId);
  }
};
