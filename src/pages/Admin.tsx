import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Navigation } from "@/components/Navigation";
import {
  ArrowLeft,
  Shield,
  Users,
  Mail,
  MessageSquare,
  Trash2,
  Pin,
  PinOff,
  Loader2,
  BarChart3,
  UserCheck,
} from "lucide-react";

export default function Admin() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [authLoading, isAdmin, navigate]);

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: isAdmin,
  });
  const { data: contactsData } = trpc.admin.contacts.useQuery(undefined, {
    enabled: isAdmin,
  });
  const { data: messagesData } = trpc.admin.messages.useQuery(undefined, {
    enabled: isAdmin,
  });
  const { data: usersData } = trpc.admin.users.useQuery(undefined, {
    enabled: isAdmin,
  });

  const utils = trpc.useUtils();

  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => utils.admin.contacts.invalidate(),
  });
  const deleteMessage = trpc.message.delete.useMutation({
    onSuccess: () => {
      utils.admin.messages.invalidate();
      utils.message.list.invalidate();
    },
  });
  const pinMessage = trpc.message.pin.useMutation({
    onSuccess: () => {
      utils.admin.messages.invalidate();
      utils.message.list.invalidate();
    },
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d69e2e] animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#171717]">
      <Navigation />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
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

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d69e2e]/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#d69e2e]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#f0f0f0] tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-xs font-mono text-[#b0b0b0]">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "OAuth Users",
              value: stats?.totalOAuthUsers ?? 0,
              icon: Users,
              color: "#569cd6",
            },
            {
              label: "Local Users",
              value: stats?.totalLocalUsers ?? 0,
              icon: UserCheck,
              color: "#6db33f",
            },
            {
              label: "Contacts",
              value: stats?.totalContacts ?? 0,
              icon: Mail,
              color: "#d69e2e",
            },
            {
              label: "Messages",
              value: stats?.totalMessages ?? 0,
              icon: MessageSquare,
              color: "#805ad5",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-xl p-4 glow-border-hover"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <BarChart3 className="w-3.5 h-3.5 text-[#505050]" />
              </div>
              <div className="text-2xl font-bold text-[#f0f0f0]">{stat.value}</div>
              <div className="text-[10px] font-mono text-[#b0b0b0] uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#d69e2e]" />
            Contact Submissions
          </h2>

          <div className="glass-panel rounded-xl overflow-hidden">
            {!contactsData || contactsData.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#b0b0b0]">
                No contact submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#252526]">
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Message
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsData.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 text-[#f0f0f0]">{contact.name}</td>
                        <td className="px-4 py-3 text-[#b0b0b0] font-mono text-xs">
                          {contact.email}
                        </td>
                        <td className="px-4 py-3 text-[#b0b0b0]">
                          {contact.subject || "—"}
                        </td>
                        <td className="px-4 py-3 text-[#b0b0b0] max-w-xs truncate">
                          {contact.message}
                        </td>
                        <td className="px-4 py-3 text-[#505050] text-xs font-mono whitespace-nowrap">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => deleteContact.mutate({ id: contact.id })}
                            className="p-1.5 rounded hover:bg-red-500/10 text-[#b0b0b0] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* Community Messages Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#805ad5]" />
            Community Messages
          </h2>

          <div className="glass-panel rounded-xl overflow-hidden">
            {!messagesData || messagesData.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#b0b0b0]">
                No community messages yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#252526]">
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Content
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {messagesData.map((msg) => (
                      <tr
                        key={msg.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 text-[#f0f0f0]">{msg.name}</td>
                        <td className="px-4 py-3 text-[#b0b0b0] max-w-xs truncate">
                          {msg.content}
                        </td>
                        <td className="px-4 py-3">
                          {msg.isPinned ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#d69e2e] bg-[#d69e2e]/10 px-2 py-0.5 rounded-full">
                              <Pin className="w-2.5 h-2.5" />
                              Pinned
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[#505050]">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#505050] text-xs font-mono whitespace-nowrap">
                          {formatDate(msg.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() =>
                                pinMessage.mutate({
                                  id: msg.id,
                                  isPinned: !msg.isPinned,
                                })
                              }
                              className="p-1.5 rounded hover:bg-[#d69e2e]/10 text-[#b0b0b0] hover:text-[#d69e2e] transition-colors"
                              title={msg.isPinned ? "Unpin" : "Pin"}
                            >
                              {msg.isPinned ? (
                                <PinOff className="w-3.5 h-3.5" />
                              ) : (
                                <Pin className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => deleteMessage.mutate({ id: msg.id })}
                              className="p-1.5 rounded hover:bg-red-500/10 text-[#b0b0b0] hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#569cd6]" />
            Registered Users
          </h2>

          <div className="glass-panel rounded-xl overflow-hidden">
            {(!usersData ||
              (usersData.oauthUsers.length === 0 &&
                usersData.localUsers.length === 0)) && (
              <div className="p-8 text-center text-sm text-[#b0b0b0]">
                No registered users yet.
              </div>
            )}

            {usersData && usersData.oauthUsers.length > 0 && (
              <div className="overflow-x-auto">
                <div className="px-4 py-2 bg-[#252526] text-xs font-mono text-[#b0b0b0] uppercase tracking-wider">
                  OAuth Users
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Name
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Email
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Role
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.oauthUsers.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="px-4 py-2 text-[#f0f0f0]">{u.name || "—"}</td>
                        <td className="px-4 py-2 text-[#b0b0b0] font-mono text-xs">
                          {u.email || "—"}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              u.role === "admin"
                                ? "bg-[#d69e2e]/10 text-[#d69e2e]"
                                : "bg-white/5 text-[#b0b0b0]"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-[#505050] text-xs font-mono">
                          {formatDate(u.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {usersData && usersData.localUsers.length > 0 && (
              <div className="overflow-x-auto">
                <div className="px-4 py-2 bg-[#252526] text-xs font-mono text-[#b0b0b0] uppercase tracking-wider border-t border-white/10">
                  Local Users
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Username
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Display Name
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Role
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-mono text-[#505050]">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.localUsers.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="px-4 py-2 text-[#f0f0f0] font-mono text-xs">
                          {u.username}
                        </td>
                        <td className="px-4 py-2 text-[#b0b0b0]">
                          {u.displayName || "—"}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              u.role === "admin"
                                ? "bg-[#d69e2e]/10 text-[#d69e2e]"
                                : "bg-white/5 text-[#b0b0b0]"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-[#505050] text-xs font-mono">
                          {formatDate(u.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
