import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  {
    text: "Logic will get you from A to B. Imagination will take you everywhere.",
    author: "Albert Einstein",
    theme: "logic",
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    theme: "curiosity",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    theme: "systems",
  },
  {
    text: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
    theme: "technology",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    theme: "discipline",
  },
  {
    text: "The best code is no code at all. The second best is code that's easy to delete.",
    author: "Unknown",
    theme: "technology",
  },
  {
    text: "It is not that I'm so smart, it's just that I stay with problems longer.",
    author: "Albert Einstein",
    theme: "discipline",
  },
  {
    text: "The whole is greater than the sum of its parts.",
    author: "Aristotle",
    theme: "systems",
  },
];

export function Quotes() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % quotes.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + quotes.length) % quotes.length);
  };

  const q = quotes[current];

  return (
    <section className="py-24 bg-[#171717] relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#a4408c]/10 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#d69e2e] uppercase tracking-wider">
            &gt; philosophy.quotes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] mt-2 tracking-tight font-serif italic">
            Words That Shape Thought
          </h2>
        </motion.div>

        {/* Quote Display */}
        <div className="relative min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              <Quote className="w-8 h-8 text-[#d69e2e]/30 mx-auto mb-6" />
              <p className="text-xl sm:text-2xl md:text-3xl text-[#f0f0f0] font-serif italic leading-relaxed mb-6">
                "{q.text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#d69e2e]/30" />
                <span className="text-sm font-mono text-[#d69e2e]">{q.author}</span>
                <span className="h-px w-8 bg-[#d69e2e]/30" />
              </div>
              <span className="inline-block mt-3 px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/5 text-[#b0b0b0] rounded-full border border-white/5">
                {q.theme}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            className="p-2 rounded-lg bg-white/5 text-[#b0b0b0] hover:bg-white/10 hover:text-[#f0f0f0] transition-all border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current
                    ? "bg-[#d69e2e] w-6"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="p-2 rounded-lg bg-white/5 text-[#b0b0b0] hover:bg-white/10 hover:text-[#f0f0f0] transition-all border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
