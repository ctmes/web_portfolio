import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const Contact = () => {
  const socialLinks = {
    github: "https://github.com/ctmes",
    leetcode: "https://leetcode.com/u/colintmelville/",
    linkedin: "https://www.linkedin.com/in/colin-melville-570383245",
    email: "mailto:colintmelville@gmail.com",
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar className="bg-[#2D2D2D]" />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6 bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <Input placeholder="Your Name" className="w-full" />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  className="w-full min-h-[150px]"
                />
              </div>
              <Button className="w-full bg-[#1A365D] hover:bg-[#2A466D]">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
              <div className="space-y-4">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#1A365D] transition-colors"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href={socialLinks.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#1A365D] transition-colors"
                >
                  <Code2 size={20} />
                  <span>LeetCode</span>
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#1A365D] transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-3 text-gray-600 hover:text-[#1A365D] transition-colors"
                >
                  <Mail size={20} />
                  <span>colintmelville@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="text-gray-600">Canberra, Australia</p>
              <p className="text-gray-600 mt-2">
                Available for remote opportunities worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default Contact;
