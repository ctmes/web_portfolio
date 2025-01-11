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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      layout
    >
      <Card
        className="w-[360px] h-[400px] overflow-hidden group bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative h-40 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 360px) 100vw, 360px"
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
    </motion.div>
  );
};

export default ProjectCard;
