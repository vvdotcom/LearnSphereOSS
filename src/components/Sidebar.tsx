// src/components/Sidebar.tsx

import React from 'react';
import { Sparkles, X, LogOut, LucideIcon, ChevronsLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  navigationItems: NavigationItem[];
  currentView: string;
  setCurrentView: (view: string) => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isExpanded,
  setIsExpanded,
  navigationItems,
  currentView,
  setCurrentView,
  handleLogout,
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0d0d0d] border-r border-[#feedd1]/20 z-50 flex flex-col
                    transition-all duration-300 ease-in-out
                    lg:translate-x-0 
                    ${isExpanded ? 'w-80' : 'w-20'}
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header Section */}
        <div className={`p-4 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
          <div className={`flex items-center gap-3 overflow-hidden ${isExpanded ? 'w-auto' : 'w-0'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#ffffff] to-[#fde6c4] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#0d0d0d]" />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-white whitespace-nowrap">{t('nav.learnsphere')}</h2>
              </div>
          </div>
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-stone-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Language Selector (only shows when expanded) */}
        <div className={`px-4 my-2 transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0 h-0'}`}>
          {isExpanded && <LanguageSelector />}
        </div>


        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setSidebarOpen(false);
              }}
              title={isExpanded ? '' : item.label} // Show tooltip when collapsed
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left 
                        ${!isExpanded && 'justify-center'}
                        ${currentView === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-stone-300 hover:bg-white/10 hover:text-white'
                        }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer with Toggle and Logout */}
        <div className="p-4 border-t border-white/10">
          {/* Collapse/Expand Toggle for Desktop */}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            className={`hidden lg:flex w-full items-center text-stone-300 hover:bg-white/10 hover:text-white mb-2 ${!isExpanded && 'justify-center'}`}
          >
            <ChevronsLeft className={`w-5 h-5 transition-transform duration-300 ${!isExpanded && 'rotate-180'}`} />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">Collapse</span>}
          </Button>
          
          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full flex items-center text-red-400 hover:bg-red-500/10 hover:text-red-300 ${!isExpanded && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {isExpanded && <span className="ml-3 font-medium whitespace-nowrap">{t('nav.signout')}</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;