"use client";

import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 mt-2">Configure API integrations and platform defaults.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl space-y-6 shadow-lg border border-white/10">
          <div>
            <h3 className="text-lg font-medium text-white mb-1">API Integrations</h3>
            <p className="text-sm text-gray-500 mb-4">Add your API keys to evaluate live models.</p>
            
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">OpenAI API Key</label>
                <input 
                  type="password" 
                  defaultValue="sk-................................"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Anthropic API Key</label>
                <input 
                  type="password" 
                  placeholder="Enter Anthropic Key..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
            </div>
          </div>

          <hr className="border-white/10" />

          <div>
             <h3 className="text-lg font-medium text-white mb-2">Evaluation Defaults</h3>
             <div className="space-y-4 mt-2">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Toxicity Threshold</label>
                    <input 
                      type="number" 
                      defaultValue="0.5"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    />
                 </div>
             </div>
          </div>

          <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 w-full cursor-pointer">
            <Save size={18} /> Save Configurations
          </button>
        </div>
      </div>
    </div>
  );
}
