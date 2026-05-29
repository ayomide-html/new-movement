import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Braces,
  Cpu,
  Leaf,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const typedLines = [
  { text: 'Hi, I\'m Ayo.', color: "#d69e2e" },
  { text: 'Philosophy student.', color: "#569cd6" },
  { text: 'Spring Boot developer.', color: "#ce9178" },
  { text: 'Flutter builder.', color: "#4ec9b0" },
  { text: 'I think deeply and build beautifully.', color: "#c586c0" },
];

interface FloatingSnippet {
  id: number;
  x: number;
  y: number;
  opacity: number;
  text: string;
  speed: number;
}

const codeSnippets = [
  "public class Wisdom {",
  "  @Autowired",
  "  private Curiosity mind;",
  "  void think() {",
  "    return logic + empathy;",
  "  }",
  "}",
  "class Philosophy:",
  "  def question(self):",
  "    return 'Why?'",
  "void build() {",
  "  while(alive) {",
  "    create(); learn();",
  "  }",
  "}",
];

export function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [floatingSnippets, setFloatingSnippets] = useState<FloatingSnippet[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const snippetIdRef = useRef(0);

  // Typing effect
  useEffect(() => {
    if (currentLine >= typedLines.length) return;
    const line = typedLines[currentLine].text;
    if (currentChar < line.length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), 80);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Floating code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const newSnippet: FloatingSnippet = {
        id: snippetIdRef.current++,
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
        y: typeof window !== "undefined" ? window.innerHeight + 20 : 800,
        opacity: 0.08 + Math.random() * 0.12,
        text,
        speed: 0.3 + Math.random() * 0.5,
      };
      setFloatingSnippets((prev) => [...prev.slice(-12), newSnippet]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animate floating snippets
  useEffect(() => {
    const animate = () => {
      setFloatingSnippets((prev) =>
        prev
          .map((s) => ({ ...s, y: s.y - s.speed }))
          .filter((s) => s.y > -50)
      );
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Fractal tree canvas
  const drawTree = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const branches: Array<{
      x: number; y: number; angle: number; length: number;
      depth: number; maxDepth: number; width: number; age: number;
    }> = [];

    const grow = () => {
      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw branches
      for (const b of branches) {
        const endX = b.x + Math.cos(b.angle) * b.length;
        const endY = b.y + Math.sin(b.angle) * b.length;
        const t = b.depth / b.maxDepth;

        const r = Math.round(222 * t + 164 * (1 - t));
        const g = Math.round(151 * t + 64 * (1 - t));
        const bl = Math.round(11 * t + 140 * (1 - t));
        const alpha = 0.3 + (1 - t) * 0.7;

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
        ctx.lineWidth = b.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glow at tips
        if (b.depth <= 2) {
          ctx.beginPath();
          ctx.arc(endX, endY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(4, 205, 105, ${0.3 + Math.sin(Date.now() * 0.003 + b.x) * 0.2})`;
          ctx.fill();
        }
      }

      // Animate growth
      if (branches.length < 200) {
        if (branches.length === 0) {
          branches.push({
            x: canvas.width / 2,
            y: canvas.height,
            angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.2,
            length: 0,
            depth: 0,
            maxDepth: 8 + Math.floor(Math.random() * 3),
            width: 4,
            age: 0,
          });
        }

        const newBranches: typeof branches = [];
        for (const b of branches) {
          b.age++;
          if (b.length < 40 + Math.random() * 60 && b.depth < b.maxDepth) {
            b.length += 0.8;
            if (b.length > 30 && Math.random() < 0.03) {
              const spread = 0.4 + Math.random() * 0.6;
              for (let i = 0; i < 2; i++) {
                const endX = b.x + Math.cos(b.angle) * b.length;
                const endY = b.y + Math.sin(b.angle) * b.length;
                newBranches.push({
                  x: endX,
                  y: endY,
                  angle: b.angle + spread * (i === 0 ? -1 : 1) + (Math.random() - 0.5) * 0.2,
                  length: 0,
                  depth: b.depth + 1,
                  maxDepth: b.maxDepth,
                  width: Math.max(0.5, b.width * 0.7),
                  age: 0,
                });
              }
            }
          }
        }
        branches.push(...newBranches);
      }

      requestAnimationFrame(grow);
    };

    grow();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawTree(ctx, canvas);
  }, [drawTree]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#171717" }}
      />

      {/* Floating code snippets */}
      {floatingSnippets.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: s.opacity }}
          className="absolute pointer-events-none font-mono text-xs text-[#95b83d] whitespace-nowrap"
          style={{ left: s.x, top: s.y }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        {/* VS Code Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Window Title Bar */}
          <div className="h-10 bg-[#252526] flex items-center px-4 border-b border-white/10">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#b0b0b0]">
              <Terminal className="w-3 h-3" />
              <span>welcome.md — ayo.dev</span>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-10 bg-[#1e1e1e]/80">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#b0b0b0] mb-6">
              <span>src</span>
              <span>/</span>
              <span>portfolio</span>
              <span>/</span>
              <span className="text-[#d69e2e]">welcome.md</span>
            </div>

            {/* Typing Lines */}
            <div className="space-y-2 font-mono">
              {typedLines.map((line, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#6a9955] text-xs mt-1 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-lg sm:text-2xl font-semibold"
                    style={{
                      color: i < currentLine ? line.color : "transparent",
                      transition: "color 0.3s",
                    }}
                  >
                    {i < currentLine
                      ? line.text
                      : i === currentLine
                      ? line.text.slice(0, currentChar)
                      : ""}
                    {i === currentLine && (
                      <span
                        className="inline-block w-2.5 h-5 ml-0.5 align-middle"
                        style={{
                          backgroundColor: showCursor ? line.color : "transparent",
                          transition: "background-color 0.1s",
                        }}
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Status Bar */}
            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-[#b0b0b0]">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                Spring Boot
              </span>
              <span className="flex items-center gap-1">
                <Braces className="w-3 h-3" />
                Flutter
              </span>
              <span className="flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                Philosophy
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Logic
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[#b0b0b0]">scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-[#d69e2e]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
