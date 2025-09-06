// src/App.tsx

import React, { useState } from 'react';
import { Sparkles, Menu, Brain, Map, FileText, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Solver from './components/Solver';
import LearningRoad from './components/LearningRoad';
import ExamSimulator from './components/ExamSimulator';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar'; // Import the new Sidebar component

// A type for the different views in the app for better type safety
type AppView = 'learnsphere' | 'solver' | 'learningroad' | 'examsimulator' | 'settings';

function App() {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('learnsphere');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // For desktop expand/collapse

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsLoggedIn(true);
    setCurrentView('solver'); // Default view after login
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('learnsphere');
    setSidebarOpen(false);
  };

  const navigationItems = [
    { id: 'solver', label: t('nav.solver'), icon: Brain },
    { id: 'learningroad', label: t('nav.learningroad'), icon: Map },
    { id: 'examsimulator', label: 'Exam Simulator', icon: FileText },
    { id: 'settings', label: t('nav.settings'), icon: SettingsIcon },
  ];
  
  // A map of view keys to their corresponding components for cleaner rendering
  const viewComponents: Record<AppView, JSX.Element | null> = {
    learnsphere: null, // This is the default state, handled by the login page
    solver: <Solver />,
    learningroad: <LearningRoad />,
    examsimulator: <ExamSimulator />,
    settings: <Settings />
  };

  // Renders the main application layout when the user is logged in
  if (isLoggedIn) {
    const CurrentViewComponent = viewComponents[currentView];
    
    return (
       <div className="min-h-screen bg-[#111111] text-white flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          navigationItems={navigationItems}
          currentView={currentView}
          setCurrentView={(view) => setCurrentView(view as AppView)}
          handleLogout={handleLogout}
        />
        <main className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? 'lg:ml-80' : 'lg:ml-20'}`}>
          <div className="lg:hidden fixed top-4 left-4 z-30">
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-sm text-[#0d0d0d] border-stone-300 hover:bg-white"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          {CurrentViewComponent}
        </main>
      </div>
    );
  }

  // Renders the login page when the user is not logged in
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Informational Content */}
      <div className="flex-1 bg-white flex flex-col">
        <header className="p-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0d0d0d] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-stone-800">{t('nav.learnsphere')}</h1>
            </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md text-center">
                <img
                    src="https://i.imgur.com/57uVCPY.gif"
                    alt="AI-powered learning platform"
                    className="w-full h-auto object-cover rounded-2xl shadow-xl mb-8"
                />
                <h2 className="text-3xl font-bold text-stone-900 mb-4">{t('learnsphere.title')}</h2>
                <p className="text-stone-600 text-lg">{t('learnsphere.description')}</p>
            </div>
        </main>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-full lg:w-96 bg-[#0d0d0d] text-white flex flex-col   p-8">
        <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-6">{t('auth.signin')}</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <LanguageSelector />
              </div>
              <Button
                type="submit"
                disabled={isLoggingIn}
                onClick={handleLogin} 
                className="w-full bg-white text-[#0d0d0d] py-3 rounded-lg font-semibold hover:bg-[#fde6c4] transition-all duration-300 disabled:opacity-70"
              >
                {isLoggingIn ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>{t('auth.signing.in')}</span>
                  </div>
                ) : (
                  t('auth.signin')
                )}
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;