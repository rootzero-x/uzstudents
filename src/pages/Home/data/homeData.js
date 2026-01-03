export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const partners = ["spotify", "slack", "zoom", "amazon", "microsoft", "airbnb", "netflix"];

export const benefits = [
  { no: "01", title: "Flexible Learning Schedule", desc: "Learn at your own pace with a schedule that fits your routine." },
  { no: "02", title: "Expert Instruction", desc: "Learn from industry experts with real-world experience and mentorship." },
  { no: "03", title: "Diverse Course Offerings", desc: "Choose from a broad catalog across design and development." },
  { no: "04", title: "Updated Curriculum", desc: "Stay current with modern tools, workflows, and best practices." },
  { no: "05", title: "Practical Projects and Assignments", desc: "Build portfolio-ready work with guided hands-on projects." },
  { no: "06", title: "Interactive Learning Environment", desc: "Engage with peers, feedback, and supportive community." },
];

export const courses = [
  {
    id: "web-design",
    tagA: "5 Videos",
    tagB: "Beginner",
    title: "Web Design Fundamentals",
    desc: "Learn layout, typography, colors, and building modern website interfaces.",
    author: "By John Smith",
    img:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "uiux",
    tagA: "6 Videos",
    tagB: "Intermediate",
    title: "UI/UX Design",
    desc: "Master user-centered design, wireframes, and building product experiences.",
    author: "By Emily Johnson",
    img:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "mobile-app",
    tagA: "4 Videos",
    tagB: "Beginner",
    title: "Mobile App Development",
    desc: "Build mobile-first apps with clean UI and scalable patterns.",
    author: "By Alex Brown",
    img:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "graphic",
    tagA: "7 Videos",
    tagB: "Beginner",
    title: "Graphic Design for Beginners",
    desc: "Design visuals, social posts, and branding assets with confidence.",
    author: "By Rachel Morgan",
    img:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "frontend",
    tagA: "9 Videos",
    tagB: "Advanced",
    title: "Front-End Web Development",
    desc: "Build responsive interfaces with best practices and modern tooling.",
    author: "By Michael Lee",
    img:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "js-advanced",
    tagA: "8 Videos",
    tagB: "Advanced",
    title: "Advanced JavaScript",
    desc: "Deep dive into JS patterns, async, performance, and architecture.",
    author: "By Jennifer Wilson",
    img:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
  },
];

export const testimonials = [
  {
    name: "Sarah L",
    role: "Student",
    text:
      "The courses were clear and practical. I built real projects and improved my portfolio quickly.",
  },
  {
    name: "Joseph M",
    role: "Student",
    text:
      "Great instructors and structured lessons. The UI/UX course especially helped me understand product thinking.",
  },
  {
    name: "Emily R",
    role: "Student",
    text:
      "Pricing is fair and the content is modern. I liked the assignments and feedback style.",
  },
  {
    name: "Michael K",
    role: "Student",
    text:
      "The learning schedule is flexible. I could study at night and still keep up with projects.",
  },
];

export const pricing = {
  monthly: [
    {
      name: "Free Tier",
      price: "$0",
      period: "/month",
      features: [
        "Access to free lessons",
        "Community support",
        "Limited course library",
        "Basic progress tracking",
        "Email updates",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro Tier",
      price: "$79",
      period: "/month",
      features: [
        "Full course access",
        "All projects & assignments",
        "Certificate of completion",
        "Priority support",
        "Downloadable resources",
      ],
      cta: "Get Started",
      highlight: true,
    },
  ],
  yearly: [
    {
      name: "Free Tier",
      price: "$0",
      period: "/year",
      features: [
        "Access to free lessons",
        "Community support",
        "Limited course library",
        "Basic progress tracking",
        "Email updates",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro Tier",
      price: "$699",
      period: "/year",
      features: [
        "Full course access",
        "All projects & assignments",
        "Certificate of completion",
        "Priority support",
        "Downloadable resources",
      ],
      cta: "Get Started",
      highlight: true,
    },
  ],
};

export const faqs = [
  { q: "Can I access the courses on mobile?", a: "Yes. The platform is fully responsive for mobile, tablet, and desktop." },
  { q: "Do I need experience to start?", a: "No. Many courses start from beginner level and build up step-by-step." },
  { q: "Are there assignments and projects?", a: "Yes. Courses include hands-on assignments and portfolio-ready projects." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time from your account settings." },
  { q: "Do students get certificates?", a: "Pro plan users receive certificates for completed courses." },
];
