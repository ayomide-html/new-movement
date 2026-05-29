import { Code2, Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-[#171717] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#d69e2e] to-[#a4408c] flex items-center justify-center">
              <Code2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-mono text-[#b0b0b0]">
              ayo.dev
            </span>
          </div>

          <p className="text-xs font-mono text-[#b0b0b0] flex items-center gap-1.5">
            Built with
            <span className="text-[#d69e2e]">logic</span>,
            <span className="text-[#a4408c]">curiosity</span>,
            and
            <Coffee className="w-3 h-3 text-[#ce9178]" />
            caffeine.
          </p>

          <p className="text-[10px] font-mono text-[#505050]">
            &copy; {new Date().getFullYear()} Ayo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
