import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Github, Twitter, Linkedin, Mail, Code2 } from "lucide-react";

interface FooterProps {
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
    leetcode?: string;
  };
}

const Footer = ({
  socialLinks = {
    github: "https://github.com",
    leetcode: "https://leetcode.com",
    linkedin: "https://linkedin.com",
    email: "mailto:example@example.com",
  },
}: FooterProps) => {
  return (
    <footer className="w-full bg-[#2D2D2D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-gray-300">
              Subscribe to my newsletter for the latest updates and articles.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                className="bg-[#1A365D] hover:bg-[#2A466D] text-white"
                type="submit"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Me</h3>
            <div className="flex gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A365D] transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A365D] transition-colors"
              >
                <Code2 size={24} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A365D] transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={socialLinks.email}
                className="hover:text-[#1A365D] transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            © {new Date().getFullYear()} Colin Melville. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
