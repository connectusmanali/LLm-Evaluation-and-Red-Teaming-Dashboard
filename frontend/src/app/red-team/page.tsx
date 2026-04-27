"use client";

import { useState } from "react";
import { ShieldAlert, TerminalSquare } from "lucide-react";

export default function RedTeaming() {
  const [targetModel, setTargetModel] = useState("gpt-4o");
  const [scenario, setScenario] = useState("jailbreak");
  const [generating, setGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startAttack = async () => {
    setGenerating(true);
    setLogs([]);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/red-team/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_model: targetModel, scenario: scenario })
      });

      if (!response.body) throw new Error("No readable stream available.");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              setGenerating(false);
              return;
            }
            setLogs((prev) => [...prev, data]);
          }
        }
      }
    } catch (err) {
      console.error(err);
      setLogs((prev) => [...prev, "[ERROR] Internal connection failed."]);
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent flex items-center gap-3">
          <ShieldAlert size={32} className="text-red-500 text-shadow-[0_0_15px_rgba(239,68,68,0.5)]" /> Automated Red-Teaming
        </h1>
        <p className="text-gray-400 mt-2">Generate adversarial payloads to stress-test your models.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass p-6 rounded-xl flex flex-col gap-6 shadow-xl border-red-500/10">
          <div>
             <label className="block text-sm font-medium text-gray-400 mb-2">Target Model</label>
              <select 
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="llama-3">Llama 3</option>
              </select>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-400 mb-2">Attack Scenario</label>
              <select 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="jailbreak">System Instruction Jailbreak</option>
                <option value="exfiltration">Data Exfiltration</option>
                <option value="bias">Bias Probing</option>
              </select>
          </div>

          <button 
            disabled={generating}
            onClick={startAttack}
            className="mt-auto w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            {generating ? "Attack in progress..." : "Launch Red Team"}
          </button>
        </div>

        <div className="lg:col-span-2 bg-[#0a0a0f] border border-white/10 rounded-xl p-4 font-mono text-sm relative overflow-hidden h-[500px] flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <TerminalSquare size={150} />
          </div>
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
             <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>
             <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></span>
             <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
             <span className="ml-2 text-gray-500">attack_terminal.sh</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 relative z-10 text-green-400">
             {logs.length === 0 && <p className="text-gray-600 animate-pulse">Waiting for task initialization...</p>}
             {logs.map((log, i) => (
                <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                   <span className="text-green-600">{'>'}</span>
                   <span className={log.includes('[ALERT]') ? 'text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]' : ''}>{log}</span>
                </div>
             ))}
             {generating && (
                 <div className="flex gap-3 animate-pulse">
                   <span className="text-green-600">{'>'}</span>
                   <span className="w-2 h-4 bg-green-400 block mt-0.5"></span>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
