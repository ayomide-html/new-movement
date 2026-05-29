import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/providers/trpc";
import {
  Bot,
  X,
  Send,
  Loader2,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Ayo's AI assistant. Ask me about philosophy, coding, or anything you're curious about!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    chatMutation.mutate({ message: userMsg });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#d69e2e] to-[#a4408c] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            style={{ background: "#1e1e1e" }}
          >
            {/* Header */}
            <div className="h-12 bg-[#252526] flex items-center justify-between px-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d69e2e] to-[#a4408c] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#f0f0f0]">
                    Ayo's AI
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-[#6db33f]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6db33f] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#6db33f]" />
                    </span>
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-[#b0b0b0]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d69e2e] to-[#a4408c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#d69e2e]/20 text-[#f0f0f0] rounded-br-sm"
                        : "bg-[#252526] text-[#d4d4d4] rounded-bl-sm border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-[#569cd6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#569cd6]" />
                    </div>
                  )}
                </motion.div>
              ))}
              {chatMutation.isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d69e2e] to-[#a4408c] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-[#252526] rounded-lg px-3 py-2 border border-white/5">
                    <Loader2 className="w-3.5 h-3.5 text-[#d69e2e] animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#252526] flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-[#1e1e1e] border border-white/10 rounded-md text-xs text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={chatMutation.isPending || !input.trim()}
                  className="p-2 rounded-md bg-[#d69e2e] text-[#171717] hover:bg-[#e0a83a] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
