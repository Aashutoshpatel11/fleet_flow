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
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col">

        <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <Truck className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">FleetFlow</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    <Icon 
                    className={`mr-3 h-5 w-5 shrink-0 ${
                        isActive ? 'text-blue-700' : 'text-gray-400'
                    }`} 
                    />
                    {item.name}
                </Link>
                );
            })}
        </nav>

        <div className="border-t border-gray-200 p-4">
            <button 
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
            >
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-700" />
                Sign Out
            </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        
        <header className="h-16 shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-8 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-800">
                {navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
            </h1>
            
            <div className="flex items-center">
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <UserCircle className="h-6 w-6 mr-2 text-gray-400" />
                <span>My Profile</span>
                </button>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
            {children}
        </main>
      </div>
    </div>
  );
}