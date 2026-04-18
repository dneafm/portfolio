import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/casefiles", label: "Casefiles" },
  { path: "/operator-lab", label: "Experiments" },
  { path: "/cv", label: "CV" },
  { path: "/contact", label: "Contact" },
];

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative bg-zinc-50 dark:bg-zinc-950 dossier-grid text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Subtle Global Scanline */}
      <div className="fixed inset-0 pointer-events-none z-[9998] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] opacity-[0.03] dark:opacity-[0.07]" />

      {/* Top Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md md:sticky">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm group-hover:rotate-45 transition-transform" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              HoangPham_Portfolio
            </span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "font-mono text-[11px] font-bold uppercase tracking-widest transition-all hover:text-blue-600 dark:hover:text-blue-400",
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-zinc-200 dark:border-zinc-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 px-3 py-2 text-zinc-500 dark:text-zinc-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Menu</span>
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
            <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-all",
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-blue-600 dark:hover:text-blue-400"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 max-w-5xl mx-auto w-full px-6",
          isHome ? "pt-20 pb-12 md:pt-20 md:pb-24" : "pt-28 pb-12 md:py-24"
        )}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300 dark:text-zinc-700">
            SYS.VER.1.0.0 // {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-500">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            STATUS: ONLINE
          </div>
        </div>
      </footer>
    </div>
  );
}
