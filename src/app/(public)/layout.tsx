import React from "react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* 
        The main content grows to fill available space. 
        Top padding prevents content from hiding behind the fixed navbar. 
        Using pt-[84px] as standard offset for fixed desktop nav.
      */}
      <main className="flex-grow pt-[84px]">
        {children}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
