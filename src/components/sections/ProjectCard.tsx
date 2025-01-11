import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectCardProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({
  id = "1",
  title = "Project Title",
  description = "A brief description of the project showcasing the key features and technologies used.",
  imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  technologies = ["React", "TypeScript", "Tailwind"],
  githubUrl = "#",
  liveUrl = "#",
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on the buttons
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    navigate(`/project/${id}`);
  };

  return (
    <Card
      className="w-[360px] h-[400px] overflow-hidden group bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 text-gray-700"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2 mt-auto">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <Github className="w-4 h-4 mr-2" />
            Code
          </a>
        </Button>
        <Button variant="default" size="sm" className="flex-1" asChild>
          <a
            href={liveUrl
              .replace("github.com", "github.io")
              .replace(/\/[^/]+$/, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
