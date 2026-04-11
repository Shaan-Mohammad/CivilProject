"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, HardHat, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { APP_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "glass shadow-xl py-4 border-b border-primary/10" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-105 transition-transform">
            <HardHat size={20} />
          </div>
          <span className={`font-heading font-bold text-xl tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-foreground sm:text-foreground"}`}>
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] font-semibold tracking-wide transition-all hover:text-primary relative group ${
                pathname.startsWith(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname.startsWith(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/quote">
              <Button className="shadow-primary px-7 py-6 text-base font-bold rounded-xl animate-fade-in pulse-glow hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background transition-all">
                Get a Quote
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* @ts-expect-error Radix UI type misalignment in shadcn */}
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col h-full mt-6 gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <HardHat size={20} />
                  </div>
                  <span className="font-heading font-bold text-xl">{APP_NAME}</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        pathname.startsWith(link.href)
                          ? "text-primary border-l-4 border-primary pl-2"
                          : "text-foreground hover:text-primary pl-2.5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground p-4 bg-muted/30 rounded-lg">
                    <PhoneCall size={18} className="text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <Link href="/quote" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full">Get a Quote</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
