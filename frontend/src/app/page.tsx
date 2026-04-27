"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'GPT-4o', passRate: 98, toxicity: 0.02 },
  { name: 'Claude 3.5 Sonnet', passRate: 99, toxicity: 0.01 },
  { name: 'Llama 3', passRate: 92, toxicity: 0.06 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">Monitor your models' safety metrics and performance across environments.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
          <h3 className="text-gray-400 font-medium mb-1">Total Prompts Evaluated</h3>
          <p className="text-4xl font-bold text-white drop-shadow-md">12,450</p>
        </div>
        <div className="glass p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
          <h3 className="text-gray-400 font-medium mb-1">Avg Toxicity Score</h3>
          <p className="text-4xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">0.03</p>
        </div>
        <div className="glass p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
          <h3 className="text-gray-400 font-medium mb-1">Red-Team Incidents</h3>
          <p className="text-4xl font-bold text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]">24</p>
        </div>
      </div>

      <div className="glass p-6 flex flex-col items-center justify-center rounded-xl h-[400px]">
        <h3 className="text-xl font-bold self-start mb-6">Model Pass Rate Comparison</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
            <XAxis dataKey="name" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(40, 42, 54, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="passRate" fill="#a855f7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
