const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const project = repositories.find(project => project.id === id);
  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  likes = project.likes;

  const upProject = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[projectIndex] = upProject;

  return response.json(upProject);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const project = repositories.find(project => project.id === id);

  if (!project) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  project.likes++;

  return response.json(project);
});

module.exports = app;
