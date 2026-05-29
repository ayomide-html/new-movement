import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Play,
  FolderTree,
  FileCode,
  Terminal,
  RotateCcw,
  Settings,
  X,
  Loader2,
} from "lucide-react";

interface FileTab {
  name: string;
  language: string;
  code: string;
  icon: string;
}

const starterFiles: FileTab[] = [
  {
    name: "Main.java",
    language: "java",
    icon: "J",
    code: `public class Main {
    public static void main(String[] args) {
        // Welcome to my code playground
        System.out.println("Hello, World!");
        
        Philosopher p = new Philosopher("Ayo");
        p.think();
    }
}

class Philosopher {
    private String name;
    
    public Philosopher(String name) {
        this.name = name;
    }
    
    public void think() {
        System.out.println(name + ": I think, therefore I code.");
    }
}`,
  },
  {
    name: "app.js",
    language: "javascript",
    icon: "JS",
    code: `// JavaScript playground
function greet(name) {
    return \`Hello, \${name}! Welcome to the logic space.\`;
}

const wisdom = {
    think: () => "Question everything.",
    build: () => "Create with purpose.",
    learn: () => "Stay curious always."
};

console.log(greet("Visitor"));

for (const [key, value] of Object.entries(wisdom)) {
    console.log(\`\${key}: \${value()}\`);
}`,
  },
  {
    name: "main.dart",
    language: "dart",
    icon: "D",
    code: `// Dart playground — Flutter's language
void main() {
  print('Hello from Dart!');
  
  final philosopher = Philosopher('Ayo');
  philosopher.contemplate();
  
  final ideas = [
    'Logic', 'Systems', 'Creativity', 'Discipline'
  ];
  
  for (final idea in ideas) {
    philosopher.explore(idea);
  }
}

class Philosopher {
  final String name;
  
  Philosopher(this.name);
  
  void contemplate() {
    print('\$name: Deep thinking in progress...');
  }
  
  void explore(String concept) {
    print('\$name is exploring: \$concept');
  }
}`,
  },
];

const outputs: Record<string, string> = {
  "Main.java": `> javac Main.java
> Building...
> Compilation successful.

Hello, World!
Ayo: I think, therefore I code.

[Process finished with exit code 0]`,
  "app.js": `> node app.js

Hello, Visitor! Welcome to the logic space.
think: Question everything.
build: Create with purpose.
learn: Stay curious always.

[Process finished with exit code 0]`,
  "main.dart": `> dart main.dart
> Building...
> Compilation successful.

Hello from Dart!
Ayo: Deep thinking in progress...
Ayo is exploring: Logic
Ayo is exploring: Systems
Ayo is exploring: Creativity
Ayo is exploring: Discipline

[Process finished with exit code 0]`,
};

export function CodePlayground() {
  const [activeTab, setActiveTab] = useState(0);
  const [code, setCode] = useState(starterFiles.map((f) => f.code));
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [progress, setProgress] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentFile = starterFiles[activeTab];

  const runCode = useCallback(() => {
    setIsRunning(true);
    setTerminalOutput("");
    setProgress(0);

    const steps = [
      `> Compiling ${currentFile.name}...`,
      `> ${currentFile.language === "java" ? "javac" : currentFile.language === "javascript" ? "node" : "dart"} ${currentFile.name}`,
      `> Building...`,
      `> Compilation successful.\n`,
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setTerminalOutput((prev) => prev + steps[stepIndex] + "\n");
        setProgress(((stepIndex + 1) / steps.length) * 100);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Type out the result character by character
        const resultText = outputs[currentFile.name] || "No output configured.";
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex < resultText.length) {
            setTerminalOutput(resultText.slice(0, charIndex + 1));
            charIndex++;
            if (terminalRef.current) {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
          } else {
            clearInterval(typeInterval);
            setIsRunning(false);
            setProgress(100);
          }
        }, 8);
      }
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 600);
  }, [activeTab, currentFile]);

  const resetCode = () => {
    setCode((prev) => {
      const next = [...prev];
      next[activeTab] = starterFiles[activeTab].code;
      return next;
    });
    setTerminalOutput("");
  };

  return (
    <section id="playground" className="py-24 bg-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-[#d69e2e] uppercase tracking-wider">
            &gt; playground.run
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0] mt-2 tracking-tight">
            Code Playground
          </h2>
          <p className="text-sm text-[#b0b0b0] mt-3 max-w-lg mx-auto leading-relaxed">
            Write, compile, and execute. A mini IDE right in your browser.
          </p>
        </motion.div>

        {/* IDE Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: "#1e1e1e" }}
        >
          {/* Title Bar */}
          <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b0b0b0]">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Code Playground</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetCode}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#b0b0b0]" />
              </button>
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Toggle Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-[#b0b0b0]" />
              </button>
              <Settings className="w-3.5 h-3.5 text-[#b0b0b0] cursor-not-allowed" />
            </div>
          </div>

          {/* Main Area */}
          <div className="flex flex-col lg:flex-row" style={{ height: "600px" }}>
            {/* Sidebar */}
            <div className="w-full lg:w-56 bg-[#252526] border-r border-white/10 flex flex-col">
              <div className="p-3 text-[10px] font-mono text-[#b0b0b0] uppercase tracking-wider">
                Explorer
              </div>
              <div className="flex-1 px-2 space-y-0.5">
                {starterFiles.map((file, i) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveTab(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all ${
                      activeTab === i
                        ? "bg-white/10 text-[#f0f0f0]"
                        : "text-[#b0b0b0] hover:bg-white/5 hover:text-[#f0f0f0]"
                    }`}
                  >
                    <FileCode className="w-4 h-4" />
                    <span className="text-xs font-mono">{file.name}</span>
                    {activeTab === i && (
                      <X
                        className="w-3 h-3 ml-auto opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Run Button */}
              <div className="p-3 border-t border-white/10">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono font-semibold transition-all ${
                    isRunning
                      ? "bg-[#6db33f]/20 text-[#6db33f] cursor-not-allowed"
                      : "bg-[#d69e2e] text-[#171717] hover:bg-[#e0a83a] active:scale-[0.98]"
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Compiling...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      Run Code
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Editor + Terminal */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Tabs */}
              <div className="h-9 bg-[#252526] flex items-center border-b border-white/10 overflow-x-auto">
                {starterFiles.map((file, i) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-4 h-full text-xs font-mono border-r border-white/5 transition-all whitespace-nowrap ${
                      activeTab === i
                        ? "bg-[#1e1e1e] text-[#f0f0f0] border-t-2 border-t-[#d69e2e]"
                        : "text-[#b0b0b0] hover:bg-[#2d2d2e]"
                    }`}
                  >
                    <span
                      className="text-[10px] font-bold w-4 h-4 rounded flex items-center justify-center"
                      style={{
                        backgroundColor:
                          file.language === "java"
                            ? "#e76f0030"
                            : file.language === "javascript"
                            ? "#f7df1e30"
                            : "#00b4ab30",
                        color:
                          file.language === "java"
                            ? "#e76f00"
                            : file.language === "javascript"
                            ? "#f7df1e"
                            : "#00b4ab",
                      }}
                    >
                      {file.icon}
                    </span>
                    {file.name}
                    {activeTab === i && isRunning && (
                      <Loader2 className="w-3 h-3 animate-spin text-[#6db33f]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Editor */}
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  language={currentFile.language}
                  value={code[activeTab]}
                  onChange={(value) => {
                    setCode((prev) => {
                      const next = [...prev];
                      next[activeTab] = value || "";
                      return next;
                    });
                  }}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "Geist Mono, monospace",
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    folding: true,
                    renderLineHighlight: "all",
                    matchBrackets: "always",
                    tabSize: 4,
                  }}
                />
              </div>

              {/* Terminal */}
              <AnimatePresence>
                {showTerminal && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "200px" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 overflow-hidden"
                  >
                    {/* Terminal header */}
                    <div className="h-7 bg-[#252526] flex items-center justify-between px-3 border-b border-white/5">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#b0b0b0]">
                        <Terminal className="w-3 h-3" />
                        <span>Output</span>
                      </div>
                      {isRunning && (
                        <div className="flex-1 mx-4 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#6db33f]"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      )}
                    </div>
                    {/* Terminal body */}
                    <div
                      ref={terminalRef}
                      className="h-[calc(100%-28px)] bg-[#0e0e0e] p-3 overflow-y-auto font-mono text-xs"
                    >
                      {terminalOutput ? (
                        <pre className="text-[#d4d4d4] whitespace-pre-wrap leading-relaxed">
                          {terminalOutput}
                        </pre>
                      ) : (
                        <span className="text-[#6a9955]">
                          // Click "Run Code" to see output
                        </span>
                      )}
                      {isRunning && (
                        <span className="inline-block w-2 h-4 bg-[#d69e2e] ml-0.5 animate-blink align-middle" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
