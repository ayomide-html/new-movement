import { motion } from "framer-motion";
import {
  Database,
  Smartphone,
  Code2,
  GitBranch,
  Flame,
  Layout,
  Server,
  Palette,
  Cloud,
} from "lucide-react";

const techStack = [
  {
    name: "Java",
    icon: Coffee,
    color: "#e76f00",
    desc: "The root language. Strong typing, OOP mastery, and battle-tested enterprise patterns.",
    tags: ["Spring", "OOP", "JVM"],
  },
  {
    name: "Spring Boot",
    icon: Server,
    color: "#6db33f",
    desc: "Backend architecture powerhouse. Microservices, DI, and clean REST APIs.",
    tags: ["Microservices", "REST", "JPA"],
  },
  {
    name: "Flutter",
    icon: Smartphone,
    color: "#02569b",
    desc: "Cross-platform mobile magic. Pixel-perfect UIs with a single codebase.",
    tags: ["Dart", "Mobile", "UI"],
  },
  {
    name: "Dart",
    icon: Code2,
    color: "#00b4ab",
    desc: "Flutter's companion. Clean syntax, async programming, type-safe development.",
    tags: ["Async", "Typesafe", "Flutter"],
  },
  {
    name: "MySQL",
    icon: Database,
    color: "#00758f",
    desc: "Reliable data persistence. Schema design, optimization, and complex queries.",
    tags: ["SQL", "Schema", "Indexes"],
  },
  {
    name: "Firebase",
    icon: Flame,
    color: "#ffca28",
    desc: "Backend-as-a-service for rapid prototyping. Auth, Firestore, Cloud Functions.",
    tags: ["Auth", "Realtime", "Cloud"],
  },
  {
    name: "Git & GitHub",
    icon: GitBranch,
    color: "#f0f0f0",
    desc: "Version control mastery. Branching strategies, CI/CD, collaborative workflows.",
    tags: ["GitFlow", "CI/CD", "Collaboration"],
  },
  {
    name: "HTML & CSS",
    icon: Layout,
    color: "#e34c26",
    desc: "Web foundation. Semantic markup, responsive design, and modern CSS techniques.",
    tags: ["Semantic", "Responsive", "Flexbox"],
  },
  {
    name: "JavaScript",
    icon: Palette,
    color: "#f7df1e",
    desc: "Frontend interactivity. ES6+, async/await, DOM manipulation, and modern frameworks.",
    tags: ["ES6+", "Async", "DOM"],
  },
  {
    name: "System Design",
    icon: Cloud,
    color: "#805ad5",
    desc: "Architecting scalable systems. Load balancing, caching, database sharding.",
    tags: ["Scalability", "Patterns", "Architecture"],
  },
];

function Coffee(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="py-24 bg-[#171717] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d69e2e]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#d69e2e] uppercase tracking-wider">
            &gt; tech.stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] mt-2 tracking-tight">
            The Toolkit
          </h2>
          <p className="text-sm text-[#b0b0b0] mt-3 max-w-lg mx-auto leading-relaxed">
            Languages, frameworks, and tools I use to translate ideas into reality.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group relative glass-panel rounded-lg p-5 cursor-default glow-border-hover transition-all"
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 30px ${tech.color}15, inset 0 0 30px ${tech.color}05`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${tech.color}15` }}
                >
                  <tech.icon className="w-5 h-5" style={{ color: tech.color }} />
                </div>

                <h3 className="text-sm font-semibold text-[#f0f0f0] mb-1.5">
                  {tech.name}
                </h3>
                <p className="text-xs text-[#b0b0b0] leading-relaxed mb-3">
                  {tech.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {tech.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-[#b0b0b0] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
