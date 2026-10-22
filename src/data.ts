export const profile = {
  name: "Hemachandu Gunthati",
  firstName: "Hemachandu",
  lastName: "Gunthati",
  roles: ["Software Engineer", "Full-Stack Developer", "Java Developer"],
  location: "Tirupati, Andhra Pradesh, India",
  email: "hemc00153@gmail.com",
  photo: "hemachandu.webp",
  links: {
    github: "https://github.com/Hemchand1728",
    linkedin: "https://www.linkedin.com/in/hemachandu-gunthati-b72257349/",
    leetcode: "https://leetcode.com/u/Hemachandu/",
  },
};

export const about = [
  "I'm a Computer Science and Engineering undergraduate at SRM University AP (class of 2027) and an Oracle Certified Professional, Java SE 17 Developer.",
  "I enjoy building practical software: designing REST APIs, modelling databases, wiring up authentication, and shipping full-stack apps with Java, Python and modern web technologies.",
  "I'm happiest turning a real-world problem into working software, and I keep sharpening my fundamentals in data structures, algorithms and system design.",
];

export const stats = [
  { value: "2027", label: "B.Tech CSE graduate" },
  { value: "88%", label: "Oracle Java SE 17 (1Z0-829)" },
  { value: "150+", label: "LeetCode problems solved" },
];

export const skills = [
  { group: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "C++"] },
  { group: "Frameworks & Libraries", items: ["Spring Boot", "Node.js", "Express.js", "Flask", "React", "spaCy", "OpenCV"] },
  { group: "Databases", items: ["MySQL", "MongoDB"] },
  { group: "Tools & Platforms", items: ["Git", "GitHub", "Postman", "VS Code"] },
  {
    group: "Core Concepts",
    items: ["Data Structures & Algorithms", "OOP", "REST API Design", "JWT Authentication", "Role-Based Access Control", "DBMS", "Operating Systems", "Computer Networks"],
  },
];

export const experience = [
  {
    period: "Jul 2025 — Present",
    tag: "Remote",
    role: "Backend / Full-Stack Developer Intern",
    org: "Edunet Foundation",
    summary: "Built the backend and integrations for a Blood Bank Management System, from API design through role-tested deployment.",
    points: [
      "Designed REST APIs for donor registration, blood requests, inventory updates and request tracking.",
      "Implemented JWT authentication and role-based access control for Admin, Donor and Recipient roles.",
      "Designed database schemas and relationships for donors, inventory and blood requests.",
      "Integrated frontend and backend, and tested role-specific flows before deployment.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "REST"],
  },
  {
    period: "2023 — 2027",
    tag: "Education",
    role: "B.Tech, Computer Science and Engineering",
    org: "SRM University AP",
    summary: "Coursework across data structures and algorithms, OOP, DBMS, operating systems and computer networks.",
    points: [],
    stack: [],
  },
];

export type Project = {
  title: string;
  kicker: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const featured: Project = {
  title: "Blood Bank Management System",
  kicker: "Featured · Full-stack",
  description:
    "A full-stack app for donor registration, blood requests, inventory management and request tracking. JWT authentication with role-based access for Admin, Donor and Recipient users, backed by REST APIs and MongoDB schemas I designed.",
  stack: ["Node.js", "Express.js", "MongoDB", "JavaScript", "HTML", "CSS"],
  links: [
    { label: "Live Demo", href: "https://hemchand1728.github.io/blood-bank-frontend/" },
    { label: "Frontend", href: "https://github.com/Hemchand1728/blood-bank-frontend" },
    { label: "Backend", href: "https://github.com/Hemchand1728/blood-bank-backend" },
  ],
};

export const projects: Project[] = [
  {
    title: "Sentiment Analyzer",
    kicker: "NLP · Web",
    description: "Classifies the sentiment of user-submitted text and extracts keywords using NLP, with fallback handling for reliability when external services are down.",
    stack: ["Python", "Flask", "MongoDB", "spaCy", "TextBlob"],
    links: [{ label: "GitHub", href: "https://github.com/Hemchand1728/Sentiment-analyzer" }],
  },
  {
    title: "AI Hand Gesture Control",
    kicker: "Computer Vision",
    description: "Real-time computer vision that maps hand gestures to computer actions, using landmark tracking, custom gesture classification and frame-based stability filtering.",
    stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: [{ label: "GitHub", href: "https://github.com/Hemchand1728/-AI-Hand-Gesture-Control-System" }],
  },
  {
    title: "SummAI — Text Summarizer",
    kicker: "NLP · Analytics",
    description: "An NLP summarization app with a business-insights mode, adjustable compression, TF-IDF keyword extraction, readability metrics and an analytics dashboard.",
    stack: ["Python", "Flask", "NLTK", "JavaScript"],
    links: [{ label: "GitHub", href: "https://github.com/Hemchand1728/Gen-ai" }],
  },
  {
    title: "Calorie Intake Calculator",
    kicker: "Hackathon · Vision",
    description: "Logs meals from photos, voice or manual entry. A YOLO model detects foods in images, with user accounts and an analytics view of daily intake.",
    stack: ["Python", "Flask", "YOLO", "OpenCV", "SQLAlchemy"],
    links: [{ label: "GitHub", href: "https://github.com/Hemchand1728/calorie-intake-calculator" }],
  },
  {
    title: "News Aggregator",
    kicker: "Web · Data",
    description: "Pulls articles from RSS feeds across nine categories into one reader, with image extraction, fallback sources, and user sign-up and login.",
    stack: ["Python", "Flask", "SQLite", "feedparser", "BeautifulSoup"],
    links: [{ label: "GitHub", href: "https://github.com/Hemchand1728/News-aggregator" }],
  },
];

export const certification = {
  title: "Oracle Certified Professional",
  subtitle: "Java SE 17 Developer",
  issuer: "Oracle · Exam 1Z0-829",
  score: 88,
  href: "https://www.linkedin.com/feed/update/urn:li:activity:7429542701483839488/",
};

export const achievements = [
  {
    mark: "150+",
    title: "LeetCode problems solved",
    text: "Consistent practice in data structures, algorithms and problem-solving.",
    href: "https://leetcode.com/u/Hemachandu/",
  },
  {
    mark: "C4C",
    title: "Code4Change Hackathon, KLU AP",
    text: "Took part in the Code4Change hackathon at KL University AP and received a participation certificate.",
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];
