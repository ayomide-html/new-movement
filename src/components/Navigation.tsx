import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import {
  Code2,
  Menu,
  X,
  Github,
  LogOut,
  User,
  Shield,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (!isHome) return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1e1e1e]/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#d69e2e] to-[#a4408c] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-mono font-semibold text-[#f0f0f0] group-hover:text-[#d69e2e] transition-colors">
              ayo.dev
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isHome &&
              navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="px-3 py-1.5 text-xs font-mono text-[#b0b0b0] hover:text-[#f0f0f0] hover:bg-white/5 rounded transition-all"
                >
                  {link.label}
                </button>
              ))}
            <Link
              to="/community"
              className="px-3 py-1.5 text-xs font-mono text-[#b0b0b0] hover:text-[#f0f0f0] hover:bg-white/5 rounded transition-all flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" />
              Board
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-1.5 text-xs font-mono text-[#d69e2e] hover:bg-[#d69e2e]/10 rounded transition-all flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/ayomide-html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b0b0b0] hover:text-[#f0f0f0] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#b0b0b0] flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-xs font-mono text-[#b0b0b0] hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-mono px-3 py-1.5 bg-[#d69e2e]/10 text-[#d69e2e] hover:bg-[#d69e2e]/20 rounded transition-all border border-[#d69e2e]/30"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#f0f0f0]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1e1e1e]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {isHome &&
                navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left px-3 py-2 text-sm font-mono text-[#b0b0b0] hover:text-[#f0f0f0] hover:bg-white/5 rounded"
                  >
                    {link.label}
                  </button>
                ))}
              <Link
                to="/community"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-mono text-[#b0b0b0] hover:text-[#f0f0f0] hover:bg-white/5 rounded"
              >
                Community Board
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-mono text-[#d69e2e] hover:bg-[#d69e2e]/10 rounded"
                >
                  Admin Dashboard
                </Link>
              )}
              <div className="pt-2 border-t border-white/10">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-mono text-red-400 hover:bg-white/5 rounded"
                  >
                    Sign Out ({user?.name})
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm font-mono text-[#d69e2e] hover:bg-[#d69e2e]/10 rounded"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
