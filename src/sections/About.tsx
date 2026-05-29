import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Coffee,
  BookOpen,
  Code2,
  Smartphone,
  Brain,
  Lightbulb,
  Terminal,
  ChevronRight,
  Zap,
} from "lucide-react";

const files = [
  {
    name: "Bio.md",
    icon: FileText,
    color: "#569cd6",
    content: `## Bio

I'm Ayo — a philosophy student by day, backend architect by night. I believe the best software, like the best arguments, is built on solid foundations and clear thinking.

My journey started with questions: *Why do systems work the way they do?* That curiosity led me from Aristotle's logic to Java's type system, from Plato's forms to Spring Boot's dependency injection.

I don't just write code — I think about the systems behind it. Every application is a model of reality, and every model reflects how we understand the world.`,
  },
  {
    name: "Logic.java",
    icon: Coffee,
    color: "#ce9178",
    content: `public class Logic {
    private final Curiosity curiosity;
    private final Discipline discipline;

    public Logic() {
        this.curiosity = new Curiosity("unbounded");
        this.discipline = new Discipline("unwavering");
    }

    public Solution solve(Problem p) {
        // First principles thinking
        Analysis a = deconstruct(p);
        // Systems approach
        Pattern pattern = recognize(a);
        // Build with intent
        return implement(pattern, discipline);
    }

    // Spring Boot is my weapon of choice
    // Clean architecture, SOLID principles
    // Microservices that actually make sense
}`,
  },
  {
    name: "Curiosity.txt",
    icon: Lightbulb,
    color: "#b5cea8",
    content: `Currently Learning & Exploring:

* Advanced system design patterns
* Cloud-native architectures (AWS/GCP)
* Philosophy of mind and AI consciousness
* Rust (because memory safety matters)
* GraphQL and modern API design
* DevOps and CI/CD pipelines

Reading:
* "The Structure of Scientific Revolutions" — Kuhn
* "Designing Data-Intensive Applications" — Kleppmann
* "Meditations" — Marcus Aurelius`,
  },
  {
    name: "Mobile.kt",
    icon: Smartphone,
    color: "#4ec9b0",
    content: `// Flutter & Dart — my mobile toolkit
// Building cross-platform experiences

class MobileBuilder {
    val framework = Flutter(
        philosophy = "Write once, run everywhere",
        approach = "Pixel-perfect UI + blazing performance"
    )

    fun buildApp(concept: Idea): Application {
        return framework
            .design(concept)
            .implement(Architecture.Clean)
            .test(TestStrategy.Comprensive)
            .deploy(Platform.Both)
    }
}

// Projects: BabyShopHub, Logistics App
// State management: BLoC, Provider
// Backend integration: REST APIs, Firebase`,
  },
];

const stats = [
  { label: "Lines of Code", value: "50K+", icon: Code2 },
  { label: "Cups of Coffee", value: "∞", icon: Coffee },
  { label: "Philosophy Books", value: "30+", icon: BookOpen },
  { label: "Projects Built", value: "12", icon: Terminal },
];

const techPills = [
  "Java", "Spring Boot", "Flutter", "Dart", "MySQL",
  "Firebase", "Git", "REST APIs", "Clean Architecture",
  "SOLID", "OOP", "System Design",
];

export function About() {
  const [activeFile, setActiveFile] = useState(0);

  return (
    <section id="about" className="py-24 bg-[#1e1e1e] relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a4408c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d69e2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#d69e2e] uppercase tracking-wider">
            &gt; about.me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] mt-2 tracking-tight">
            The Codebase
          </h2>
          <p className="text-sm text-[#b0b0b0] mt-3 max-w-lg leading-relaxed">
            Every developer has a story. Mine is written in Java, Dart, and the margins of philosophy books.
          </p>
        </motion.div>

        {/* Editor Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-0 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-[#252526] border-r border-white/10 p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b0b0b0] mb-4 uppercase tracking-wider">
              <Brain className="w-3 h-3" />
              Explorer
            </div>
            <div className="space-y-1">
              {files.map((file, i) => (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(i)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all ${
                    activeFile === i
                      ? "bg-white/10 text-[#f0f0f0]"
                      : "text-[#b0b0b0] hover:bg-white/5 hover:text-[#f0f0f0]"
                  }`}
                >
                  <file.icon className="w-4 h-4" style={{ color: file.color }} />
                  <span className="text-xs font-mono">{file.name}</span>
                  {activeFile === i && (
                    <ChevronRight className="w-3 h-3 ml-auto" style={{ color: file.color }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 bg-[#1e1e1e] p-6 overflow-auto min-h-[400px]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              {(() => {
                const Icon = files[activeFile].icon;
                return <Icon className="w-4 h-4" style={{ color: files[activeFile].color }} />;
              })()}
              <span className="text-xs font-mono text-[#f0f0f0]">
                {files[activeFile].name}
              </span>
            </div>
            <pre className="text-sm font-mono text-[#d4d4d4] whitespace-pre-wrap leading-relaxed">
              {files[activeFile].content}
            </pre>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="glass-panel rounded-lg p-4 text-center glow-border-hover transition-all"
            >
              <stat.icon className="w-5 h-5 text-[#d69e2e] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#f0f0f0]">{stat.value}</div>
              <div className="text-xs font-mono text-[#b0b0b0] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tech Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#b0b0b0] mb-4">
            <Zap className="w-3 h-3" />
            Currently wielding
          </div>
          <div className="flex flex-wrap gap-2">
            {techPills.map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 text-xs font-mono bg-white/5 text-[#b0b0b0] rounded-full border border-white/10 hover:border-[#d69e2e]/40 hover:text-[#d69e2e] transition-all cursor-default"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
