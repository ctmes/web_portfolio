import React from "react";
import { Image } from "../ui/image";
import { motion } from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Hero = ({
  title = "Hi, I'm John Doe",
  subtitle = "A Computer Science student passionate about building innovative web applications",
  backgroundImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
}: HeroProps) => {
  return (
    <div className="relative h-[600px] w-full bg-white">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
          sizes="100vw"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gray-900"
        />
      </div>
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default Hero;
