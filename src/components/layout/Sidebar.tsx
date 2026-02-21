'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { 
    name: 'Command Center', 
    href: '/dashboard', 
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
  },
  { 
    name: 'Vehicles', 
    href: '/dashboard/vehicles', 
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' 
  },
  { 
    name: 'Trips', 
    href: '/dashboard/trips', 
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' 
  },
  { 
    name: 'Maintenance', 
    href: '/dashboard/maintenance', 
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' 
  },
  { 
    name: 'Expenses', 
    href: '/dashboard/expenses', 
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    name: 'Drivers', 
    href: '/dashboard/drivers', 
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-[#0a0a0a]/50 backdrop-blur-xl flex flex-col min-h-screen border-r border-white/5 transition-all duration-500 relative z-20 selection:bg-[#FFC229] selection:text-[#4A2B5E]">
      
      <div className="absolute top-0 left-0 w-full h-48 bg-[#FFC229]/5 blur-[60px] -z-10 pointer-events-none"></div>

      <div className="h-24 flex items-center px-8 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFC229]/10 border border-[#FFC229]/20 shadow-[0_0_15px_rgba(255,194,41,0.15)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC229] animate-pulse"></span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">FleetFlow</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-2 relative z-10 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#FFC229] text-[#1F2937] shadow-lg shadow-[#FFC229]/20 translate-x-1' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
              }`}
            >
              <svg 
                className={`w-5 h-5 mr-4 shrink-0 transition-transform duration-300 ${
                  isActive ? 'text-[#1F2937]' : 'text-gray-500 group-hover:text-[#FFC229] group-hover:scale-110'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <button className="flex items-center w-full px-4 py-3.5 text-sm font-bold text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300 group">
          <svg 
            className="w-5 h-5 mr-4 text-gray-600 group-hover:text-red-400 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          System Logout
        </button>
      </div>
    </aside>
  );
}