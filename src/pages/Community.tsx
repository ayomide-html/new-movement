import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { Navigation } from "@/components/Navigation";
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Loader2,
  Pin,
  User,
  Clock,
  Mail,
} from "lucide-react";

export default function Community() {
  const [form, setForm] = useState({ name: "", email: "", content: "" });

  const utils = trpc.useUtils();
  const { data: messages, isLoading } = trpc.message.list.useQuery();

  const createMutation = trpc.message.create.useMutation({
    onSuccess: () => {
      utils.message.list.invalidate();
      setForm({ name: "", email: "", content: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.content) return;
    createMutation.mutate(form);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#171717]">
      <Navigation />

      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#b0b0b0] hover:text-[#d69e2e] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#d69e2e]/15 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#d69e2e]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#f0f0f0] tracking-tight">
                Community Board
              </h1>
              <p className="text-xs font-mono text-[#b0b0b0]">
                Leave a message, share a thought, or just say hi.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-panel rounded-xl p-5 glow-border sticky top-24">
              <h3 className="text-sm font-semibold text-[#f0f0f0] mb-4 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#d69e2e]" />
                Drop a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-[#b0b0b0] uppercase mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#b0b0b0] uppercase mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#b0b0b0] uppercase mb-1 block">
                    Message
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#d69e2e] text-[#171717] rounded-md text-xs font-mono font-semibold hover:bg-[#e0a83a] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {createMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  Post Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Messages List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[#f0f0f0]">
                Messages ({messages?.length || 0})
              </h3>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-[#d69e2e] animate-spin" />
              </div>
            ) : messages?.length === 0 ? (
              <div className="glass-panel rounded-xl p-8 text-center">
                <MessageSquare className="w-8 h-8 text-[#505050] mx-auto mb-3" />
                <p className="text-sm text-[#b0b0b0]">No messages yet.</p>
                <p className="text-xs text-[#505050] mt-1">
                  Be the first to leave a message!
                </p>
              </div>
            ) : (
              messages?.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-panel rounded-xl p-5 glow-border-hover transition-all ${
                    msg.isPinned ? "border-[#d69e2e]/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d69e2e]/20 to-[#a4408c]/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-[#d69e2e]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#f0f0f0]">
                          {msg.name}
                        </span>
                        {msg.isPinned && (
                          <span className="flex items-center gap-0.5 text-[10px] font-mono text-[#d69e2e] bg-[#d69e2e]/10 px-2 py-0.5 rounded-full">
                            <Pin className="w-2.5 h-2.5" />
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#d4d4d4] leading-relaxed mb-2">
                        {msg.content}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-[#505050]">
                        <span className="flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" />
                          {msg.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
