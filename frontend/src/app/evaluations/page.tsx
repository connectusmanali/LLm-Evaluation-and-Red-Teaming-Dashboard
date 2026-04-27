"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Settings2, Activity, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Evaluations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/evaluations/");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Evaluation Logs
          </h1>
          <p className="text-gray-400 mt-2">Explore, filter, and drill down into all past test runs.</p>
        </div>
        <div className="flex gap-3">
           <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors text-white text-sm cursor-pointer">
             <Settings2 size={16} /> Filters
           </button>
           <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white font-medium text-sm transition-colors cursor-pointer shadow-lg">
             Export CSV
           </button>
        </div>
      </header>

      <div className="glass rounded-xl overflow-hidden border border-white/10 shadow-lg relative">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
           <Search size={18} className="text-gray-400" />
           <input 
             type="text" 
             placeholder="Search by model, metric, or content..." 
             className="bg-transparent border-none text-white focus:outline-none flex-1 text-sm placeholder-gray-500"
           />
        </div>
        
        {loading ? (
           <div className="p-16 text-center text-gray-500 flex flex-col items-center">
              <Activity className="animate-spin mb-3 text-purple-500" size={32} />
              Loading evaluations from database...
           </div>
        ) : data.length === 0 ? (
           <div className="p-16 text-center text-gray-500 text-sm">
             No evaluations found. Go to the Prompts tab to run a new test!
           </div>
        ) : (
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-black/40 text-gray-400">
                 <tr>
                   <th className="p-4 font-medium tracking-wider text-xs">DATE</th>
                   <th className="p-4 font-medium tracking-wider text-xs">MODEL</th>
                   <th className="p-4 font-medium tracking-wider text-xs">STATUS</th>
                   <th className="p-4 font-medium tracking-wider text-xs">TOXICITY</th>
                   <th className="p-4 font-medium tracking-wider text-xs w-full">RESPONSE SNIPPET</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {data.map((row: any) => (
                   <tr key={row.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                     <td className="p-4 text-gray-400">{new Date(row.created_at).toLocaleDateString()}</td>
                     <td className="p-4"><span className="bg-white/10 px-2.5 py-1 rounded-md text-xs text-gray-300 font-medium">{row.model_name}</span></td>
                     <td className="p-4">
                        {row.metrics?.pass ? (
                          <span className="flex w-min items-center gap-1.5 text-green-400 text-xs font-bold bg-green-400/10 px-2.5 py-1 rounded-md"><CheckCircle2 size={14}/> PASS</span>
                        ) : (
                          <span className="flex w-min items-center gap-1.5 text-red-400 text-xs font-bold bg-red-400/10 px-2.5 py-1 rounded-md"><AlertCircle size={14}/> FAIL</span>
                        )}
                     </td>
                     <td className="p-4 font-mono text-gray-300">{(row.metrics?.toxicity * 100)?.toFixed(1)}%</td>
                     <td className="p-4 text-gray-500 max-w-[400px] truncate group-hover:text-gray-300 transition-colors">
                       {row.response_text}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
}
