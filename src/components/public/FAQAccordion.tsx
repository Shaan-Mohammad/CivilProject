"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQAccordion({ faqs }: { faqs: any[] }) {
  // If no FAQs are fetched, provide mock fallback for MVP.
  const displayFaqs = faqs && faqs.length > 0 ? faqs : [
    {
       id: "1", question: "What is your typical turnaround time for a residential house plan?", answer: "For a standard resdiential house plan, the first drafts are usually delivered within 7-10 business days depending on specific requirements and initial meetings."
    },
    {
       id: "2", question: "Are your structural blueprints compliant with municipal building codes?", answer: "Absolutely. All our drafting and architectural planning strictly adheres to local and national building codes, ensuring a smooth approval process by the municipal authorities."
    },
    {
       id: "3", question: "Do you offer revisions on initial drafts?", answer: "Yes. Our standard quoting package usually includes 2-3 rounds of revisions at no additional cost. We work with you until the blueprint matches your vision."
    },
    {
       id: "4", question: "How does the quote request process work?", answer: "You can submit a quote via our Quote Form, attaching any raw sketches or site layouts you have. Our engineers will review it and reply within 24 hours with an itemized budget."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
             <HelpCircle size={32} />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Clear answers to help you start your engineering project with confidence.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* @ts-expect-error Radix UI type misalignment in shadcn */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {displayFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="bg-card border rounded-xl px-6 data-[state=open]:shadow-sm transition-all overflow-hidden">
                <AccordionTrigger className="hover:no-underline font-heading font-bold text-left py-6 text-foreground/90">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
