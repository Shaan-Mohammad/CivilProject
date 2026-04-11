"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader, UploadedFileData } from "@/components/shared/FileUploader";
import { submitQuoteRequest } from "@/actions/crm";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  serviceType: z.string().min(2, "Service type is required"),
  projectType: z.string().optional(),
  plotArea: z.string().optional(),
  floors: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, "Please provide more details"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

function QuoteFormInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";
  
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      serviceType: initialService
    }
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["name", "email", "phone"]);
    } else if (step === 2) {
      isValid = await trigger(["serviceType", "projectType", "plotArea", "floors"]);
    }
    
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        ...data,
        files: uploadedFiles,
      };

      const res = await submitQuoteRequest(payload);
      if (res.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setErrorMessage(res.message);
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="bg-card border-2 border-green-500 flex flex-col items-center justify-center p-12 rounded-3xl shadow-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-green-500/5"></div>
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-green-500/30">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="font-heading text-3xl font-bold mb-4 relative z-10">Quote Request Received!</h2>
        <p className="text-muted-foreground text-center max-w-md relative z-10">
          Thank you for trusting CivilDraft Pro. Your project inquiry and documents have been securely processed. A lead engineer will contact you shortly with an initial estimate.
        </p>
      </motion.div>
    );
  }

  const steps = [
    { title: "Contact Info" },
    { title: "Project Scopes" },
    { title: "Documents & Details" }
  ];

  return (
    <div className="bg-card p-8 md:p-12 rounded-3xl border shadow-xl relative">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>
        
        {steps.map((s, i) => {
          const isActive = step >= i + 1;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "bg-secondary text-muted-foreground"}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider hidden md:block ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {submitStatus === "error" && (
        <div className="mb-8 bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 border border-red-200">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-heading text-2xl font-bold mb-6">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name *</label>
                  <Input {...register("name")} placeholder="Your Name" className="h-12" />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email Address *</label>
                  <Input {...register("email")} type="email" placeholder="you@company.com" className="h-12" />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone Number *</label>
                <Input {...register("phone")} placeholder="+1 (555) 000-0000" className="h-12" />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="flex justify-end pt-6">
                <Button type="button" size="lg" onClick={nextStep} className="px-8 h-12">
                  Next Step <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-heading text-2xl font-bold mb-6">Project Scope</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Service Required *</label>
                  <select 
                    {...register("serviceType")} 
                    className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a service...</option>
                    <option value="Residential Plan">Residential Plan</option>
                    <option value="2D CAD Drafting">2D CAD Drafting</option>
                    <option value="3D Elevation">3D Elevation</option>
                    <option value="Structural Layout">Structural Layout</option>
                    <option value="Cost Estimation">Cost Estimation</option>
                    <option value="Other">Other Consulting</option>
                  </select>
                  {errors.serviceType && <p className="text-xs text-red-500">{errors.serviceType.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Project Type</label>
                  <Input {...register("projectType")} placeholder="e.g. Commercial Office, Residential Villa" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Plot Area (sq. ft. / sq. m.)</label>
                  <Input {...register("plotArea")} placeholder="e.g. 2400 sq.ft." className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Number of Floors</label>
                  <Input {...register("floors")} placeholder="e.g. G+2" className="h-12" />
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" size="lg" onClick={prevStep} className="h-12">
                  <ArrowLeft size={18} className="mr-2" /> Back
                </Button>
                <Button type="button" size="lg" onClick={nextStep} className="px-8 h-12">
                  Next Step <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-heading text-2xl font-bold mb-6">Details & Attachments</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Estimated Budget</label>
                  <Input {...register("budget")} placeholder="e.g. $50,000" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Target Timeline</label>
                  <Input {...register("timeline")} placeholder="e.g. 3 Months, Start ASAP" className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Detailed Description *</label>
                <Textarea 
                  {...register("description")} 
                  rows={5} 
                  placeholder="Tell us everything about what you want to achieve..." 
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <label className="text-sm font-semibold flex items-center justify-between">
                  Attachments
                  <span className="text-xs font-normal text-muted-foreground mr-2">(Optional) Blueprint sketches, survey data</span>
                </label>
                <FileUploader 
                  onUploadComplete={setUploadedFiles}
                  maxFiles={5}
                />
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" size="lg" onClick={prevStep} className="h-12" disabled={isSubmitting}>
                  <ArrowLeft size={18} className="mr-2" /> Back
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting} className="px-8 h-12">
                  {isSubmitting ? "Submitting Request..." : "Submit Quote Request"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

export function QuoteForm() {
  return (
    <Suspense fallback={<div className="h-[600px] bg-card rounded-3xl animate-pulse"></div>}>
      <QuoteFormInner />
    </Suspense>
  );
}
