import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Key,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Lock,
  Unlock,
  HardDrive,
  Cloud,
  Zap,
  Clock,
  Target,
  BookOpen,
  Brain,
  Award,
  BarChart3,
  FileText,
  Image,
  Mic,
  Camera,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import LanguageSelector from './LanguageSelector';

const Settings = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<'profile' | 'preferences' | 'data' | 'advanced'>('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sound: true,
    desktop: false
  });
  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analytics: false,
    sharing: false
  });
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    fontSize: 'medium',
    animations: true,
    compactMode: false
  });
  const [performance, setPerformance] = useState({
    autoSave: true,
    caching: true,
    preload: false,
    compression: true
  });

  const settingSections = [
    {
      id: 'profile',
      label: 'Profile & Account',
      icon: User,
      description: 'Manage your personal information and account settings'
    }
  ];

  const handleToggle = (category: string, setting: string) => {
    switch (category) {
      case 'notifications':
        setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
        break;
      case 'privacy':
        setPrivacy(prev => ({ ...prev, [setting]: !prev[setting] }));
        break;
      case 'appearance':
        setAppearance(prev => ({ ...prev, [setting]: !prev[setting] }));
        break;
      case 'performance':
        setPerformance(prev => ({ ...prev, [setting]: !prev[setting] }));
        break;
    }
  };

  const handleSelectChange = (category: string, setting: string, value: string) => {
    switch (category) {
      case 'appearance':
        setAppearance(prev => ({ ...prev, [setting]: value }));
        break;
    }
  };

  const ToggleSwitch = ({ enabled, onToggle, label, description }: {
    enabled: boolean;
    onToggle: () => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="text-[#ffffff] font-medium">{label}</div>
        {description && <div className="text-sm text-stone-400">{description}</div>}
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-[#ffffff]' : 'bg-stone-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-[#0d0d0d] transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SettingCard = ({ children, title, icon: Icon }: {
    children: React.ReactNode;
    title: string;
    icon: React.ComponentType<any>;
  }) => (
    <div className="bg-stone-900/50 rounded-2xl p-6 shadow-lg border border-[#ffffff]/20 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#ffffff] to-[#fde6c4] rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#0d0d0d]" />
        </div>
        <h3 className="text-xl font-bold text-[#ffffff]">{title}</h3>
      </div>
      {children}
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Personal Information" icon={User}>
        <div className="space-y-4">
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-2 block">Full Name</Label>
            <Input
              defaultValue="Demo User"
              className="bg-stone-800/60 border-[#ffffff]/40 text-[#ffffff] rounded-xl"
            />
          </div>
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-2 block">Email Address</Label>
            <Input
              defaultValue="demo@learnsphere.com"
              type="email"
              className="bg-stone-800/60 border-[#ffffff]/40 text-[#ffffff] rounded-xl"
            />
          </div>
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-2 block">Learning Goals</Label>
            <textarea
              defaultValue="Improve problem-solving skills and academic performance"
              className="w-full h-24 bg-stone-800/60 border-[#ffffff]/40 text-[#ffffff] rounded-xl p-3 focus:ring-2 focus:ring-[#ffffff]/60 focus:border-[#ffffff]/60 transition-all duration-200 resize-none"
            />
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Developer Options" icon={FileText}>
        <div className="space-y-4">
          <div className="bg-stone-800/50 rounded-xl p-4 border border-[#ffffff]/20">
            <h4 className="text-[#ffffff] font-medium mb-3">Debug Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Version</span>
                <span className="text-[#ffffff] font-mono">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Build</span>
                <span className="text-[#ffffff] font-mono">2025.01.15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Environment</span>
                <span className="text-[#ffffff] font-mono">Production</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10 justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button
              variant="outline"
              className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10 justify-start"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </SettingCard>

    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Appearance" icon={Palette}>
        <div className="space-y-4">
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-3 block">Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'auto'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSelectChange('appearance', 'theme', theme)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    appearance.theme === theme
                      ? 'bg-[#ffffff]/20 border-[#ffffff] text-[#ffffff]'
                      : 'bg-stone-800/50 border-[#ffffff]/30 text-stone-300 hover:bg-stone-800/70'
                  }`}
                >
                  {theme === 'light' && <Sun className="w-5 h-5 mx-auto mb-2" />}
                  {theme === 'dark' && <Moon className="w-5 h-5 mx-auto mb-2" />}
                  {theme === 'auto' && <Monitor className="w-5 h-5 mx-auto mb-2" />}
                  <div className="capitalize font-medium">{theme}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-3 block">Font Size</Label>
            <div className="grid grid-cols-3 gap-3">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSelectChange('appearance', 'fontSize', size)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    appearance.fontSize === size
                      ? 'bg-[#ffffff]/20 border-[#ffffff] text-[#ffffff]'
                      : 'bg-stone-800/50 border-[#ffffff]/30 text-stone-300 hover:bg-stone-800/70'
                  }`}
                >
                  <div className={`font-medium ${
                    size === 'small' ? 'text-sm' : 
                    size === 'large' ? 'text-lg' : 'text-base'
                  }`}>
                    {size === 'small' ? 'Aa' : size === 'large' ? 'Aa' : 'Aa'}
                  </div>
                  <div className="text-xs capitalize mt-1">{size}</div>
                </button>
              ))}
            </div>
          </div>

          <ToggleSwitch
            enabled={appearance.animations}
            onToggle={() => handleToggle('appearance', 'animations')}
            label="Animations"
            description="Enable smooth transitions and animations"
          />
          
          <ToggleSwitch
            enabled={appearance.compactMode}
            onToggle={() => handleToggle('appearance', 'compactMode')}
            label="Compact Mode"
            description="Reduce spacing for more content on screen"
          />
        </div>
      </SettingCard>

      <SettingCard title="Notifications" icon={Bell}>
        <div className="space-y-2">
          <ToggleSwitch
            enabled={notifications.email}
            onToggle={() => handleToggle('notifications', 'email')}
            label="Email Notifications"
            description="Receive updates and progress reports via email"
          />
          <ToggleSwitch
            enabled={notifications.push}
            onToggle={() => handleToggle('notifications', 'push')}
            label="Push Notifications"
            description="Get instant notifications in your browser"
          />
          <ToggleSwitch
            enabled={notifications.sound}
            onToggle={() => handleToggle('notifications', 'sound')}
            label="Sound Effects"
            description="Play sounds for interactions and notifications"
          />
          <ToggleSwitch
            enabled={notifications.desktop}
            onToggle={() => handleToggle('notifications', 'desktop')}
            label="Desktop Notifications"
            description="Show notifications on your desktop"
          />
        </div>
      </SettingCard>

      <SettingCard title="Learning Preferences" icon={Brain}>
        <div className="space-y-4">
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-3 block">Default Subject</Label>
            <div className="grid grid-cols-2 gap-3">
              {['Math', 'Physics', 'Chemistry', 'Biology'].map((subject) => (
                <button
                  key={subject}
                  className="p-3 rounded-xl border bg-stone-800/50 border-[#ffffff]/30 text-stone-300 hover:bg-stone-800/70 transition-all"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-3 block">Difficulty Preference</Label>
            <div className="grid grid-cols-3 gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  className="p-3 rounded-xl border bg-stone-800/50 border-[#ffffff]/30 text-stone-300 hover:bg-stone-800/70 transition-all"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-2 block">Study Session Length</Label>
            <Input
              defaultValue="30"
              type="number"
              className="bg-stone-800/60 border-[#ffffff]/40 text-[#ffffff] rounded-xl"
            />
            <p className="text-sm text-stone-400 mt-1">Default minutes per study session</p>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Data Management" icon={Database}>
        <div className="space-y-4">
          <div className="bg-stone-800/50 rounded-xl p-4 border border-[#ffffff]/20">
            <h4 className="text-[#ffffff] font-medium mb-3">Storage Usage</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-stone-300">Learning Paths</span>
                <span className="text-[#ffffff] font-medium">2.3 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-300">Exam Data</span>
                <span className="text-[#ffffff] font-medium">1.8 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-300">Problem Solutions</span>
                <span className="text-[#ffffff] font-medium">3.1 MB</span>
              </div>
              <div className="w-full bg-stone-700 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-[#ffffff] to-[#fde6c4] h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="text-sm text-stone-400">7.2 MB of 20 MB used</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10 justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10 justify-start"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Privacy Controls" icon={Shield}>
        <div className="space-y-2">
          <ToggleSwitch
            enabled={privacy.dataCollection}
            onToggle={() => handleToggle('privacy', 'dataCollection')}
            label="Data Collection"
            description="Allow collection of usage data to improve the service"
          />
          <ToggleSwitch
            enabled={privacy.analytics}
            onToggle={() => handleToggle('privacy', 'analytics')}
            label="Analytics"
            description="Share anonymous usage statistics"
          />
          <ToggleSwitch
            enabled={privacy.sharing}
            onToggle={() => handleToggle('privacy', 'sharing')}
            label="Data Sharing"
            description="Allow sharing data with educational partners"
          />
        </div>
      </SettingCard>

      <SettingCard title="Data Actions" icon={Trash2}>
        <div className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Caution Zone</span>
            </div>
            <p className="text-sm text-yellow-300 mb-4">
              These actions will permanently delete your data and cannot be undone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 justify-start"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Settings
              </Button>
              <Button
                variant="outline"
                className="border-red-400/30 text-red-400 hover:bg-red-400/10 justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All Data
              </Button>
            </div>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <SettingCard title="API Configuration" icon={Key}>
        <div className="space-y-4">
          <div>
            <Label className="text-[#ffffff] text-sm font-medium mb-2 block">Gemini API Key</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  type={showApiKey ? "text" : "password"}
                  defaultValue="sk-1234567890abcdef..."
                  className="bg-stone-800/60 border-[#ffffff]/40 text-[#ffffff] rounded-xl pr-10"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-[#ffffff]"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                variant="outline"
                className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10"
              >
                Test
              </Button>
            </div>
            <p className="text-sm text-stone-400 mt-1">Required for AI-powered features</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium">API Status</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-300">Connection Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Performance" icon={Zap}>
        <div className="space-y-2">
          <ToggleSwitch
            enabled={performance.autoSave}
            onToggle={() => handleToggle('performance', 'autoSave')}
            label="Auto-Save"
            description="Automatically save your progress"
          />
          <ToggleSwitch
            enabled={performance.caching}
            onToggle={() => handleToggle('performance', 'caching')}
            label="Smart Caching"
            description="Cache frequently used data for faster loading"
          />
          <ToggleSwitch
            enabled={performance.preload}
            onToggle={() => handleToggle('performance', 'preload')}
            label="Preload Content"
            description="Load content in advance for smoother experience"
          />
          <ToggleSwitch
            enabled={performance.compression}
            onToggle={() => handleToggle('performance', 'compression')}
            label="Data Compression"
            description="Compress data to save bandwidth"
          />
        </div>
      </SettingCard>

      <SettingCard title="Developer Options" icon={FileText}>
        <div className="space-y-4">
          <div className="bg-stone-800/50 rounded-xl p-4 border border-[#ffffff]/20">
            <h4 className="text-[#ffffff] font-medium mb-3">Debug Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Version</span>
                <span className="text-[#ffffff] font-mono">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Build</span>
                <span className="text-[#ffffff] font-mono">2025.01.15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Environment</span>
                <span className="text-[#ffffff] font-mono">Production</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10 justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button
              variant="outline"
              className="border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]/10 justify-start"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ffffff] to-[#fde6c4] rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="w-10 h-10 text-[#0d0d0d]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-4">Settings</h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Customize your LearnSphere experience and manage your preferences
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-stone-900/50 rounded-2xl p-6 shadow-lg border border-[#ffffff]/20 backdrop-blur-sm sticky top-6">
              <h3 className="text-lg font-bold text-[#ffffff] mb-4">Settings Categories</h3>
              <nav className="space-y-2">
                {settingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left ${
                      activeSection === section.id
                        ? 'bg-[#ffffff]/20 text-[#ffffff] border border-[#ffffff]/30'
                        : 'text-stone-300 hover:bg-[#ffffff]/10 hover:text-[#ffffff] border border-transparent'
                    }`}
                  >
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{section.label}</div>
                      <div className="text-sm opacity-80">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Language Selector */}
              <div className="mt-6 pt-6 border-t border-[#ffffff]/20">
                <Label className="text-[#ffffff] text-sm font-medium mb-3 block">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Language
                </Label>
                <LanguageSelector />
              </div>
            </div>
          </div>

          {/* Right Content - Settings Panels */}
          <div className="flex-1">
            {activeSection === 'profile' && renderProfileSettings()}

            {/* Save Button */}
            <div className="mt-8 flex justify-center">
              <Button
                className="bg-[#ffffff] text-[#0d0d0d] hover:bg-[#fde6c4] px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="w-5 h-5 mr-2" />
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;