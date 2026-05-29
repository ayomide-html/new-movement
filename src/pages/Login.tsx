import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import {
  Code2,
  UserPlus,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
} from "lucide-react";

// ...existing code...

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    displayName: "",
    email: "",
  });
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      loginMutation.mutate({
        username: form.username,
        password: form.password,
      });
    } else {
      registerMutation.mutate({
        username: form.username,
        password: form.password,
        displayName: form.displayName || undefined,
        email: form.email || undefined,
      });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center px-4 relative">
      {/* Ambient */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d69e2e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a4408c]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#b0b0b0] hover:text-[#d69e2e] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Portfolio
        </Link>

        {/* Card */}
        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10">
          {/* Title Bar */}
          <div className="h-10 bg-[#252526] flex items-center px-4 border-b border-white/10">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-mono text-[#b0b0b0]">
              auth.{mode === "login" ? "login" : "register"}.ts
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d69e2e] to-[#a4408c] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#f0f0f0]">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-xs font-mono text-[#b0b0b0]">
                  {mode === "login"
                    ? "Sign in to your account"
                    : "Join the community"}
                </p>
              </div>
            </div>

// ...existing code...

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] font-mono text-[#505050] uppercase">
                or use username
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-[#b0b0b0] uppercase tracking-wider mb-1.5 block">
                  Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                  placeholder="your_username"
                />
              </div>

              {mode === "register" && (
                <>
                  <div>
                    <label className="text-[10px] font-mono text-[#b0b0b0] uppercase tracking-wider mb-1.5 block">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={form.displayName}
                      onChange={(e) =>
                        setForm({ ...form, displayName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                      placeholder="Ayo (optional)"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#b0b0b0] uppercase tracking-wider mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                      placeholder="you@example.com (optional)"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-[10px] font-mono text-[#b0b0b0] uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                    className="w-full px-3 py-2.5 pr-10 bg-[#252526] border border-white/10 rounded-md text-sm text-[#f0f0f0] font-mono focus:outline-none focus:border-[#d69e2e]/50 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#505050] hover:text-[#b0b0b0] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#d69e2e] text-[#171717] rounded-md text-sm font-mono font-semibold hover:bg-[#e0a83a] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : mode === "login" ? (
                  <>
                    <KeyRound className="w-4 h-4" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-5 text-center">
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
                className="text-xs font-mono text-[#b0b0b0] hover:text-[#d69e2e] transition-colors"
              >
                {mode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
