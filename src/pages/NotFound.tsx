import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-xl bg-[#252526] border border-white/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-[#d69e2e]" />
        </div>

        <h1 className="text-6xl font-bold text-[#f0f0f0] font-mono mb-2">
          404
        </h1>
        <p className="text-sm font-mono text-[#b0b0b0] mb-6">
          // Route not found — the page you're looking for doesn't exist.
        </p>

        <div className="glass-panel rounded-lg p-4 inline-block text-left mb-6">
          <code className="text-xs font-mono text-[#d4d4d4]">
            <span className="code-keyword">throw new</span>{" "}
            <span className="code-type">NotFoundException</span>
            {"("}
            <span className="code-string">
              "The requested resource could not be located."
            </span>
            {");"}
          </code>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d69e2e] text-[#171717] rounded-md text-sm font-mono font-semibold hover:bg-[#e0a83a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
