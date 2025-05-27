import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import StepNavigation from './components/steps/StepNavigation';
import AiModelStep from './components/steps/AiModelStep';
import LanguageStep from './components/steps/LanguageStep';
import PlatformStep from './components/steps/PlatformStep';
import OsStep from './components/steps/OsStep';
import DevToolStep from './components/steps/DevToolStep';
import DesignStep from './components/steps/DesignStep';
import FontStep from './components/steps/FontStep';
import ColorPaletteStep from './components/steps/ColorPaletteStep';
import PageFeatureStep from './components/steps/PageFeatureStep';
import PromptInputStep from './components/steps/PromptInputStep';
import PaymentStep from './components/steps/PaymentStep';
import FinalScreen from './components/FinalScreen';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <StepNavigation />
          <div className="mt-8">
            <AiModelStep />
            <LanguageStep />
            <PlatformStep />
            <OsStep />
            <DevToolStep />
            <DesignStep />
            <FontStep />
            <ColorPaletteStep />
            <PageFeatureStep />
            <PromptInputStep />
            <PaymentStep />
            <FinalScreen />
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;