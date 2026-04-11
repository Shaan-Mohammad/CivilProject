import Link from "next/link";
import { HardHat, Mail, MapPin, Phone, Globe, Share2 } from "lucide-react";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <HardHat size={20} />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sidebar-foreground/70 mb-6 leading-relaxed">
              {APP_DESCRIPTION} We deliver precision, reliability, and excellence for every project.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-sidebar-border flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-sidebar-border flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sidebar-foreground/70 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sidebar-foreground/70 hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link href="/portfolio" className="text-sidebar-foreground/70 hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-sidebar-foreground/70 hover:text-accent transition-colors">Engineering Blog</Link></li>
              <li><Link href="/faq" className="text-sidebar-foreground/70 hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-6">Expertise</h3>
            <ul className="space-y-4">
              <li className="text-sidebar-foreground/70">Residential House Plans</li>
              <li className="text-sidebar-foreground/70">2D CAD Drafting</li>
              <li className="text-sidebar-foreground/70">3D Elevation Designs</li>
              <li className="text-sidebar-foreground/70">Structural Engineering</li>
              <li className="text-sidebar-foreground/70">Quantity & Estimation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-accent shrink-0 mt-1" />
                <span className="text-sidebar-foreground/70">123 Builder Avenue, Engineering Block, Tech City 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-accent shrink-0" />
                <a href="tel:+15551234567" className="text-sidebar-foreground/70 hover:text-accent transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-accent shrink-0" />
                <a href="mailto:info@civildraftpro.com" className="text-sidebar-foreground/70 hover:text-accent transition-colors">info@civildraftpro.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sidebar-foreground/50 text-sm align-center">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-sidebar-foreground/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sidebar-foreground/50 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
