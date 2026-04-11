"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Anderson",
    role: "Property Developer",
    content: "CivilDraft Pro transformed our messy architectural drafts into precise 3D models and structural blueprints perfectly. Their attention to municipal code is outstanding.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Homeowner",
    content: "When building our dream home, the cost estimation provided was so detailed that we stayed 5% under budget. Their civil engineering consultancy is worth every penny.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Lead Architect",
    content: "I regularly outsource my 2D CAD drafting to this team. Their turnaround time is impeccable, and the accuracy is second to none.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Construction Manager",
    content: "The structural layouts were clean, properly layered, and incredibly easy for my site team to follow. Absolutely top-tier engineering support.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=4"
  }
];

export function TestimonialCarousel() {
  return (
    <section className="py-24 bg-secondary/50 overflow-hidden relative">
       {/* Background graphic */}
       <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Client <span className="text-accent">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            Don&apos;t just take our word for it. Hear what industry professionals and homeowners say about our engineering services.
          </p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="px-4 md:px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {TESTIMONIALS.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full border-none shadow-sm hover:shadow-card-hover transition-all bg-card relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 text-primary/10 select-none">
                        <Quote size={100} className="transform rotate-180" />
                      </div>
                      
                      <CardContent className="flex flex-col h-full p-8 relative z-10">
                        <div className="flex gap-1 mb-6 text-accent">
                          {Array(5).fill("").map((_, i) => (
                             <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'text-muted fill-muted'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          ))}
                        </div>
                        
                        <p className="text-foreground/80 italic mb-8 flex-grow leading-relaxed">
                          &quot;{testimonial.content}&quot;
                        </p>
                        
                        <div className="flex items-center gap-4 mt-auto">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full border-2 border-primary/20"
                          />
                          <div>
                            <h4 className="font-bold text-foreground font-heading">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* The controls are absolute positioned usually */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
