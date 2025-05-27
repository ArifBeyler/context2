import React from 'react';
import { useAppContext } from './contexts/AppContext';
import PromptInputStep from './components/steps/PromptInputStep';
import PlatformStep from './components/steps/PlatformStep';
import DevToolStep from './components/steps/DevToolStep';
import OsStep from './components/steps/OsStep';
import AiModelStep from './components/steps/AiModelStep';
import PageFeatureStep from './components/steps/PageFeatureStep';
import DesignStep from './components/steps/DesignStep';
import ColorPaletteStep from './components/steps/ColorPaletteStep';
import FontStep from './components/steps/FontStep';
import LanguageStep from './components/steps/LanguageStep';
import PaymentStep from './components/steps/PaymentStep';
import FinalScreen from './components/FinalScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/shared/LoadingSpinner';

// Define step components and their titles in English
const STEPS = [
  { component: PromptInputStep, title: "Describe Your App Idea" },
  { component: PlatformStep, title: "Platform Selection" },
  { component: DevToolStep, title: "Development Tool" },
  { component: OsStep, title: "Operating System (if needed)" },
  { component: AiModelStep, title: "AI Model (if needed)" },
  { component: PageFeatureStep, title: "Pages & Features" },
  { component: DesignStep, title: "Design Choices" },
  { component: ColorPaletteStep, title: "Color Palette" },
  { component: FontStep, title: "Font Selection" },
  { component: LanguageStep, title: "Language Support" },
  { component: PaymentStep, title: "Payment Step" },
  { component: FinalScreen, title: "Your Context File is Ready!" }
];

const App: React.FC = () => {
  const { currentStep, isLoading, selections } = useAppContext();

  const CurrentStepComponent = STEPS[currentStep]?.component;
  const currentTitle = STEPS[currentStep]?.title;
  const isInitialPromptStep = currentStep === 0;


  // Conditional rendering for OS step (example logic)
  const osStepIndex = STEPS.findIndex(step => step.component === OsStep);
  if (currentStep === osStepIndex && selections.devTool !== 'Cursor' && selections.devTool !== 'Windsurf') {
     // This logic needs careful placement or a more robust step skipping mechanism
  }

  if (isInitialPromptStep && CurrentStepComponent) {
    // PromptInputStep now handles its own full-page layout
    return <CurrentStepComponent />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F9] text-[#292F3B]"> {/* Base light theme */}
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
            <LoadingSpinner size="xl" color="text-[#F26545]" /> {/* Orange accent for spinner */}
          </div>
        )}
        {/* Main content card with new light theme styling */}
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10 transform transition-all duration-500 ease-in-out">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#292F3B]">
            {currentTitle}
          </h2>
          {CurrentStepComponent ? <CurrentStepComponent /> : <p>Step not found.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;