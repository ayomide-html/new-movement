import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  ShoppingCart,
  Truck,
  BookOpen,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const projects = [
  {
    title: "BabyShopHub",
    description:
      "A comprehensive e-commerce platform for baby products. Built with Spring Boot REST APIs and Flutter frontend. Features product catalog, cart management, secure checkout, and order tracking.",
    stack: ["Spring Boot", "Flutter", "MySQL", "Firebase Auth"],
    icon: ShoppingCart,
    color: "#e76f00",
    github: "#",
    demo: "#",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    title: "Logistics App",
    description:
      "End-to-end logistics management system. Real-time shipment tracking, route optimization, driver management, and automated delivery notifications for enterprise clients.",
    stack: ["Java", "Spring Boot", "Flutter", "Google Maps API"],
    icon: Truck,
    color: "#6db33f",
    github: "#",
    demo: "#",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    title: "eBook Library System",
    description:
      "Digital library management with book cataloging, user authentication, borrowing system, and reading progress tracking. A full-stack application demonstrating CRUD operations and relational database design.",
    stack: ["Spring Boot", "JPA/Hibernate", "MySQL", "Thymeleaf"],
    icon: BookOpen,
    color: "#805ad5",
    github: "#",
    demo: "#",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    title: "Remote Android Control",
    description:
      "A proof-of-concept system for remotely controlling Android devices via web interface. Explores ADB integration, WebSocket communication, and real-time screen mirroring concepts.",
    stack: ["Java", "WebSocket", "Android SDK", "JavaScript"],
    icon: Smartphone,
    color: "#02569b",
    github: "#",
    demo: "#",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#1e1e1e] relative">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#04cd69]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a4408c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#d69e2e] uppercase tracking-wider">
            &gt; projects.showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] mt-2 tracking-tight">
            Deployed Works
          </h2>
          <p className="text-sm text-[#b0b0b0] mt-3 max-w-lg leading-relaxed">
            Real applications built with real purpose. Each one taught me something new about systems, users, and myself.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative glass-panel rounded-xl overflow-hidden glow-border-hover transition-all"
            >
              {/* Gradient bg */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 p-6">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${project.color}15` }}
                  >
                    <project.icon
                      className="w-6 h-6"
                      style={{ color: project.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#f0f0f0] group-hover:text-[#d69e2e] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 mt-1.5">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#b0b0b0] border border-white/5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#b0b0b0] leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#b0b0b0] hover:text-[#f0f0f0] transition-colors px-3 py-1.5 rounded bg-white/5 hover:bg-white/10"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#d69e2e] hover:text-[#f0f0f0] transition-colors px-3 py-1.5 rounded bg-[#d69e2e]/10 hover:bg-[#d69e2e]/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                  <ArrowRight className="w-4 h-4 text-[#b0b0b0] opacity-0 group-hover:opacity-100 transition-all ml-auto group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
