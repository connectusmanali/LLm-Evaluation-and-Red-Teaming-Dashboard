"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      <div className="w-[400px] glass p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col items-center animate-in zoom-in-95 duration-500">
        <div className="mb-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              LLM Eval Pro
            </h1>
            <p className="text-gray-400 text-sm text-center">
              {isLogin ? "Welcome back! Login to your dashboard." : "Create an account to secure your models."}
            </p>
        </div>

        <form onSubmit={handleAuth} className="w-full space-y-5">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
             </div>
             <input 
               type="email" 
               required
               placeholder="name@company.com" 
               className="w-full pl-10 bg-black/40 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
             />
          </div>

          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
             </div>
             <input 
               type="password" 
               required
               placeholder="••••••••" 
               className="w-full pl-10 bg-black/40 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
             />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-6 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
          >
            {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span 
            className="text-purple-400 font-medium cursor-pointer hover:text-purple-300 transition-colors"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
