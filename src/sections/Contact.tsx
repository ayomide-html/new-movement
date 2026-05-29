import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Send,
  MessageSquare,
  MapPin,
  Globe,
  CheckCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    handle: "ayomide-html",
    icon: Github,
    color: "#f0f0f0",
    url: "https://github.com/ayomide-html",
  },
  {
    name: "LinkedIn",
    handle: "oliyide-ayimide-undefined-19264b28b",
    icon: Linkedin,
    color: "#0a66c2",
    url: "https://www.linkedin.com/in/oliyide-ayimide-undefined-19264b28b/",
  },
  {
    name: "Email",
    handle: "oliyideayimide05@gmail.com",
    icon: Mail,
    color: "#d69e2e",
    url: "mailto:oliyideayimide05@gmail.com",
  },
  {
    name: "Twitter/X",
    handle: "@ayo_thinks",
    icon: Twitter,
    color: "#1da1f2",
    url: "https://twitter.com",
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitMutation.mutate(form);
  };

  return (
    <section id="contact" className="py-24 bg-[#1e1e1e] relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#d69e2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#d69e2e] uppercase tracking-wider">
            &gt; contact.init
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] mt-2 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-sm text-[#b0b0b0] mt-3 max-w-lg mx-auto leading-relaxed">
            Have a project in mind? Want to discuss philosophy and code? Reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-xl p-6 glow-border-hover"
          >
            <div className="flex items-center gap-2 mb-6">
              <Send className="w-4 h-4 text-[#d69e2e]" />
              <h3 className="text-sm font-semibold text-[#f0f0f0]">Send a Message</h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle className="w-12 h-12 text-[#6db33f] mb-4" />
                <p className="text-lg font-semibold text-[#f0f0f0]">Message Sent!</p>
                <p className="text-sm text-[#b0b0b0] mt-1">
                  I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#b0b0b0] mb-1.5 block">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 focus:ring-1 focus:ring-[#d69e2e]/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#b0b0b0] mb-1.5 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 focus:ring-1 focus:ring-[#d69e2e]/20 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-[#b0b0b0] mb-1.5 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 focus:ring-1 focus:ring-[#d69e2e]/20 transition-all"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#b0b0b0] mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 focus:ring-1 focus:ring-[#d69e2e]/20 transition-all resize-none"
                    placeholder="Tell me something interesting..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#d69e2e] text-[#171717] rounded-md text-sm font-mono font-semibold hover:bg-[#e0a83a] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Social Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="glass-panel rounded-lg p-4 flex items-center gap-3 glow-border-hover transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${link.color}15` }}
                  >
                    <link.icon className="w-5 h-5" style={{ color: link.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f0f0f0]">{link.name}</p>
                    <p className="text-[10px] font-mono text-[#b0b0b0]">{link.handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Community Board CTA */}
            <Link to="/community">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="glass-panel rounded-xl p-6 glow-border-hover transition-all cursor-pointer group border-[#d69e2e]/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#d69e2e]/15 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#d69e2e]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f0f0f0] group-hover:text-[#d69e2e] transition-colors">
                      Community Board
                    </h3>
                    <p className="text-xs text-[#b0b0b0]">
                      Leave a message on my guestbook
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#b0b0b0] ml-auto group-hover:text-[#d69e2e] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#b0b0b0] leading-relaxed">
                  Want to say hi? Share an idea? Or just leave some kind words? 
                  Head over to the community board and drop a message.
                </p>
              </motion.div>
            </Link>

            {/* Location / Status */}
            <div className="glass-panel rounded-lg p-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#b0b0b0]">
                <MapPin className="w-3.5 h-3.5 text-[#d69e2e]" />
                <span>Open to collaborations</span>
              </div>
              <div className="flex-1 h-px bg-white/10" />
              <div className="flex items-center gap-2 text-xs font-mono text-[#6db33f]">
                <Globe className="w-3.5 h-3.5" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6db33f] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6db33f]" />
                </span>
                Available
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
