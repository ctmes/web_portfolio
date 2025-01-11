import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "../ui/button";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
}

interface ProjectGridProps {
  projects?: Project[];
}

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "CheapChow",
    description:
      "A budget-friendly recipe finder application that helps users discover meals based on their available ingredients",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    technologies: ["Python", "Flask", "SQLite"],
    githubUrl: "https://github.com/ctmes/CheapChow",
    liveUrl: "https://github.com/ctmes/CheapChow",
    category: "Full Stack",
  },
  {
    id: "2",
    title: "CryptoTwin",
    description:
      "Cryptocurrency analysis tool for tracking and comparing digital asset performance",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
    technologies: ["Python", "Pandas", "Data Analysis"],
    githubUrl: "https://github.com/ctmes/CryptoTwin",
    liveUrl: "https://github.com/ctmes/CryptoTwin",
    category: "Data Analysis",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ctmes/p_cv",
    liveUrl: "https://github.com/ctmes/p_cv",
    category: "Frontend",
  },
  {
    id: "4",
    title: "NLP Projects",
    description:
      "Collection of Natural Language Processing projects and experiments",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
    technologies: ["Python", "NLTK", "NLP"],
    githubUrl: "https://github.com/ctmes/p_nlp",
    liveUrl: "https://github.com/ctmes/p_nlp",
    category: "AI/ML",
  },
  {
    id: "5",
    title: "Machine Learning Portfolio",
    description: "Various machine learning projects and implementations",
    imageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
    technologies: ["Python", "Scikit-learn", "TensorFlow"],
    githubUrl: "https://github.com/ctmes/p_ml",
    liveUrl: "https://github.com/ctmes/p_ml",
    category: "AI/ML",
  },
];

const categories = ["All", "Frontend", "Full Stack", "Data Analysis", "AI/ML"];

const ProjectGrid = ({ projects = defaultProjects }: ProjectGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="min-w-[100px]"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            technologies={project.technologies}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
