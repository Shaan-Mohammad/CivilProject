"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/actions/crm";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(response.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="bg-green-50 text-green-800 p-8 rounded-2xl border border-green-200 text-center flex flex-col items-center shadow-sm"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
           <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold font-heading mb-2">Message Sent!</h3>
        <p className="max-w-md mx-auto">
          Thank you for reaching out. We have received your inquiry and a senior engineer will get back to you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 border-green-300 text-green-700 hover:bg-green-100"
          onClick={() => setSubmitStatus("idle")}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-card p-8 rounded-2xl border shadow-sm relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>

      <h3 className="font-heading text-2xl font-bold mb-6">Send us a Message</h3>
      
      {submitStatus === "error" && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 border border-red-200">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Full Name *</label>
            <Input {...register("name")} placeholder="John Doe" className={errors.name ? "border-red-500" : ""} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Email Address *</label>
            <Input {...register("email")} type="email" placeholder="john@example.com" className={errors.email ? "border-red-500" : ""} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Phone Number</label>
            <Input {...register("phone")} placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Subject *</label>
            <Input {...register("subject")} placeholder="General Inquiry" className={errors.subject ? "border-red-500" : ""} />
            {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Message *</label>
          <Textarea 
             {...register("message")} 
             rows={5} 
             placeholder="How can we help with your project?" 
             className={errors.message ? "border-red-500" : ""}
          />
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <Send size={18} className="ml-2" />}
        </Button>
      </form>
    </div>
  );
}
