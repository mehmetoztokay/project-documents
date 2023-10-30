module.exports = {
  uploadImage: (req, res) => {
    const projectId = req.params.projectId;
    const project = projectModel.findProjectById(projectId);
    if (project) {
      project.image = req.file.filename;
      res.json({ message: 'Image uploaded successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  }
};
