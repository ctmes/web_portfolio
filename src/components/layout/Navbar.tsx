import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface NavbarProps {
  className?: string;
  isScrolled?: boolean;
}

const Navbar = ({ className, isScrolled = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-[#2D2D2D]",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "text-2xl font-bold tracking-tight transition-colors duration-200",
              isScrolled ? "text-gray-900" : "text-white",
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
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? isScrolled
                      ? "bg-gray-100 text-gray-900"
                      : "bg-white/10 text-white"
                    : isScrolled
                      ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className={cn(
                  "ml-2",
                  isScrolled
                    ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    : "text-gray-300 hover:bg-white/10 hover:text-white",
                )}
              >
                Sign Out
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className={cn(
              "md:hidden transition-colors",
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10",
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
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
                  "block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? isScrolled
                      ? "bg-gray-100 text-gray-900"
                      : "bg-white/10 text-white"
                    : isScrolled
                      ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className={cn(
                  "w-full justify-start px-4",
                  isScrolled
                    ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    : "text-gray-300 hover:bg-white/10 hover:text-white",
                )}
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
