
export type Platform = 'Mobile' | 'Web' | '';
export type MobileOS = 'iOS' | 'Android' | '';
export type DevTool = 'Cursor' | 'Windsurf' | 'Google AI Studio' | '';
export type OperatingSystem = 'macOS' | 'Windows' | '';
export type AiAppModel = 
  | 'OpenAI' 
  | 'Gemini' 
  | 'DeepSeek' 
  | 'Mistral' 
  | 'HuggingFace'
  | 'Replicate'
  | 'AssemblyAI'
  | 'Anthropic'
  | 'Cohere'
  | '';
export type UiStyle = 'Sharp' | 'Rounded' | '';
export type IconStyle = 'Emoji' | 'SVG' | 'Custom' | '';
export type AppFont = 'Poppins' | 'Inter' | 'SF Pro' | 'Roboto' | 'Montserrat' | 'Lato' | ''; // Added Poppins
export type AppLanguage = 'Turkish' | 'English' | '';

export interface ColorPalette {
  id: string;
  name: string;
  background: string; // Tailwind class for bg
  text: string;       // Tailwind class for text
  primary: string;    // Tailwind class for primary accent (e.g., button bg)
  secondary: string;  // Tailwind class for secondary accent
  previewClasses: {
    bg: string;
    text: string;
    accent: string;
  }
}

export interface AISuggestions {
  features: string[];
  appName: string;
  font: AppFont;
  fontReason: string;
}

export interface AppSelections {
  userPrompt: string;
  aiSuggestions: AISuggestions;
  
  platform: Platform;
  mobileOS?: MobileOS;
  responsiveDesign?: boolean;
  
  devTool: DevTool;
  operatingSystem?: OperatingSystem;
  
  aiAppModel: AiAppModel;
  aiModelFeatures?: string; 
  aiModelPrice?: string; 
  
  appName: string; 
  pages: string[]; 
  features: string[]; 
  includeProfilePic: boolean;
  
  uiStyle: UiStyle;
  iconStyle: IconStyle;
  useStroke: boolean;
  
  colorPaletteId: string; 
  
  font: AppFont;
  
  language: AppLanguage;

  // Payment related fields
  paymentClientSecret?: string;
  paymentSuccessful?: boolean;
}

export interface AppContextType {
  selections: AppSelections;
  updateSelection: <K extends keyof AppSelections>(key: K, value: AppSelections[K]) => void;
  updateAISuggestions: (suggestions: Partial<AISuggestions>) => void;
  currentStep: number;
  setCurrentStep: (step: number | ((prevStep: number) => number)) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  generatedContext: string;
  setGeneratedContext: (context: string) => void;
  generateContextFile: () => Promise<void>; // Now returns a Promise
  submitPrompt: (prompt: string) => Promise<void>;
  resetSelections: () => void;
  handlePaymentSuccess: (clientSecret: string) => void; // For Stripe
}

export interface StepProps {
  // Components might not need direct props if all managed via context
}

export interface IconProps {
  className?: string;
}