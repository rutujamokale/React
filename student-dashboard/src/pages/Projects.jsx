import React from 'react';

function Projects() {
  const projects = [
    {
      name: 'E-Commerce App',
      completion: 65,
      tasks: ['API Design', 'DB Setup', 'Exception Handling', 'Deployment'],
    },
    {
      name: 'Chatbot App',
      completion: 40,
      tasks: ['NLP Design', 'Integration', 'Testing'],
    },
  ];

  return (
    <div>
      <h3>Projects</h3>
      {projects.map((project, idx) => (
        <div key={idx} className="card mb-3">
          <div className="card-header">
            {project.name} - {project.completion}%
          </div>
          <div className="card-body">
            <ul>
              {project.tasks.map((task, tIdx) => (
                <li key={tIdx}>
                  <input type="checkbox" checked={tIdx < project.completion / 25} readOnly /> {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;