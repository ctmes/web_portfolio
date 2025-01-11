import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Button } from "../ui/button";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/api";

interface ProjectGridProps {
  initialProjects?: Project[];
}

const categories = ["All", "Frontend", "Full Stack", "Data Analysis", "AI/ML"];

const ProjectGrid = ({ initialProjects }: ProjectGridProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(!initialProjects);

  useEffect(() => {
    if (!initialProjects) {
      const loadProjects = async () => {
        setIsLoading(true);
        try {
          const data = await getProjects();
          setProjects(data);
        } catch (error) {
          console.error("Error loading projects:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadProjects();
    }
  }, [initialProjects]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <motion.div
        className="mb-8 flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.image_url}
              technologies={project.technologies}
              githubUrl={project.github_url}
              liveUrl={project.live_url}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectGrid;
