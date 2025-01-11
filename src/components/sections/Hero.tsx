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
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full"
          sizes="100vw"
          priority
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gray-900"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-start h-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-sans text-gray-200 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
