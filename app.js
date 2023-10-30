const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 8080;

// For security
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

const projectRoutes = require('./routes/projectRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/projects', projectRoutes);
app.use('/api/uploads', uploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
