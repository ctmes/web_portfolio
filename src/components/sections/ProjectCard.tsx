import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Image } from "../ui/image";

interface ProjectCardProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  index?: number;
}

const ProjectCard = ({
  id = "1",
  title = "Project Title",
  description = "A brief description of the project showcasing the key features and technologies used.",
  imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  technologies = ["React", "TypeScript", "Tailwind"],
  githubUrl = "#",
  liveUrl = "#",
  index = 0,
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    navigate(`/project/${id}`);
  };

  return (
    <Card
      className="w-[320px] overflow-hidden group bg-white hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative h-36 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 320px) 100vw, 320px"
        />
      </div>
      <CardHeader className="p-4 pb-2 space-y-2">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 text-gray-700 text-xs"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
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
