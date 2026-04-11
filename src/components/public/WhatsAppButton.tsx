"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  // Use a generic placeholder if true phone not established or dynamic
  const whatsappNumber = "+15551234567";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I'm interested in civil engineering services."
  )}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-card-hover hover:scale-110 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
      {/* Pulse effect rings */}
      <span className="absolute w-full h-full rounded-full bg-green-500 opacity-20 animate-ping"></span>
    </motion.a>
  );
}
