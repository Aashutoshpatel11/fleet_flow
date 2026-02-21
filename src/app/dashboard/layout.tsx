'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    Truck, 
    MapPin, 
    Wrench, 
    Receipt, 
    Users, 
    BarChart3, 
    LogOut,
    UserCircle
} from 'lucide-react';
import { apiClient } from '@/lib/axios';

const navigation = [
    { 
        name: 'Command Center', 
        href: '/dashboard', 
        icon: LayoutDashboard 
    },
    { 
        name: 'Vehicle Registry', 
        href: '/dashboard/vehicles', 
        icon: Truck 
    },
    { 
        name: 'Trip Dispatcher', 
        href: '/dashboard/dispatch', 
        icon: MapPin 
    },
    { 
        name: 'Maintenance Logs', 
        href: '/dashboard/maintenance', 
        icon: Wrench 
    },
    { 
        name: 'Expenses & Fuel', 
        href: '/dashboard/expenses', 
        icon: Receipt 
    },
    { 
        name: 'Driver Profiles', 
        href: '/dashboard/drivers', 
        icon: Users 
    },
    { 
        name: 'Analytics & Reports', 
        href: '/dashboard/analytics', 
        icon: BarChart3 
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await apiClient.post('/auth/logout');
            router.push('/login');
        } catch (error) {
            console.error('Failed to logout', error);
            document.cookie = "fleet_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push('/login');
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden selection:bg-[#FFC229] selection:text-[#4A2B5E] text-white relative">
            
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FFC229]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4A2B5E]/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <aside className="w-72 shrink-0 border-r border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl flex flex-col relative z-20">

                <div className="flex h-24 items-center px-8 border-b border-white/5">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFC229]/10 mr-4 border border-[#FFC229]/20 shadow-[0_0_15px_rgba(255,194,41,0.15)]">
                        <Truck className="h-5 w-5 text-[#FFC229]" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">FleetFlow</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                            isActive 
                                ? 'bg-[#FFC229] text-[#1F2937] shadow-lg shadow-[#FFC229]/20 translate-x-1' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                            }`}
                        >
                            <Icon 
                            className={`mr-4 h-5 w-5 shrink-0 transition-transform duration-300 ${
                                isActive ? 'text-[#1F2937]' : 'text-gray-500 group-hover:text-[#FFC229] group-hover:scale-110'
                            }`} 
                            />
                            {item.name}
                        </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-white/5 p-4 bg-[#0a0a0a]/80 backdrop-blur-md">
                    <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3.5 text-sm font-bold text-gray-500 rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
                    >
                        <LogOut className="mr-4 h-5 w-5 text-gray-600 group-hover:text-red-400 transition-colors" />
                        System Logout
                    </button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden relative z-10">
                
                <header className="h-24 shrink-0 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-10 relative z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-[#4A2B5E] rounded-full"></div>
                        <h1 className="text-2xl font-bold text-white tracking-wide">
                            {navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>
                    
                    <div className="flex items-center">
                        <button className="flex items-center px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 hover:border-[#FFC229]/50 transition-all duration-300 group shadow-sm">
                            <UserCircle className="h-5 w-5 mr-2 text-gray-400 group-hover:text-[#FFC229] transition-colors" />
                            <span>My Profile</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}