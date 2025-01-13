import React from "react";
import { Badge } from "../ui/badge";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import { FileDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "../ui/use-toast";

const About = () => {
  const { toast } = useToast();
  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "HTML",
    "Data Analysis",
    "Machine Learning",
    "Natural Language Processing",
    "Excel",
    "PowerPoint",
    "SciPy",
    "Pandas",
    "Tableau",
  ];

  const languages = ["English", "Japanese (Conversational)", "Chinese (Basic)"];

  const handleDownloadCV = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("public")
        .download("Resume_2023.pdf");

      if (error) throw error;

      // Create a URL for the blob
      const url = window.URL.createObjectURL(data);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "Colin_Melville_Resume.pdf"; // Name the downloaded file

      // Append to document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Resume downloaded successfully!",
      });
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar className="bg-[#2D2D2D]" />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">About Me</h1>
          <Button
            onClick={handleDownloadCV}
            className="bg-[#1A365D] hover:bg-[#2A466D] text-white"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>

        <div className="space-y-8 bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          {/* Bio Section */}
          <section className="prose lg:prose-xl">
            <p className="text-lg leading-relaxed mb-6">
              I'm a Bachelor of Advanced Computer Science (Honours) student at
              the Australian National University's College of Engineering,
              Computing & Cybernetics, maintaining a strong academic record with
              a GPA of 5.4 (77% WAM). My academic journey has focused on
              combining traditional computer science with cutting-edge fields
              like Natural Language Processing and Machine Learning.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Through internships at Sharperlight and Tritanium, I've gained
              practical experience in database management, pricing systems, and
              international web development. I've also completed virtual
              internships with KPMG AU in Data Analytics and JPMorgan Chase's
              Corporate Analyst Development Program, where I developed skills in
              data analysis, visualization, and business process optimization.
            </p>
            <p className="text-lg leading-relaxed">
              Currently serving as the IT Director for the Financial Management
              Association of Australia at ANU, I lead the development and
              implementation of nationwide IT infrastructure while fostering
              relationships with other university clubs.
            </p>
          </section>

          {/* Skills Section */}
          <section className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm bg-white"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Badge
                  key={language}
                  variant="outline"
                  className="text-sm bg-white"
                >
                  {language}
                </Badge>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Hanyu Shuiping Kaoshi (Chinese Proficiency Test) Level 3</li>
              <li>Akunacademy Options 101</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer
        socialLinks={{
          github: "https://github.com/ctmes",
          leetcode: "https://leetcode.com/u/colintmelville/",
          linkedin: "https://www.linkedin.com/in/colin-melville-570383245",
          email: "mailto:colintmelville@gmail.com",
        }}
      />
    </div>
  );
};

export default About;
