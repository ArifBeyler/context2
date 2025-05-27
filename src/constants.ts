import { ColorPalette, AppFont, AppSelections } from './types';

export const APP_FONTS: AppFont[] = ['Poppins', 'Inter', 'SF Pro', 'Roboto', 'Montserrat', 'Lato']; // Poppins added and made first

export const EXAMPLE_PROMPTS = [
  {
    title: "To-Do List App",
    prompt: "Create a simple to-do list application where users can add, edit, delete, and mark tasks as complete. Include categories and due dates."
  },
  {
    title: "Weather App",
    prompt: "Build a weather application that shows current weather and 7-day forecast for user's location with beautiful weather icons."
  },
  {
    title: "Recipe Manager",
    prompt: "Develop a recipe management app where users can save, search, and organize their favorite recipes with ingredients and cooking instructions."
  },
  {
    title: "Expense Tracker",
    prompt: "Create an expense tracking application to help users monitor their spending, categorize expenses, and view monthly reports."
  },
  {
    title: "AI Chat Assistant",
    prompt: "Build an AI-powered chat application that can answer questions, help with tasks, and maintain conversation history."
  }
];

// Core Features that users can select from
export const CORE_FEATURES: string[] = [
  "User Authentication",
  "Data Synchronization", 
  "Push Notifications",
  "Real-time Chat",
  "File Upload/Download",
  "Payment Integration",
  "Social Media Login",
  "Search & Filters",
  "User Profiles",
  "Admin Dashboard",
  "Analytics & Reports",
  "Email Notifications",
  "Multi-language Support",
  "Dark/Light Theme",
  "Offline Mode",
  "GPS/Location Services",
  "Camera Integration",
  "QR Code Scanner",
  "Calendar Integration",
  "Export/Import Data",
  "API Integration",
  "Role-based Access",
  "Two-factor Authentication",
  "Data Encryption",
  "Backup & Restore"
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'primary-light-theme',
    name: 'Primary Light Theme (Default)',
    background: 'bg-[#F5F6F9]', 
    text: 'text-[#292F3B]',   
    primary: 'bg-[#F26545]',    
    secondary: 'text-[#F26545]', 
    previewClasses: {
      bg: 'bg-[#F5F6F9]',
      text: 'text-[#292F3B]',
      accent: 'bg-[#F26545]',
    }
  },
  {
    id: 'dark-default-theme', 
    name: 'Primary Dark Theme',
    background: 'bg-slate-900', 
    text: 'text-slate-100',   
    primary: 'bg-[#F26545]',    
    secondary: 'text-[#F26545]', 
    previewClasses: {
      bg: 'bg-slate-900',
      text: 'text-slate-100',
      accent: 'bg-[#F26545]',
    }
  },
  {
    id: 'cyber-glow-light-bg', 
    name: 'Cyber Glow (Light Background)',
    background: 'bg-gray-100', 
    text: 'text-purple-700', 
    primary: 'bg-gradient-to-r from-pink-500 to-purple-600',
    secondary: 'text-lime-600', 
    previewClasses: {
      bg: 'bg-gray-100',
      text: 'text-purple-700',
      accent: 'bg-pink-500',
    }
  },
  {
    id: 'nature-harmony',
    name: 'Nature Harmony',
    background: 'bg-green-50',
    text: 'text-green-800',
    primary: 'bg-gradient-to-r from-emerald-500 to-lime-600',
    secondary: 'text-amber-600',
    previewClasses: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      accent: 'bg-emerald-500',
    }
  }
];

export const DEFAULT_SELECTIONS: AppSelections = {
  userPrompt: '',
  aiSuggestions: {
    features: [],
    appName: '',
    font: 'Poppins' as AppFont, // Default font to Poppins
    fontReason: '',
  },
  platform: '' as const,
  devTool: '' as const,
  aiAppModel: '' as const,
  appName: '',
  pages: [],
  features: [],
  includeProfilePic: false,
  uiStyle: '' as const,
  iconStyle: '' as const,
  useStroke: false,
  colorPaletteId: COLOR_PALETTES[0].id, 
  font: 'Poppins' as AppFont, // Default font to Poppins
  language: '' as const,
  paymentClientSecret: undefined,
  paymentSuccessful: false,
};

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

// Supabase Configuration
export const SUPABASE_URL = 'https://dkrejwxcjzykewzlaqru.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcmVqd3hjanp5a2V3emxhcXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDYwNDMsImV4cCI6MjA2MzkyMjA0M30.7607jMyPLIPuJj67KVNTaN94LbI93_rfKjBD76G8CLw';

// IMPORTANT: Enter your own Stripe TEST PUBLISHABLE KEY here for Stripe to work properly.
// You can get it from your Stripe dashboard (usually starts with `pk_test_...`).
// Without this key, Stripe cannot load and the payment step may result in a blank screen.
// IN REAL APPLICATIONS, MANAGE THIS KEY SECURELY (e.g., environment variables).
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51MefTTQhLKGI7MgxYKtjI4pgJ9niyTxZuXLQYrOjiNkiKwsGmOWpoXZp2tP7FlrGoRoPmizbyxyogybGkjPxOQWR00AUjs7f1M';

// Payment amount (in cents)
export const PAYMENT_AMOUNT = 100; // $1

// AI Models
export const AI_MODELS = [
  'GPT-4',
  'GPT-3.5',
  'Claude 3.5 Sonnet',
  'Claude 3 Haiku',
  'Gemini Pro',
  'Gemini Flash',
  'Other'
];

// Programming Languages
export const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Other'
];

// Platforms
export const PLATFORMS = [
  'Web Application',
  'Mobile App (React Native)',
  'Mobile App (Flutter)',
  'Desktop App (Electron)',
  'Desktop App (Tauri)',
  'API/Backend',
  'Chrome Extension',
  'Other'
];

// Operating Systems
export const OPERATING_SYSTEMS = [
  'Windows',
  'macOS',
  'Linux',
  'iOS',
  'Android',
  'Cross-platform'
];

// Development Tools
export const DEV_TOOLS = [
  'VS Code',
  'Cursor',
  'Windsurf',
  'WebStorm',
  'IntelliJ IDEA',
  'Sublime Text',
  'Vim/Neovim',
  'Other'
];

// Language Support Options
export const LANGUAGE_SUPPORT = [
  'English Only',
  'Multi-language (i18n)',
  'RTL Support (Arabic, Hebrew)',
  'Specific Language (specify)'
];


// Design Frameworks
export const DESIGN_FRAMEWORKS = [
  'Tailwind CSS',
  'Bootstrap',
  'Material-UI',
  'Ant Design',
  'Chakra UI',
  'Styled Components',
  'CSS Modules',
  'Vanilla CSS',
  'Other'
];

// Fonts
export const FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Nunito',
  'Raleway',
  'Ubuntu',
  'Other'
];

