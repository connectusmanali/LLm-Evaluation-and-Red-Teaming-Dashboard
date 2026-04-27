"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Terminal, Activity, ShieldAlert, Settings } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Prompts", href: "/prompts", icon: Terminal },
    { name: "Evaluations", href: "/evaluations", icon: Activity },
    { name: "Red Teaming", href: "/red-team", icon: ShieldAlert },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen border-r border-white/10 glass flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          LLM Eval Pro
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
