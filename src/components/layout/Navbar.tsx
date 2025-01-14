import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: "Projects", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    ...(user ? [{ label: "Admin", href: "/admin/messages" }] : []),
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("nav") && !target.closest("button")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-[#0A192F] border-b border-[#1E2D3D]",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight transition-colors duration-200 relative text-white"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <motion.span
              animate={
                isLogoHovered
                  ? {
                      rotateY: [0, 360],
                      color: [
                        "#FFFFFF",
                        "#FFD700",
                        "#FF69B4",
                        "#00FF00",
                        "#FFFFFF",
                      ],
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
              }}
              className="inline-block"
            >
              C
            </motion.span>
            <motion.span
              animate={
                isLogoHovered
                  ? {
                      rotateX: [0, 360],
                      color: [
                        "#FFFFFF",
                        "#00FF00",
                        "#FFD700",
                        "#FF69B4",
                        "#FFFFFF",
                      ],
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                delay: 0.1,
              }}
              className="inline-block"
            >
              M
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-300 hover:bg-[#1E2D3D] hover:text-white",
                  isActive(item.href) && "bg-[#1E2D3D] text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="ml-2 text-gray-300 hover:bg-[#1E2D3D] hover:text-white"
              >
                Sign Out
              </Button>
            )}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2 text-gray-300 hover:bg-[#1E2D3D] hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-300 hover:bg-[#1E2D3D] hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="ml-2 text-gray-300 hover:bg-[#1E2D3D] hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-200 overflow-hidden",
            isMobileMenuOpen ? "max-h-48" : "max-h-0",
          )}
        >
          <nav className="space-y-1 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-300 hover:bg-[#1E2D3D] hover:text-white",
                  isActive(item.href) && "bg-[#1E2D3D] text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start px-4 text-gray-300 hover:bg-[#1E2D3D] hover:text-white"
              >
                Sign Out
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
