import React, { useMemo, useState } from "react";

/**
 * HomePage (React + TailwindCSS)
 * - Mobile / Laptop / Desktop responsive
 * - Data-driven sections (easy to replace with API later)
 * - Accessible basics (buttons, toggles, accordion)
 */

const cn = (...classes) => classes.filter(Boolean).join(" ");

function Icon({ name, className }) {
  // Minimal inline SVG icon set (no external deps)
  const common = { className: cn("inline-block", className), fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (name) {
    case "bolt":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v14l11-7L8 5z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    default:
      return null;
  }
}

function Button({
  as: Tag = "button",
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ring-offset-white disabled:opacity-60 disabled:pointer-events-none";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };
  const variants = {
    solid: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
    outline: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
    ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100",
  };

  const Comp = Tag;
  return (
    <Comp
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function SectionHeader({ title, description, action }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function Card({ className, children }) {
  return (
    <div className={cn("rounded-2xl border border-zinc-100 bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

function Pill({ children, className }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700", className)}>
      {children}
    </span>
  );
}

function Toggle({ left, right, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange(left.value)}
        className={cn(
          "h-9 rounded-lg px-4 text-sm font-medium transition",
          value === left.value ? "bg-orange-500 text-white shadow-sm" : "text-zinc-700 hover:bg-zinc-50"
        )}
      >
        {left.label}
      </button>
      <button
        type="button"
        onClick={() => onChange(right.value)}
        className={cn(
          "h-9 rounded-lg px-4 text-sm font-medium transition",
          value === right.value ? "bg-orange-500 text-white shadow-sm" : "text-zinc-700 hover:bg-zinc-50"
        )}
      >
        {right.label}
      </button>
    </div>
  );
}

function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-zinc-900">{title}</span>
        <span className={cn("grid h-8 w-8 place-items-center rounded-xl border border-zinc-200 text-zinc-700 transition", isOpen ? "bg-zinc-50" : "bg-white")}>
          <span className="text-lg leading-none">{isOpen ? "–" : "+"}</span>
        </span>
      </button>
      {isOpen ? (
        <div className="px-5 pb-5 text-sm leading-6 text-zinc-600">{content}</div>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [faqOpen, setFaqOpen] = useState(0);

  const navLinks = useMemo(
    () => [
      { label: "Home", href: "#" },
      { label: "Courses", href: "#courses" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#footer" },
    ],
    []
  );

  const brands = useMemo(
    () => ["spotify", "zoom", "adobe", "figma", "slack", "netflix"],
    []
  );

  const benefits = useMemo(
    () => [
      { no: "01", title: "Flexible Learning Schedule", text: "Learn at your pace with a schedule that fits your lifestyle." },
      { no: "02", title: "Expert Instruction", text: "Industry mentors and curated lessons to accelerate your growth." },
      { no: "03", title: "Diverse Course Offerings", text: "Design, development, and everything between — all in one place." },
      { no: "04", title: "Updated Curriculum", text: "Stay current with modern tools, frameworks, and best practices." },
      { no: "05", title: "Practical Projects and Assignments", text: "Build real portfolio pieces with guided, hands-on work." },
      { no: "06", title: "Interactive Learning Environment", text: "Community support, feedback loops, and live Q&A sessions." },
    ],
    []
  );

  const courses = useMemo(
    () => [
      {
        title: "Web Design Fundamentals",
        metaLeft: ["6 Weeks", "Beginner"],
        author: "By John Smith",
        desc:
          "Learn core layout, typography, and visual hierarchy. Build modern, responsive pages from scratch.",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        cta: "Get it Now",
      },
      {
        title: "UI/UX Design",
        metaLeft: ["4 Weeks", "Intermediate"],
        author: "By Sarah Wilson",
        desc:
          "Master wireframing, user flows, and usability. Create polished interfaces that feel effortless.",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        cta: "Get it Now",
      },
      {
        title: "Mobile App Development",
        metaLeft: ["8 Weeks", "Beginner"],
        author: "By Mark Johnson",
        desc:
          "Design and develop mobile-first experiences. Learn patterns that scale and ship confidently.",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
        cta: "Get it Now",
      },
      {
        title: "Graphic Design for Beginners",
        metaLeft: ["5 Weeks", "Beginner"],
        author: "By Emily Nguyen",
        desc:
          "Color, composition, brand basics, and practical tools — everything to start designing today.",
        image:
          "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=80",
        cta: "Get it Now",
      },
      {
        title: "Front-End Web Development",
        metaLeft: ["10 Weeks", "Intermediate"],
        author: "By Jennifer Brown",
        desc:
          "HTML, CSS, JS fundamentals plus modern patterns. Build real components and ship a project.",
        image:
          "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1200&q=80",
        cta: "Get it Now",
      },
      {
        title: "Advanced JavaScript",
        metaLeft: ["6 Weeks", "Advanced"],
        author: "By Robert White",
        desc:
          "Deep dive into closures, async patterns, architecture, and performance — write pro-level JS.",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
        cta: "Get it Now",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          "The lessons are structured perfectly. I shipped my first real portfolio project in two weeks.",
        name: "Jane Cooper",
        role: "UI Designer",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
      },
      {
        quote:
          "Clear explanations and practical projects. The feedback loop made a huge difference for me.",
        name: "Jacob Jones",
        role: "Front-end Developer",
        avatar:
          "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=80",
      },
      {
        quote:
          "Best online learning experience I’ve had — clean UI, focused content, and no fluff.",
        name: "Leslie Alexander",
        role: "Product Designer",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
      },
      {
        quote:
          "I finally understood JavaScript fundamentals. The advanced module was next-level.",
        name: "Brooklyn Simmons",
        role: "Software Engineer",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
      },
    ],
    []
  );

  const pricing = useMemo(() => {
    const proPrice = billing === "monthly" ? 79 : 699; // example yearly pricing
    const proSuffix = billing === "monthly" ? "/month" : "/year";
    return {
      free: {
        name: "Free Tier",
        price: 0,
        suffix: "/month",
        features: [
          "Access to selected free courses",
          "Community discussions",
          "Basic learning resources",
          "Limited projects",
          "Email updates",
        ],
      },
      pro: {
        name: "Pro Tier",
        price: proPrice,
        suffix: proSuffix,
        features: [
          "All courses unlocked",
          "Mentor feedback",
          "Downloadable resources",
          "Project-based learning",
          "Premium community access",
          "Certificates",
        ],
      },
    };
  }, [billing]);

  const faqs = useMemo(
    () => [
      {
        q: "Can I access the courses anytime?",
        a: "Yes. Courses are available 24/7, so you can learn at your own pace and revisit lessons whenever you want.",
      },
      {
        q: "Do I need experience to start?",
        a: "Not necessarily. We have beginner-friendly tracks. For advanced courses, we recommend basic HTML/CSS/JS familiarity.",
      },
      {
        q: "Are there projects in the courses?",
        a: "Absolutely. Most courses include hands-on assignments and portfolio-ready projects to help you build real skills.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. You can cancel your subscription at any time. You will keep access until the end of your billing period.",
      },
      {
        q: "Do you provide certificates?",
        a: "Pro plans include certificates for completed courses (based on meeting completion requirements).",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top announcement bar */}
      <div className="bg-orange-500 text-white">
        <Container className="py-2">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <p className="truncate">
              Free Courses for a limited time. Join today and start learning!
            </p>
            <a href="#pricing" className="hidden shrink-0 rounded-lg bg-white/15 px-3 py-1 font-medium hover:bg-white/20 sm:inline-flex">
              View Offers
            </a>
          </div>
        </Container>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/80 backdrop-blur">
        <Container className="py-3">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <a href="#" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white shadow-sm">
                <span className="text-sm font-bold">E</span>
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold">EduCraft</div>
                <div className="text-xs text-zinc-500">Design & Dev</div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <Button variant="ghost" size="sm" className="text-zinc-700">
                Sign in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 md:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? "x" : "menu"} className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen ? (
            <div className="md:hidden">
              <div className="mt-3 grid gap-2 rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-1 grid gap-2">
                  <Button variant="outline" className="w-full">
                    Sign in
                  </Button>
                  <Button className="w-full">Sign up</Button>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </header>

      {/* Hero */}
      <main>
        <section className="pt-10 sm:pt-14">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Pill className="gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-500 text-white">
                  <Icon name="bolt" className="h-4 w-4" />
                </span>
                Unlock Your Creative Potential
              </Pill>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                Unlock Your Creative Potential
              </h1>
              <p className="mt-3 text-sm leading-6 text-zinc-500 sm:text-base">
                with Online Design and Development Courses. Learn from experts,
                build projects, and level up your skills with a clean, guided path.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="#courses" as="a" className="w-full sm:w-auto">
                  Explore Courses
                </Button>
                <Button href="#pricing" as="a" variant="outline" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </div>
            </div>

            {/* Brand row */}
            <div className="mt-8 border-y border-zinc-100 bg-white">
              <Container className="py-4">
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {brands.map((b) => (
                    <span key={b} className="select-none">
                      {b}
                    </span>
                  ))}
                </div>
              </Container>
            </div>

            {/* Video / Hero image */}
            <div className="mt-8">
              <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm">
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-zinc-100 sm:aspect-[16/7] lg:aspect-[16/6]">
                  <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                    alt="Course preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-900 shadow-md backdrop-blur hover:bg-white"
                    aria-label="Play video"
                  >
                    <Icon name="play" className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits */}
        <section className="pt-14 sm:pt-16">
          <Container>
            <SectionHeader
              title="Benefits"
              description="Choose a platform that helps you learn faster, build stronger fundamentals, and ship better work."
              action={
                <Button as="a" href="#benefits" variant="outline" size="sm">
                  View all
                </Button>
              }
            />

            <div id="benefits" className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <Card key={b.no} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-3xl font-semibold text-zinc-900">{b.no}</div>
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 text-orange-500">
                      <Icon name="arrow-up-right" className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-zinc-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{b.text}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Courses */}
        <section id="courses" className="pt-14 sm:pt-16">
          <Container>
            <SectionHeader
              title="Our Courses"
              description="Pick a course that matches your goal. Each one includes structured lessons and practical outcomes."
              action={
                <Button as="a" href="#courses" variant="outline" size="sm">
                  View all
                </Button>
              }
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {courses.map((c) => (
                <Card key={c.title} className="overflow-hidden">
                  <div className="relative aspect-[16/9] w-full bg-zinc-100">
                    <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {c.metaLeft.map((m) => (
                          <span
                            key={m}
                            className="rounded-full bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs font-medium text-zinc-500">{c.author}</div>
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-zinc-900">{c.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{c.desc}</p>

                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        {c.cta}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials */}
        <section className="pt-14 sm:pt-16">
          <Container>
            <SectionHeader
              title="Our Testimonials"
              description="Real feedback from learners who improved their skills and shipped work they’re proud of."
            />

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-5">
                  <p className="text-sm leading-6 text-zinc-600">“{t.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.role}</div>
                    </div>
                    <div className="ml-auto text-xs font-medium text-zinc-400">Read story</div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Pricing */}
        <section id="pricing" className="pt-14 sm:pt-16">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeader
                title="Our Pricing"
                description="Choose a plan that fits your goals. Start free, upgrade when you want more depth."
              />
              <Toggle
                left={{ label: "Monthly", value: "monthly" }}
                right={{ label: "Yearly", value: "yearly" }}
                value={billing}
                onChange={setBilling}
              />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {/* Free */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <Pill className="bg-zinc-50">Free Tier</Pill>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <div className="text-4xl font-semibold text-zinc-900">${pricing.free.price}</div>
                  <div className="text-sm text-zinc-500">{pricing.free.suffix}</div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Available Features
                  </div>
                  <ul className="mt-3 grid gap-3">
                    {pricing.free.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-zinc-600">
                        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md bg-orange-50 text-orange-600">
                          <Icon name="check" className="h-4 w-4" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="mt-6 w-full">Get Started</Button>
              </Card>

              {/* Pro */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <Pill className="bg-orange-50 text-orange-700 border-orange-100">Pro Tier</Pill>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <div className="text-4xl font-semibold text-zinc-900">${pricing.pro.price}</div>
                  <div className="text-sm text-zinc-500">{pricing.pro.suffix}</div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Available Features
                  </div>
                  <ul className="mt-3 grid gap-3">
                    {pricing.pro.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-zinc-600">
                        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md bg-orange-50 text-orange-600">
                          <Icon name="check" className="h-4 w-4" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="mt-6 w-full">Get Started</Button>
              </Card>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="pt-14 sm:pt-16">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Quick answers to common questions. If you need more help, reach out anytime.
                </p>
                <div className="mt-5">
                  <Button as="a" href="#footer" variant="outline" size="sm">
                    See all FAQs
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 lg:col-span-8">
                {faqs.map((f, idx) => (
                  <AccordionItem
                    key={f.q}
                    title={f.q}
                    content={f.a}
                    isOpen={faqOpen === idx}
                    onToggle={() => setFaqOpen((v) => (v === idx ? -1 : idx))}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Footer */}
        <footer id="footer" className="mt-16 border-t border-zinc-100 bg-white">
          <Container className="py-10">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <a href="#" className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white shadow-sm">
                    <span className="text-sm font-bold">E</span>
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold">EduCraft</div>
                    <div className="text-xs text-zinc-500">Design & Dev</div>
                  </div>
                </a>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Learn design and development with clean structure, practical projects, and mentor-level guidance.
                </p>

                <div className="mt-4 grid gap-2 text-sm text-zinc-600">
                  <div>
                    <span className="font-medium text-zinc-800">Email:</span>{" "}
                    support@educraft.com
                  </div>
                  <div>
                    <span className="font-medium text-zinc-800">Phone:</span>{" "}
                    +1 (000) 123-4567
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-8 sm:grid-cols-3">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">Menu</div>
                    <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
                      {navLinks.map((l) => (
                        <li key={l.label}>
                          <a className="hover:text-zinc-900" href={l.href}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div id="about">
                    <div className="text-sm font-semibold text-zinc-900">About Us</div>
                    <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
                      <li><a className="hover:text-zinc-900" href="#courses">Our Courses</a></li>
                      <li><a className="hover:text-zinc-900" href="#pricing">Pricing</a></li>
                      <li><a className="hover:text-zinc-900" href="#benefits">Benefits</a></li>
                      <li><a className="hover:text-zinc-900" href="#footer">Contact</a></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-zinc-900">Social Profile</div>
                    <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
                      <li><a className="hover:text-zinc-900" href="#">Instagram</a></li>
                      <li><a className="hover:text-zinc-900" href="#">Twitter / X</a></li>
                      <li><a className="hover:text-zinc-900" href="#">LinkedIn</a></li>
                      <li><a className="hover:text-zinc-900" href="#">YouTube</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-zinc-100 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} EduCraft. All rights reserved.</div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-zinc-700">Privacy Policy</a>
                <a href="#" className="hover:text-zinc-700">Terms</a>
              </div>
            </div>
          </Container>
        </footer>
      </main>
    </div>
  );
}
