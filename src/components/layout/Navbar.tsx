import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  className?: string;
  isScrolled?: boolean;
}

const Navbar = ({ className, isScrolled = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Projects", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "text-2xl font-bold transition-colors duration-200",
              isScrolled
                ? "text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                : "text-white hover:text-gray-200",
            )}
          >
            CM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? isScrolled
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "bg-white/10 text-white"
                    : isScrolled
                      ? "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden transition-colors",
              isScrolled
                ? "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10",
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-200 overflow-hidden",
            isMobileMenuOpen ? "max-h-56" : "max-h-0",
          )}
        >
          <div className="space-y-1 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-lg text-base font-medium transition-colors",
                  isActive(item.href)
                    ? isScrolled
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "bg-white/10 text-white"
                    : isScrolled
                      ? "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
