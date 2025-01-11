import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { defaultProjects } from "./ProjectGrid";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = defaultProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>

        <div className="space-y-6">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" /> View Code
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={project.liveUrl
                    .replace("github.com", "github.io")
                    .replace(/\/[^/]+$/, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
