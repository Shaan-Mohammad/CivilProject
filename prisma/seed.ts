import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  // ─── 1. Admin User ────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@123456",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@civildraftpro.com" },
    update: {},
    create: {
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@civildraftpro.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // ─── 2. Services ──────────────────────────────────────────────────
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: "Residential House Plans",
        slug: "residential-house-plans",
        description:
          "Custom residential floor plans designed for your dream home. From compact 1BHK to sprawling villas, we create plans that maximize space utilization and natural light.",
        longDescription:
          "Our residential house plan service covers everything from initial concept to detailed construction drawings. We consider vastu shastra, local building codes, and your lifestyle needs to create the perfect home layout. Each plan includes room dimensions, wall specifications, door and window placements, and electrical layouts.",
        icon: "Home",
        features: JSON.stringify([
          "Vastu-compliant designs",
          "2D floor plans with dimensions",
          "Elevation concepts included",
          "Revision rounds included",
          "Construction-ready drawings",
          "Material specification sheet",
        ]),
        order: 1,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: "2D CAD Drafting",
        slug: "2d-cad-drafting",
        description:
          "Precision 2D CAD drafting for architectural, structural, and MEP drawings. Industry-standard AutoCAD output with accurate dimensions and annotations.",
        longDescription:
          "Our professional CAD drafting team converts your sketches, blueprints, or PDFs into detailed 2D AutoCAD drawings. We follow BIS standards for drawing conventions, layering, and dimensioning. Files delivered in DWG, DXF, and PDF formats.",
        icon: "Pencil",
        features: JSON.stringify([
          "AutoCAD DWG/DXF output",
          "BIS standard compliance",
          "Accurate dimensioning",
          "Layer-organized drawings",
          "Multiple format delivery",
          "Quick turnaround time",
        ]),
        order: 2,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: "3D Elevation Design",
        slug: "3d-elevation-design",
        description:
          "Stunning 3D exterior elevations and interior visualizations that bring your project to life before construction begins. Photorealistic renders included.",
        longDescription:
          "See your building before it's built. Our 3D elevation service creates photorealistic exterior views from multiple angles, including front, side, and bird's eye perspectives. We use industry-leading tools to show material textures, lighting conditions, and landscaping.",
        icon: "Box",
        features: JSON.stringify([
          "Photorealistic 3D renders",
          "Multiple angle views",
          "Day & night lighting",
          "Material texture mapping",
          "Landscaping visualization",
          "VR-ready models available",
        ]),
        order: 3,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: "Structural Basic Layouts",
        slug: "structural-basic-layouts",
        description:
          "Foundational structural layouts including column positions, beam layouts, and load-bearing wall planning for safe and economical construction.",
        longDescription:
          "Our structural layout service provides the essential framework for your building's structural integrity. We plan column positions, beam spans, slab layouts, and foundation types based on soil conditions and building load requirements. All layouts are reviewed for safety compliance.",
        icon: "Building2",
        features: JSON.stringify([
          "Column & beam layout",
          "Foundation planning",
          "Load calculation sheet",
          "Slab design layout",
          "Staircase structural plan",
          "Safety compliance check",
        ]),
        order: 4,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: "Cost Estimation",
        slug: "cost-estimation",
        description:
          "Detailed cost estimation reports for your construction project. Know your budget before you break ground with our itemized cost breakdowns.",
        longDescription:
          "Our cost estimation service provides a comprehensive breakdown of all construction costs including materials, labor, equipment, and overheads. We use current market rates and include contingency provisions. The report helps you plan finances and avoid cost overruns.",
        icon: "IndianRupee",
        features: JSON.stringify([
          "Itemized cost breakdown",
          "Current market rates",
          "Material quantity list",
          "Labor cost estimation",
          "Contingency planning",
          "Phase-wise budget plan",
        ]),
        order: 5,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: "Quantity Takeoff",
        slug: "quantity-takeoff",
        description:
          "Accurate quantity takeoff and BOQ preparation for tendering and procurement. Every brick, bag of cement, and steel bar accounted for.",
        longDescription:
          "Our quantity takeoff service measures and quantifies every material needed for your construction project. We prepare detailed Bills of Quantities (BOQ) that are essential for contractor bidding, material procurement, and project cost control.",
        icon: "Calculator",
        features: JSON.stringify([
          "Detailed BOQ preparation",
          "Material-wise breakdown",
          "Unit rate analysis",
          "Tender document ready",
          "Excel format delivery",
          "Rate analysis included",
        ]),
        order: 6,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: "Consultation",
        slug: "consultation",
        description:
          "Expert civil engineering consultation for residential and commercial projects. Get professional guidance on design, permits, and construction challenges.",
        longDescription:
          "Our consultation service connects you with experienced civil engineers who can guide you through every phase of your project. From initial feasibility studies to construction supervision, we provide expert advice that saves time and money.",
        icon: "MessageCircle",
        features: JSON.stringify([
          "One-on-one expert sessions",
          "Design review & feedback",
          "Building permit guidance",
          "Construction supervision",
          "Problem resolution",
          "On-site & virtual meetings",
        ]),
        order: 7,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ ${services.length} services created`);

  // ─── 3. Portfolio Projects ────────────────────────────────────────
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: "Modern Villa - Greenfield Estate",
        slug: "modern-villa-greenfield-estate",
        description:
          "A contemporary 4BHK villa design featuring open-plan living, rooftop garden, and sustainable design elements. This project showcased our ability to blend modern aesthetics with practical engineering.",
        client: "Mr. Rajesh Sharma",
        location: "Gurgaon, Haryana",
        category: "Residential",
        status: "COMPLETED",
        featured: true,
        completedAt: new Date("2024-08-15"),
      },
    }),
    prisma.project.create({
      data: {
        title: "Commercial Complex - Tech Park",
        slug: "commercial-complex-tech-park",
        description:
          "A 5-story commercial complex with optimized floor plans for IT offices, retail spaces, and underground parking. Complete structural and architectural drawings delivered.",
        client: "Pinnacle Developers Pvt Ltd",
        location: "Noida, Uttar Pradesh",
        category: "Commercial",
        status: "COMPLETED",
        featured: true,
        completedAt: new Date("2024-06-20"),
      },
    }),
    prisma.project.create({
      data: {
        title: "Duplex Residence - Lake View",
        slug: "duplex-residence-lake-view",
        description:
          "An elegant duplex design with panoramic lake views, double-height living room, and energy-efficient design. Full 3D visualization and construction drawings provided.",
        client: "Mrs. Priya Mehta",
        location: "Udaipur, Rajasthan",
        category: "Residential",
        status: "COMPLETED",
        featured: true,
        completedAt: new Date("2024-04-10"),
      },
    }),
    prisma.project.create({
      data: {
        title: "Warehouse Structural Design",
        slug: "warehouse-structural-design",
        description:
          "Pre-engineered steel warehouse structural design with 30m clear span. Optimized for maximum storage capacity with minimal column interference.",
        client: "LogiSpace Industries",
        location: "Bhiwandi, Maharashtra",
        category: "Structural",
        status: "COMPLETED",
        featured: false,
        completedAt: new Date("2024-09-05"),
      },
    }),
    prisma.project.create({
      data: {
        title: "3BHK Interior Layout - Sky Apartments",
        slug: "3bhk-interior-layout-sky-apartments",
        description:
          "Complete interior space planning for a 1800 sq ft apartment. Modular kitchen layout, wardrobe designs, and false ceiling plans with electrical points.",
        client: "Mr. Ankit Jain",
        location: "Pune, Maharashtra",
        category: "Interior",
        status: "COMPLETED",
        featured: false,
        completedAt: new Date("2024-07-12"),
      },
    }),
    prisma.project.create({
      data: {
        title: "Heritage Building Renovation",
        slug: "heritage-building-renovation",
        description:
          "Structural assessment and renovation design for a 50-year-old heritage building. Seismic retrofitting and modern amenity integration while preserving original character.",
        client: "Heritage Trust of India",
        location: "Jaipur, Rajasthan",
        category: "Renovation",
        status: "COMPLETED",
        featured: true,
        completedAt: new Date("2024-03-18"),
      },
    }),
  ]);
  console.log(`✅ ${projects.length} portfolio projects created`);

  // ─── 4. Testimonials ──────────────────────────────────────────────
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: "Rajesh Sharma",
        company: "Homeowner",
        role: "Client",
        content:
          "CivilDraft Pro transformed my rough sketch into a beautiful and practical home design. Their attention to vastu and space optimization was exceptional. The 3D elevation helped me visualize the final result perfectly.",
        rating: 5,
        featured: true,
        order: 1,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Priya Mehta",
        company: "Sunrise Developers",
        role: "Managing Director",
        content:
          "We've been working with CivilDraft Pro for over 2 years now. Their CAD drafting accuracy and quick turnaround have been invaluable to our projects. Highly recommend for any developer looking for reliable engineering support.",
        rating: 5,
        featured: true,
        order: 2,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Vikram Singh",
        company: "BuildRight Construction",
        role: "Project Manager",
        content:
          "The quantity takeoff and cost estimation from CivilDraft Pro saved us nearly 15% on material costs. Their BOQ was so detailed that our procurement was seamless. A must-have service for any construction company.",
        rating: 5,
        featured: true,
        order: 3,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Sneha Kapoor",
        company: "Kapoor Residence",
        role: "Homeowner",
        content:
          "As a first-time home builder, I was overwhelmed by the process. CivilDraft Pro's consultation service guided me through everything — from design to permits. Their patience and expertise made the journey enjoyable.",
        rating: 5,
        featured: false,
        order: 4,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Arjun Desai",
        company: "Desai Architects",
        role: "Principal Architect",
        content:
          "CivilDraft Pro is our go-to partner for structural layouts. Their engineering calculations are thorough and their drawings are always construction-ready. They understand the architect-engineer collaboration perfectly.",
        rating: 4,
        featured: true,
        order: 5,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Meera Patel",
        company: "GreenBuild Solutions",
        role: "CEO",
        content:
          "Outstanding service! The team delivered our commercial complex drawings ahead of schedule. The 3D visualizations were so impressive that our clients approved the design in the very first presentation.",
        rating: 5,
        featured: false,
        order: 6,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Rahul Gupta",
        company: "Independent Builder",
        role: "Builder",
        content:
          "I've worked with many drafting services, but CivilDraft Pro stands out for their accuracy and professionalism. The floor plans are always dimensionally precise and the structural suggestions have saved significant costs.",
        rating: 4,
        featured: false,
        order: 7,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Kavita Reddy",
        company: "Homeowner",
        role: "Client",
        content:
          "From initial consultation to final delivery, the entire experience was smooth and professional. They took my Pinterest-collected ideas and turned them into buildable plans. My dream home is now a reality!",
        rating: 5,
        featured: true,
        order: 8,
      },
    }),
  ]);
  console.log(`✅ ${testimonials.length} testimonials created`);

  // ─── 5. Blog Categories ───────────────────────────────────────────
  const blogCategories = await Promise.all([
    prisma.blogCategory.create({
      data: { name: "Industry News", slug: "industry-news" },
    }),
    prisma.blogCategory.create({
      data: { name: "Tips & Guides", slug: "tips-guides" },
    }),
    prisma.blogCategory.create({
      data: { name: "Case Studies", slug: "case-studies" },
    }),
  ]);
  console.log(`✅ ${blogCategories.length} blog categories created`);

  // ─── 6. Blog Posts ────────────────────────────────────────────────
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: "5 Vastu Tips for Your New Home Floor Plan",
        slug: "5-vastu-tips-new-home-floor-plan",
        excerpt:
          "Planning a new home? Here are five essential vastu shastra principles that every homeowner should consider during the floor plan design stage.",
        content: `## Introduction\n\nVastu shastra, the ancient Indian science of architecture, offers time-tested principles for creating harmonious living spaces. When designing your floor plan, incorporating these guidelines can enhance the positive energy flow in your home.\n\n## 1. Main Entrance Placement\n\nThe main entrance is considered the mouth of the home through which energy enters. North and east-facing entrances are traditionally preferred as they allow maximum natural light and positive energy.\n\n## 2. Kitchen Location\n\nThe kitchen represents the fire element and is ideally placed in the southeast corner of the house. This aligns with the fire element's natural direction and promotes good health for the family.\n\n## 3. Master Bedroom Position\n\nThe master bedroom should ideally be in the southwest corner. This direction is associated with stability and strength, promoting restful sleep and relationship harmony.\n\n## 4. Bathroom and Toilet Placement\n\nBathrooms should be placed in the northwest or west direction. Avoid placing them in the northeast corner, which is considered sacred in vastu.\n\n## 5. Living Room Design\n\nThe living room works best in the north or east direction, welcoming natural light and creating a warm, inviting atmosphere for family gatherings and guests.\n\n## Conclusion\n\nWhile vastu principles provide excellent guidelines, modern engineering can adapt these concepts to work with any plot shape or orientation. Consult with a professional who understands both vastu and structural engineering for the best results.`,
        author: "CivilDraft Pro Team",
        categoryId: blogCategories[1].id,
        tags: "vastu,home-design,floor-plan,tips",
        published: true,
        publishedAt: new Date("2024-09-15"),
        views: 342,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "Understanding Building Plan Approval Process in India",
        slug: "building-plan-approval-process-india",
        excerpt:
          "A comprehensive guide to the building plan approval process across Indian municipalities. Learn about required documents, timelines, and common pitfalls.",
        content: `## Overview\n\nGetting your building plan approved by the local municipal authority is a crucial step before starting construction. This guide walks you through the typical process followed across most Indian cities.\n\n## Required Documents\n\n1. **Land ownership documents** — Sale deed, property card, and 7/12 extract\n2. **Sanctioned layout plan** — If the plot is part of a layout\n3. **Architectural drawings** — Floor plans, elevations, and sections\n4. **Structural design certificate** — From a licensed structural engineer\n5. **NOCs** — Fire, environmental, airport authority (if applicable)\n\n## The Approval Process\n\n### Step 1: Pre-submission Consultation\nMost municipal offices offer a pre-submission consultation where you can clarify requirements and avoid common errors.\n\n### Step 2: Document Submission\nSubmit all required documents along with the prescribed fee. Many cities now offer online submission portals.\n\n### Step 3: Technical Scrutiny\nThe planning department reviews drawings for compliance with building bylaws, setback requirements, FSI limits, and safety norms.\n\n### Step 4: Site Inspection\nAn inspector visits the site to verify plot boundaries, access roads, and existing structures.\n\n### Step 5: Plan Sanction\nUpon successful review, the sanctioned plan is issued. This typically takes 30-60 days.\n\n## Common Reasons for Rejection\n\n- Exceeding Floor Space Index (FSI) limits\n- Inadequate setback from boundaries\n- Missing fire safety provisions\n- Incomplete structural calculations\n\n## Conclusion\n\nHaving professionally prepared drawings significantly increases your chances of first-time approval. Our team ensures all drawings meet local building bylaws and BIS standards.`,
        author: "CivilDraft Pro Team",
        categoryId: blogCategories[0].id,
        tags: "building-approval,permits,construction,india",
        published: true,
        publishedAt: new Date("2024-08-20"),
        views: 567,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "How 3D Elevation Design Saves Money in Construction",
        slug: "3d-elevation-design-saves-money-construction",
        excerpt:
          "Investing in 3D elevation design before construction can prevent costly changes later. Learn how visualization technology reduces construction costs.",
        content: `## The Cost of Changes\n\nOne of the biggest budget overruns in construction comes from design changes made after work has started. Moving a wall on paper costs nothing, but moving it during construction can cost lakhs.\n\n## What is 3D Elevation Design?\n\n3D elevation design creates a photorealistic preview of your building's exterior appearance. Using advanced rendering software, we show you exactly how your building will look — including materials, colors, lighting, and landscaping.\n\n## How It Saves Money\n\n### 1. Eliminates Design Uncertainty\nWhen you can see your building in 3D before construction, you make better design decisions upfront. No more "I didn't know it would look like that" moments.\n\n### 2. Material Selection Confidence\nSee how different cladding materials, paint colors, and window styles look on your building. Make choices you'll be happy with for decades.\n\n### 3. Client Approval Speed\nFor developers, 3D elevations get faster client approvals. When buyers can see what they're investing in, decisions happen quicker.\n\n### 4. Contractor Clarity\nDetailed 3D references give contractors crystal-clear expectations, reducing interpretation errors that lead to rework.\n\n## ROI of 3D Visualization\n\nThe cost of 3D elevation design is typically 0.5-1% of total construction cost, but it can prevent changes that would cost 5-10% of the budget. That's a 10x return on investment.\n\n## Conclusion\n\nIn today's construction landscape, 3D visualization is not a luxury — it's a necessity. Contact us for a 3D elevation that brings your vision to life.`,
        author: "CivilDraft Pro Team",
        categoryId: blogCategories[1].id,
        tags: "3d-design,elevation,cost-saving,visualization",
        published: true,
        publishedAt: new Date("2024-07-10"),
        views: 289,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "Case Study: Modern Villa Design in Gurgaon",
        slug: "case-study-modern-villa-design-gurgaon",
        excerpt:
          "An in-depth look at how we designed a 4BHK contemporary villa on a 300 sq yard plot, maximizing space while maintaining an open, airy feel.",
        content: `## Project Brief\n\n**Client:** Mr. Rajesh Sharma\n**Location:** Greenfield Estate, Gurgaon\n**Plot Size:** 300 sq yards (2700 sq ft)\n**Requirements:** 4BHK, rooftop garden, home office, parking for 2 cars\n\n## Design Challenges\n\n1. Maximizing built-up area within FSI limits\n2. Creating an open-plan feel in a relatively compact plot\n3. Incorporating a home office with separate access\n4. Vastu compliance without compromising modern aesthetics\n\n## Our Approach\n\nWe began with a detailed site analysis, studying sun angles, wind patterns, and neighboring structures. The design process involved:\n\n### Ground Floor\n- Double-height entrance foyer for impact\n- Open-plan living + dining flowing to a rear garden\n- Separate home office with its own entrance\n- Two-car covered parking\n\n### First Floor\n- Master suite with walk-in wardrobe and private balcony\n- Two children's bedrooms with shared study area\n- Family room / entertainment space\n\n### Second Floor\n- Guest bedroom with ensuite\n- Utility area\n- Rooftop garden with deck and pergola\n\n## Results\n\n- Total built-up: 5400 sq ft across 3 floors\n- Construction cost: ₹1.25 Cr (approximately)\n- Design-to-approval time: 45 days\n- Client satisfaction: 5/5\n\n## Key Takeaways\n\nThe success of this project came from thorough initial planning. By investing time in detailed floor plans and 3D visualization, we eliminated all design changes during construction, keeping the project on budget and on schedule.`,
        author: "CivilDraft Pro Team",
        categoryId: blogCategories[2].id,
        tags: "case-study,villa,gurgaon,residential",
        published: true,
        publishedAt: new Date("2024-10-05"),
        views: 198,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "Choosing Between Steel and RCC Structure: A Builder's Guide",
        slug: "steel-vs-rcc-structure-builders-guide",
        excerpt:
          "Steel or RCC? This comprehensive comparison helps builders and homeowners choose the right structural system based on cost, speed, and performance.",
        content: `## Introduction\n\nOne of the most fundamental decisions in construction is choosing between steel frame and Reinforced Cement Concrete (RCC) structure. Both have their merits, and the right choice depends on your specific project requirements.\n\n## RCC Structure\n\n### Advantages\n- Lower material cost for low-rise buildings\n- Better fire resistance\n- Higher thermal mass (stays cooler)\n- Widely available labor\n- Flexible in shape and design\n\n### Disadvantages\n- Longer construction time\n- Higher dead load\n- Curing time delays\n- Difficult to modify after construction\n\n## Steel Structure\n\n### Advantages\n- Faster construction (30-40% quicker)\n- Lighter weight, reduced foundation cost\n- Larger clear spans possible\n- Easier to modify or extend\n- Better seismic performance\n\n### Disadvantages\n- Higher material cost\n- Requires skilled labor\n- Fire protection needed\n- Regular maintenance required\n\n## When to Choose What\n\n| Factor | RCC | Steel |\n|--------|-----|-------|\n| Residential (< 4 floors) | ✅ Preferred | Possible |\n| High-rise (> 10 floors) | Possible | ✅ Preferred |\n| Warehouse / Factory | Not ideal | ✅ Preferred |\n| Budget-conscious | ✅ Preferred | Higher cost |\n| Speed priority | Slower | ✅ Preferred |\n\n## Conclusion\n\nFor most residential projects in India, RCC remains the cost-effective choice. For commercial and industrial buildings, steel structures offer significant advantages in speed and span. Consult with our structural team to determine the best option for your project.`,
        author: "CivilDraft Pro Team",
        categoryId: blogCategories[1].id,
        tags: "structural,steel,rcc,construction,comparison",
        published: true,
        publishedAt: new Date("2024-06-25"),
        views: 445,
      },
    }),
  ]);
  console.log(`✅ ${blogPosts.length} blog posts created`);

  // ─── 7. FAQs ──────────────────────────────────────────────────────
  const faqs = await Promise.all([
    prisma.fAQ.create({
      data: {
        question: "What information do I need to provide for a house plan?",
        answer:
          "To get started, we need your plot dimensions, number of floors, room requirements (bedrooms, bathrooms, etc.), budget range, and any specific preferences like vastu compliance, architectural style, or special features. A site visit may be recommended for precise measurements.",
        slug: "information-needed-for-house-plan",
        category: "General",
        order: 1,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "How long does it take to complete a floor plan design?",
        answer:
          "A standard residential floor plan typically takes 5-7 working days from the initial brief. This includes the first draft and two rounds of revisions. Complex projects or commercial buildings may take 10-15 working days. Rush deliveries are available for urgent requirements.",
        slug: "floor-plan-design-timeline",
        category: "General",
        order: 2,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "What file formats do you deliver?",
        answer:
          "We deliver drawings in multiple formats including AutoCAD DWG, DXF, PDF, and high-resolution images (PNG/JPG). For 3D models, we provide files compatible with SketchUp, 3ds Max, and Revit. All deliverables are shared via secure cloud links.",
        slug: "file-formats-delivered",
        category: "Delivery",
        order: 3,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "How many revisions are included in the price?",
        answer:
          "Our standard packages include 2 rounds of revisions at no extra cost. Each revision round covers layout changes, dimension adjustments, and minor modifications. Major design changes (like adding an extra floor) may be quoted separately. We work closely with you to minimize the need for multiple revisions.",
        slug: "revisions-included",
        category: "Pricing",
        order: 4,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "Do you provide structural design along with architectural plans?",
        answer:
          "Yes, we offer structural basic layouts as a separate service that complements our architectural plans. This includes column positions, beam layouts, slab design, and foundation recommendations. For full structural engineering with calculations, we can provide that as an add-on service.",
        slug: "structural-design-with-architectural",
        category: "Services",
        order: 5,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "Can you help with building plan approval?",
        answer:
          "Yes, our plans are designed to meet local building bylaws and can be submitted for municipal approval. We ensure compliance with setback requirements, FSI limits, and safety norms. We also provide guidance on the approval process and required documentation.",
        slug: "building-plan-approval-help",
        category: "Services",
        order: 6,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "What is the cost of a residential house plan?",
        answer:
          "Our residential house plan pricing starts from ₹5 per sq ft for basic floor plans. The final cost depends on the complexity of the design, number of floors, and additional services like 3D elevation or structural layout. We provide a detailed quote after understanding your requirements.",
        slug: "cost-residential-house-plan",
        category: "Pricing",
        order: 7,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "Do you work with clients outside India?",
        answer:
          "Absolutely! We work with clients globally, including NRIs building homes in India and international clients needing CAD drafting services. All communication and delivery happens digitally. We accommodate different time zones for consultations.",
        slug: "international-clients",
        category: "General",
        order: 8,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "Is my project information kept confidential?",
        answer:
          "Yes, we take confidentiality very seriously. All project data, drawings, and communications are handled with strict confidentiality. We can sign NDAs for commercial projects if required. Our systems use encryption for data storage and transfer.",
        slug: "project-confidentiality",
        category: "General",
        order: 9,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: "How do I get started with a project?",
        answer:
          "Getting started is simple: 1) Fill out our quote request form or contact us via WhatsApp/phone. 2) Share your requirements and plot details. 3) Receive a detailed quote within 24 hours. 4) Once approved, we begin work immediately. 5) Receive your first draft within the agreed timeline.",
        slug: "getting-started",
        category: "General",
        order: 10,
      },
    }),
  ]);
  console.log(`✅ ${faqs.length} FAQ entries created`);

  // ─── 8. Site Settings ─────────────────────────────────────────────
  const settings = await Promise.all([
    prisma.siteSetting.create({
      data: {
        key: "company_name",
        value: "CivilDraft Pro",
        type: "TEXT",
        group: "general",
        label: "Company Name",
        description: "The name of the company displayed across the site",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "company_tagline",
        value: "Engineering Excellence, Delivered Digitally",
        type: "TEXT",
        group: "general",
        label: "Company Tagline",
        description: "Main tagline shown on the homepage hero",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "company_email",
        value: "info@civildraftpro.com",
        type: "TEXT",
        group: "contact",
        label: "Company Email",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "company_phone",
        value: "+91 98765 43210",
        type: "TEXT",
        group: "contact",
        label: "Phone Number",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "whatsapp_number",
        value: "+919876543210",
        type: "TEXT",
        group: "contact",
        label: "WhatsApp Number",
        description: "Number for WhatsApp CTA (include country code, no spaces)",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "company_address",
        value:
          "Office 304, Engineering Hub, Sector 15, Gurgaon, Haryana 122001",
        type: "TEXT",
        group: "contact",
        label: "Office Address",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "facebook_url",
        value: "https://facebook.com/civildraftpro",
        type: "TEXT",
        group: "social",
        label: "Facebook URL",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "instagram_url",
        value: "https://instagram.com/civildraftpro",
        type: "TEXT",
        group: "social",
        label: "Instagram URL",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "linkedin_url",
        value: "https://linkedin.com/company/civildraftpro",
        type: "TEXT",
        group: "social",
        label: "LinkedIn URL",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "twitter_url",
        value: "https://twitter.com/civildraftpro",
        type: "TEXT",
        group: "social",
        label: "Twitter/X URL",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "hero_title",
        value: "Professional Civil Engineering\nDrafting & Design Services",
        type: "TEXT",
        group: "homepage",
        label: "Hero Title",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "hero_subtitle",
        value:
          "Transform your vision into precision-engineered plans. Expert house plans, CAD drafting, 3D elevations, and structural layouts — delivered digitally.",
        type: "TEXT",
        group: "homepage",
        label: "Hero Subtitle",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "stats_projects_completed",
        value: "500",
        type: "NUMBER",
        group: "stats",
        label: "Projects Completed",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "stats_happy_clients",
        value: "350",
        type: "NUMBER",
        group: "stats",
        label: "Happy Clients",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "stats_years_experience",
        value: "12",
        type: "NUMBER",
        group: "stats",
        label: "Years of Experience",
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: "stats_cities_served",
        value: "25",
        type: "NUMBER",
        group: "stats",
        label: "Cities Served",
      },
    }),
  ]);
  console.log(`✅ ${settings.length} site settings created`);

  // ─── 9. Sample Enquiries ──────────────────────────────────────────
  const enquiries = await Promise.all([
    prisma.enquiry.create({
      data: {
        name: "Amit Verma",
        email: "amit.verma@email.com",
        phone: "+91 99887 76655",
        service: "Residential House Plans",
        status: "NEW",
        priority: "HIGH",
        description:
          "Looking for a 3BHK house plan on a 200 sq yard plot in Sector 49, Gurgaon. Need vastu-compliant design with parking for 2 cars.",
        source: "WEBSITE",
      },
    }),
    prisma.enquiry.create({
      data: {
        name: "Neha Agarwal",
        email: "neha.ag@email.com",
        phone: "+91 88776 65544",
        company: "Agarwal Builders",
        service: "2D CAD Drafting",
        status: "QUALIFIED",
        priority: "MEDIUM",
        description:
          "Need AutoCAD drawings for a 3-story residential building. Have hand-drawn sketches ready. Looking for quick turnaround.",
        source: "REFERRAL",
      },
    }),
    prisma.enquiry.create({
      data: {
        name: "Suresh Patel",
        email: "suresh.p@email.com",
        phone: "+91 77665 54433",
        service: "3D Elevation Design",
        status: "QUOTE_SENT",
        priority: "MEDIUM",
        budget: "₹25,000 - ₹35,000",
        description:
          "Want 3D elevation for my under-construction duplex. Need front and side views with 2 color options. Plot is in Ahmedabad.",
        source: "SOCIAL",
      },
    }),
    prisma.enquiry.create({
      data: {
        name: "Pooja Malhotra",
        email: "pooja.m@email.com",
        service: "Cost Estimation",
        status: "IN_PROGRESS",
        priority: "HIGH",
        budget: "₹15,000",
        description:
          "Need detailed cost estimation for a 4BHK house in Jaipur. Plans are already ready. Need itemized BOQ with current market rates.",
        source: "WEBSITE",
      },
    }),
    prisma.enquiry.create({
      data: {
        name: "Karan Mehta",
        email: "karan.m@email.com",
        phone: "+91 99001 12233",
        company: "Mehta Infrastructure",
        service: "Consultation",
        status: "DELIVERED",
        priority: "LOW",
        description:
          "Needed consultation for warehouse structural design. Project location: Bhiwandi, Maharashtra. Looking for pre-engineered steel building advice.",
        source: "DIRECT",
      },
    }),
  ]);
  console.log(`✅ ${enquiries.length} sample enquiries created`);

  // Add notes to some enquiries
  await prisma.enquiryNote.createMany({
    data: [
      {
        enquiryId: enquiries[1].id,
        content: "Client has construction experience. Shared reference designs.",
        type: "NOTE",
        createdBy: admin.name,
      },
      {
        enquiryId: enquiries[1].id,
        content: "Status changed from NEW to QUALIFIED",
        type: "STATUS_CHANGE",
        createdBy: "System",
      },
      {
        enquiryId: enquiries[2].id,
        content: "Sent quotation for ₹30,000 including 2 revision rounds.",
        type: "NOTE",
        createdBy: admin.name,
      },
      {
        enquiryId: enquiries[3].id,
        content: "BOQ preparation in progress. Expected completion: 3 days.",
        type: "NOTE",
        createdBy: admin.name,
      },
      {
        enquiryId: enquiries[4].id,
        content:
          "Consultation completed. Client satisfied with structural recommendations.",
        type: "NOTE",
        createdBy: admin.name,
      },
    ],
  });
  console.log("✅ Enquiry notes created");

  // ─── 10. Contact Messages ─────────────────────────────────────────
  await prisma.contactMessage.createMany({
    data: [
      {
        name: "Rohit Kumar",
        email: "rohit.k@email.com",
        phone: "+91 88990 01122",
        subject: "Inquiry about bulk drafting services",
        message:
          "Hi, I'm a builder and need regular CAD drafting services for multiple projects. Can you offer a monthly retainer package? We typically need 8-10 drawings per month.",
        isRead: false,
      },
      {
        name: "Ananya Singh",
        email: "ananya.s@email.com",
        subject: "Career inquiry - Civil Engineer",
        message:
          "I'm a B.Tech Civil Engineering graduate with 2 years of AutoCAD experience. I'm interested in joining your drafting team. Could you share details about any open positions?",
        isRead: true,
      },
      {
        name: "Deepak Joshi",
        email: "deepak.j@email.com",
        phone: "+91 77880 09911",
        subject: "Partnership proposal",
        message:
          "We are an architecture firm in Mumbai looking for a reliable engineering partner for our ongoing and upcoming projects. Would like to discuss a long-term collaboration.",
        isRead: false,
      },
    ],
  });
  console.log("✅ 3 contact messages created");

  // ─── 11. Quote Requests ───────────────────────────────────────────
  const quoteRequest1 = await prisma.quoteRequest.create({
    data: {
      name: "Manish Gupta",
      email: "manish.g@email.com",
      phone: "+91 98765 11223",
      serviceType: "Residential House Plans",
      projectType: "Individual House",
      plotArea: "250 sq yards",
      floors: "Ground + 2",
      budget: "₹50,000 - ₹75,000",
      timeline: "2 weeks",
      description:
        "Need complete house plan for a 250 sq yard plot in Lucknow. Want a modern design with 4 bedrooms, 2 living rooms, and a home temple. Vastu compliance is important.",
      enquiryId: enquiries[0].id,
    },
  });

  await prisma.quoteRequest.create({
    data: {
      name: "Sanjay Reddy",
      email: "sanjay.r@email.com",
      phone: "+91 87654 33221",
      serviceType: "3D Elevation Design",
      projectType: "Apartment Building",
      plotArea: "500 sq yards",
      floors: "Ground + 4",
      budget: "₹40,000 - ₹60,000",
      timeline: "3 weeks",
      description:
        "We are developing a small apartment building and need photorealistic 3D elevations for marketing material. Need front, left, and right views with 2 color schemes.",
    },
  });
  console.log("✅ 2 quote requests created");

  // ─── 12. Analytics Events ─────────────────────────────────────────
  const now = new Date();
  const analyticsData = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Page views
    const viewCount = Math.floor(Math.random() * 20) + 5;
    for (let j = 0; j < viewCount; j++) {
      analyticsData.push({
        event: "PAGE_VIEW",
        page: ["/", "/services", "/portfolio", "/about", "/contact", "/quote"][
          Math.floor(Math.random() * 6)
        ],
        metadata: JSON.stringify({ source: "organic" }),
        createdAt: new Date(
          date.getTime() + Math.floor(Math.random() * 86400000)
        ),
      });
    }

    // A few CTA clicks per day
    if (Math.random() > 0.3) {
      analyticsData.push({
        event: "CTA_CLICK",
        page: "/",
        metadata: JSON.stringify({ cta: "hero-get-quote" }),
        createdAt: new Date(
          date.getTime() + Math.floor(Math.random() * 86400000)
        ),
      });
    }
  }

  // Specific conversion events
  analyticsData.push(
    {
      event: "QUOTE_REQUEST",
      page: "/quote",
      metadata: JSON.stringify({ service: "Residential House Plans" }),
      createdAt: new Date(now.getTime() - 86400000 * 2),
    },
    {
      event: "CONTACT_FORM",
      page: "/contact",
      metadata: JSON.stringify({ subject: "Inquiry" }),
      createdAt: new Date(now.getTime() - 86400000 * 5),
    },
    {
      event: "QUOTE_REQUEST",
      page: "/quote",
      metadata: JSON.stringify({ service: "3D Elevation Design" }),
      createdAt: new Date(now.getTime() - 86400000 * 8),
    }
  );

  await prisma.analyticsEvent.createMany({ data: analyticsData });
  console.log(`✅ ${analyticsData.length} analytics events created`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("─────────────────────────────────────────");
  console.log("Admin login: admin@civildraftpro.com / Admin@123456");
  console.log("─────────────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
