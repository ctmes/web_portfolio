import React from "react";
import Navbar from "./layout/Navbar";
import Hero from "./sections/Hero";
import ProjectGrid from "./sections/ProjectGrid";
import Footer from "./layout/Footer";
import type { Project } from "@/lib/api";

interface HomeProps {
  heroProps?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
  };
  projectGridProps?: {
    initialProjects?: Project[];
  };
  footerProps?: {
    socialLinks?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      email?: string;
      leetcode?: string;
    };
  };
}

const Home = ({
  heroProps = {
    title: "Hi, I'm Colin Melville",
    subtitle:
      "Advanced Computer Science (Hons; Spec: AI) student at ANU passionate about data analytics and innovative software solutions",
    backgroundImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  },
  projectGridProps = {},
  footerProps = {
    socialLinks: {
      github: "https://github.com/ctmes",
      leetcode: "https://leetcode.com/u/colintmelville/",
      linkedin: "https://www.linkedin.com/in/colin-melville-570383245",
      email: "mailto:colintmelville@gmail.com",
    },
  },
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero {...heroProps} />
        <ProjectGrid initialProjects={projectGridProps.initialProjects} />
      </main>
      <Footer {...footerProps} />
    </div>
  );
};

export default Home;
