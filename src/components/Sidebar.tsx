import React from 'react';
import Logo from './Logo';
import { 
  BookOpen, 
  Library, 
  TrendingUp, 
  Compass, 
  Settings, 
  LogOut, 
  Award, 
  Flame, 
  Target,
  Search,
  BookMarked
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  username: string;
  streakDays: number;
  dailyGoalPages: number;
  totalLoans: number;
  totalHolds: number;
  onLogout: () => void;
}

export default function Sidebar({
  currentView,
  setCurrentView,
  username,
  streakDays,
  dailyGoalPages,
  totalLoans,
  totalHolds,
  onLogout
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'shelf', label: 'My book Shelf', icon: Library },
    { id: 'insights', label: 'Reading Insights', icon: TrendingUp },
    { id: 'discover', label: 'Explore Stacks', icon: Compass }
  ];

  return (
    <aside className="w-64 bg-[#0a0e11] border-r border-[#c5a85c]/10 h-screen flex flex-col justify-between select-none shrink-0 text-gray-300">
      {/* Top Header & Stamp */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Logo size={42} className="!mb-0 scale-75" />
          <div>
            <span className="font-serif text-[13px] tracking-[0.22em] font-extrabold text-[#dfba6b] block">AUSTEN</span>
            <span className="font-serif text-[11px] tracking-[0.22em] font-light text-gray-400 block -mt-1">& ALCOTT</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase block mb-3 px-3">
            ARCHIVAL CONTROLS
          </span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded font-serif text-xs tracking-wider cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-[#c5a85c]/10 text-[#dfba6b] font-semibold border-l-2 border-[#c5a85c]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-[#dfba6b]' : 'text-gray-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Reading Statistics Box */}
      <div className="px-6 py-4 mx-4 bg-[#11171d] border border-[#c5a85c]/10 rounded-lg shadow-lg">
        <span className="font-mono text-[8px] tracking-widest text-[#c5a85c] uppercase block mb-3">
          PERSONAL STATS
        </span>
        
        {/* Streak element */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-amber-500 animate-pulse" />
            <span className="font-sans text-gray-400">Streak:</span>
          </div>
          <span className="font-serif font-bold text-[#f4edd9]">{streakDays} days</span>
        </div>

        {/* Daily Goal Progress */}
        <div className="space-y-1 mb-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-[#c5a85c]" />
              <span className="font-sans text-gray-400">Daily Goal:</span>
            </div>
            <span className="font-mono font-medium text-[11px] text-gray-300">{dailyGoalPages} pgs</span>
          </div>
        </div>

        {/* Status Pills Summary */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#c5a85c]/5 text-[10px] text-center font-mono">
          <div className="bg-[#0a0e11] p-1.5 rounded border border-[#c5a85c]/5">
            <span className="text-gray-500 block">LOANS</span>
            <span className="text-[#dfba6b] font-bold text-xs">{totalLoans}</span>
          </div>
          <div className="bg-[#0a0e11] p-1.5 rounded border border-[#c5a85c]/5">
            <span className="text-gray-500 block">HOLDS</span>
            <span className="text-[#dfba6b] font-bold text-xs">{totalHolds}</span>
          </div>
        </div>
      </div>

      {/* Bottom Profile and Action Item */}
      <div className="p-4 border-t border-[#c5a85c]/10 flex flex-col gap-3">
        {/* User Card */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9b8034] to-[#dfba6b] flex items-center justify-center font-serif text-xs font-bold text-[#0c1013] shadow-[0_2px_10px_rgba(197,168,92,0.3)]">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-mono tracking-wider font-semibold text-[#f4edd9] block truncate">
                Patron {username}
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500 block truncate">
                Verified Guild
              </span>
            </div>
          </div>
          
          <button
            id="sidebar-logout"
            onClick={onLogout}
            title="Relock Vault"
            className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
