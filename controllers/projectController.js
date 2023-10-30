const projectModel = require('../models/projectModel');

module.exports = {
  getProjects: (req, res) => {
    const projects = projectModel.getProjects();
    res.json({ projects });
  },
  createProject: (req, res) => {
    const { project_name, project_content, project_order } = req.body;
    const project = {
      projectId: Date.now().toString(),
      project_name,
      project_content,
      project_order,
      project_invisible: false
    };
    projectModel.createProject(project);
    res.status(200).json(project);
  },
  updateProject: (req, res) => {
    const projectId = req.params.projectId;
    const project = projectModel.findProjectById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { project_name, project_content, project_order, project_invisible } = req.body;

    project_name && (project.project_name = project_name);

    project_content && (project.project_content = project_content);

    project_order && (project.project_order = project_order);

    project_invisible && (project.project_invisible = project_invisible);

    project.projectUpdated = new Date().toISOString();
    projectModel.saveProjects(projectModel.getProjects());

    res.status(200).json(project);
  },
  deleteProject(req, res) {
    const projectId = req.params.projectId;
    const projects = projectModel.getProjects();
    const projectIndex = projects.findIndex((project) => project.projectId === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.splice(projectIndex, 1);
    projectModel.saveProjects(projects);

    res.json({ message: 'Project deleted successfully' });
  },
  getProjectById: (req, res) => {
    const projectId = req.params.projectId;
    const project = projectModel.findProjectById(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  }
};
