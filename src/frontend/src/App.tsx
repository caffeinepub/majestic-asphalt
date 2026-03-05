import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Construction,
  FileText,
  Heart,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Minus,
  ParkingSquare,
  Phone,
  Shield,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ─── Types ──────────────────────────────────────────────────────────────────

type ServiceKey =
  | "drivewayPaving"
  | "parkingLotPaving"
  | "asphaltRepair"
  | "sealcoating"
  | "lineStriping";

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: ServiceKey | "";
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Smooth Scroll Helper ───────────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Nav Component ───────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Why Us", id: "why-us" },
    { label: "Gallery", id: "gallery" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="Go to top"
          >
            <img
              src="/assets/generated/majestic-asphalt-logo-transparent.dim_400x120.png"
              alt="Majestic Asphalt"
              className="h-10 md:h-12 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <button
              type="button"
              data-ocid="nav.services_link"
              onClick={() => scrollToSection("services")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-amber transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Services
            </button>
            <button
              type="button"
              data-ocid="nav.about_link"
              onClick={() => scrollToSection("about")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-amber transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("why-us")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-amber transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Why Us
            </button>
            <button
              type="button"
              data-ocid="nav.gallery_link"
              onClick={() => scrollToSection("gallery")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-amber transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("testimonials")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-amber transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Testimonials
            </button>
            <button
              type="button"
              data-ocid="nav.contact_link"
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-amber transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Contact
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              data-ocid="nav.quote_button"
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground font-bold tracking-wide hover:bg-primary/90 shadow-amber-sm px-6"
            >
              Get a Free Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded text-foreground/80 hover:text-amber transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setMobileOpen(false);
                  }}
                  className="text-left px-4 py-3 text-base font-medium text-foreground/80 hover:text-amber hover:bg-surface-2 rounded transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 px-4">
                <Button
                  onClick={() => {
                    scrollToSection("contact");
                    setMobileOpen(false);
                  }}
                  className="w-full bg-primary text-primary-foreground font-bold"
                >
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-paving.dim_1200x600.jpg"
          alt="Asphalt paving in progress"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        {/* Subtle amber gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.008_260)] via-transparent to-transparent" />
      </div>

      {/* Decorative amber horizontal line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-amber text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Licensed &amp; Insured · Free Estimates
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-foreground text-shadow-strong mb-6"
        >
          Quality Asphalt
          <br />
          <span className="text-amber">You Can Count On</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Professional paving, repair, and sealcoating —
          <br className="hidden sm:block" />
          done right, on time, every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            data-ocid="hero.primary_button"
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="bg-primary text-primary-foreground font-bold text-base px-8 py-6 shadow-amber-md hover:bg-primary/90 hover:shadow-amber-md transition-all duration-200"
          >
            Get a Free Quote
          </Button>
          <Button
            data-ocid="hero.secondary_button"
            onClick={() => scrollToSection("services")}
            size="lg"
            variant="outline"
            className="border-foreground/30 text-foreground hover:border-primary hover:text-amber font-semibold text-base px-8 py-6 transition-all duration-200"
          >
            Our Services
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-5 h-8 rounded-full border-2 border-foreground/30 flex items-start justify-center pt-1"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

const services = [
  {
    icon: Construction,
    title: "Driveway Paving",
    description:
      "Transform your home's curb appeal with a smooth, durable new asphalt driveway installed to last for decades.",
  },
  {
    icon: ParkingSquare,
    title: "Parking Lot Paving",
    description:
      "Commercial-grade paving solutions for businesses of all sizes, from small lots to large multi-tenant properties.",
  },
  {
    icon: Wrench,
    title: "Asphalt Repair",
    description:
      "Crack filling, pothole patching, and surface restoration that eliminates hazards and extends pavement life.",
  },
  {
    icon: Layers,
    title: "Sealcoating",
    description:
      "Protective sealcoating shields your asphalt from UV rays, water damage, and oxidation for years of extra life.",
  },
  {
    icon: Minus,
    title: "Line Striping",
    description:
      "Crisp, durable line striping for parking lots, roads, and warehouses that meets ADA compliance requirements.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-surface-1">
      {/* Top edge accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight">
            Our Services
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUpVariants}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-card border border-border rounded-lg p-8 overflow-hidden cursor-default hover:border-primary/50 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[3rem] group-hover:bg-primary/10 transition-colors" />

              {/* Icon */}
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <service.icon
                  className="w-7 h-7 text-amber"
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}

          {/* Final card — CTA */}
          <motion.button
            type="button"
            variants={fadeUpVariants}
            custom={services.length}
            className="flex items-center justify-center bg-primary/10 border border-primary/30 rounded-lg p-8 lg:col-span-3 sm:col-span-2 group cursor-pointer hover:bg-primary/15 transition-all duration-300 w-full text-left"
            onClick={() => scrollToSection("contact")}
          >
            <div className="text-center">
              <p className="text-amber font-bold text-lg mb-2">
                Not sure what service you need?
              </p>
              <p className="text-muted-foreground text-sm">
                Contact us for a free assessment and estimate →
              </p>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "20+", label: "Years Experience" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "Free", label: "Estimates" },
];

function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUpVariants}
              className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
            >
              Our Story
            </motion.span>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight mb-6"
            >
              About Majestic Asphalt
            </motion.h2>
            <motion.div
              variants={fadeUpVariants}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Founded with a passion for quality craftsmanship, Majestic
                Asphalt has been delivering exceptional paving services for over
                two decades. What started as a family operation has grown into
                one of the metro area's most trusted asphalt contractors.
              </p>
              <p>
                We're a family-owned business, and that shows in every job we
                take on. Our crew treats every driveway, parking lot, and road
                repair as if it were our own — no shortcuts, no corners cut.
              </p>
              <p>
                From residential driveways to large commercial parking lots, we
                bring the same level of professionalism and attention to detail
                to every project. We're fully licensed and insured, and we stand
                behind our work with a satisfaction guarantee.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-8">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-primary-foreground font-bold hover:bg-primary/90"
              >
                Get Your Free Estimate
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUpVariants}
                custom={i}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
              >
                <div className="font-display font-black text-4xl md:text-5xl text-amber mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────

const whyFeatures = [
  {
    icon: Award,
    title: "Expert Crew",
    description:
      "Trained, experienced professionals who take pride in precision work.",
  },
  {
    icon: Shield,
    title: "Premium Materials",
    description:
      "We use only top-grade asphalt and sealants for lasting results.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect your schedule and finish projects when promised.",
  },
  {
    icon: FileText,
    title: "Free Estimates",
    description:
      "Detailed, no-obligation quotes with transparent pricing upfront.",
  },
];

function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative py-24 md:py-32 bg-surface-1 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background text decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-display font-black text-primary/[0.03] leading-none select-none pointer-events-none hidden lg:block">
        PRO
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Why We're Different
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight">
            Why Choose Us
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {whyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUpVariants}
              custom={i}
              className="text-center group"
            >
              <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <feature.icon
                  className="w-7 h-7 text-amber"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

const galleryItems = [
  {
    src: "/assets/generated/gallery-parking-lot.dim_600x400.jpg",
    caption: "Commercial Parking Lot",
    alt: "Freshly paved commercial parking lot with line striping",
  },
  {
    src: "/assets/generated/gallery-driveway.dim_600x400.jpg",
    caption: "Residential Driveway Sealcoating",
    alt: "Beautiful black sealcoated residential driveway",
  },
  {
    src: "/assets/generated/gallery-repair.dim_600x400.jpg",
    caption: "Asphalt Repair & Patching",
    alt: "Professional asphalt repair and pothole patching",
  },
];

function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight">
            Project Gallery
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Real projects, real results. See why our clients keep coming back.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {galleryItems.map((item, i) => (
            <motion.figure
              key={item.caption}
              data-ocid={`gallery.item.${i + 1}`}
              variants={fadeUpVariants}
              custom={i}
              className="group relative overflow-hidden rounded-lg border border-border cursor-default"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <figcaption className="text-foreground font-display font-bold text-lg">
                    {item.caption}
                  </figcaption>
                </div>
              </div>
              {/* Default caption */}
              <div className="bg-card px-5 py-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground group-hover:text-amber transition-colors">
                  {item.caption}
                </p>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "Majestic Asphalt transformed our driveway. Clean, fast, and fair pricing!",
    author: "Sarah M.",
    role: "Homeowner",
  },
  {
    quote:
      "Best parking lot resurfacing we've ever had. Highly recommend for commercial work.",
    author: "Tom R.",
    role: "Property Manager",
  },
  {
    quote: "Repair was done same week. No more potholes! Great team.",
    author: "Carlos D.",
    role: "Business Owner",
  },
];

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-surface-1 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Decorative quotes */}
      <div className="absolute left-8 top-16 text-[12rem] font-serif text-primary/[0.04] leading-none select-none pointer-events-none">
        "
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Client Reviews
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight">
            What Our Clients Say
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              data-ocid={`testimonials.item.${i + 1}`}
              variants={fadeUpVariants}
              custom={i}
              className="bg-card border border-border rounded-lg p-8 relative hover:border-primary/40 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <Star key={k} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/85 leading-relaxed mb-6 text-base italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-amber text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact / Quote Form ─────────────────────────────────────────────────────

const serviceOptions: { label: string; value: ServiceKey }[] = [
  { label: "Driveway Paving", value: "drivewayPaving" },
  { label: "Parking Lot Paving", value: "parkingLotPaving" },
  { label: "Asphalt Repair", value: "asphaltRepair" },
  { label: "Sealcoating", value: "sealcoating" },
  { label: "Line Striping", value: "lineStriping" },
];

function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.service) newErrors.service = "Please select a service.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!actor) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await actor.submitQuoteRequest(
        form.name.trim(),
        form.phone.trim(),
        form.email.trim(),
        form.service,
        form.message.trim(),
      );
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUpVariants}
              className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight mb-6"
            >
              Request a Free Quote
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground mb-10 leading-relaxed"
            >
              Ready to get started? Fill out the form and one of our experts
              will contact you within 24 hours to discuss your project and
              provide a detailed, no-obligation estimate.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "(555) 444-7890" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@majesticasphalt.com",
                },
                {
                  icon: MapPin,
                  label: "Service Area",
                  value: "Serving the Greater Metro Area",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUpVariants}
                  custom={i + 3}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon
                      className="w-5 h-5 text-amber"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Why choose checklist */}
            <motion.div
              variants={fadeUpVariants}
              custom={6}
              className="mt-10 p-6 bg-card border border-border rounded-lg"
            >
              <p className="font-bold text-foreground mb-4">
                Every estimate includes:
              </p>
              <ul className="space-y-2">
                {[
                  "Detailed project scope",
                  "Material specifications",
                  "Completion timeline",
                  "Written price guarantee",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-card border border-border rounded-lg p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                      Request Sent!
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Thanks! We'll reach out within 24 hours with your free
                      estimate.
                    </p>
                    <Button
                      onClick={() => setStatus("idle")}
                      variant="outline"
                      className="border-border hover:border-primary hover:text-amber"
                    >
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-name"
                        className="text-sm font-semibold text-foreground"
                      >
                        Full Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.name_input"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="John Smith"
                        className={`bg-background border-border focus:border-primary ${errors.name ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-destructive text-xs flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="contact-phone"
                          className="text-sm font-semibold text-foreground"
                        >
                          Phone <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="contact-phone"
                          data-ocid="contact.phone_input"
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          placeholder="(555) 000-0000"
                          className={`bg-background border-border focus:border-primary ${errors.phone ? "border-destructive" : ""}`}
                          aria-invalid={!!errors.phone}
                          aria-describedby={
                            errors.phone ? "phone-error" : undefined
                          }
                        />
                        {errors.phone && (
                          <p
                            id="phone-error"
                            className="text-destructive text-xs flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="contact-email"
                          className="text-sm font-semibold text-foreground"
                        >
                          Email <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          data-ocid="contact.email_input"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="john@example.com"
                          className={`bg-background border-border focus:border-primary ${errors.email ? "border-destructive" : ""}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-destructive text-xs flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service Type */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-service"
                        className="text-sm font-semibold text-foreground"
                      >
                        Service Type <span className="text-primary">*</span>
                      </Label>
                      <Select
                        value={form.service}
                        onValueChange={(val) =>
                          setForm((p) => ({ ...p, service: val as ServiceKey }))
                        }
                      >
                        <SelectTrigger
                          id="contact-service"
                          data-ocid="contact.service_select"
                          className={`bg-background border-border focus:border-primary ${errors.service ? "border-destructive" : ""}`}
                          aria-invalid={!!errors.service}
                          aria-describedby={
                            errors.service ? "service-error" : undefined
                          }
                        >
                          <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          {serviceOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value}
                              className="hover:bg-accent"
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p
                          id="service-error"
                          className="text-destructive text-xs flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" /> {errors.service}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-message"
                        className="text-sm font-semibold text-foreground"
                      >
                        Message <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        data-ocid="contact.message_textarea"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Tell us about your project — size, location, timeline..."
                        rows={4}
                        className={`bg-background border-border focus:border-primary resize-none ${errors.message ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="text-destructive text-xs flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Error Banner */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          data-ocid="contact.error_state"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          Something went wrong. Please try again or call us at
                          (555) 444-7890.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={status === "loading"}
                      className="w-full bg-primary text-primary-foreground font-bold text-base py-6 hover:bg-primary/90 shadow-amber-sm disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2
                            data-ocid="contact.loading_state"
                            className="mr-2 h-4 w-4 animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        "Send My Request"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      No spam, ever. We'll only contact you about your project.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const quickLinks = [
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative bg-surface-1 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/assets/generated/majestic-asphalt-logo-transparent.dim_400x120.png"
              alt="Majestic Asphalt"
              className="h-10 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-5">
              Professional asphalt paving, repair, and sealcoating services for
              residential and commercial properties throughout the metro area.
            </p>
            <p className="text-xs text-muted-foreground">
              <MapPin className="inline w-3 h-3 mr-1" />
              Serving the Greater Metro Area
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-amber transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-amber flex-shrink-0" />
                (555) 444-7890
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-amber flex-shrink-0" />
                info@majesticasphalt.com
              </li>
              <li className="mt-4">
                <Button
                  size="sm"
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-xs"
                >
                  Get Free Quote
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} Majestic Asphalt. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" /> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyUsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
