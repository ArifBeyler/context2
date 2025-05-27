import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AiAppModel } from '../../types';
import RadioGroup from '../shared/RadioGroup';
import StepNavigation from './StepNavigation';
import Checkbox from '../shared/Checkbox';
import { Bot, Sparkles, Search, Wind } from 'lucide-react'; // Removed unused icons


const AiModelStep: React.FC = () => {
  const { selections, updateSelection, setCurrentStep } = useAppContext();
  const [isAiApp, setIsAiApp] = useState(!!selections.aiAppModel);

  const handleIsAiAppChange = (checked: boolean) => {
    setIsAiApp(checked);
    if (!checked) {
      updateSelection('aiAppModel', '');
      updateSelection('aiModelFeatures', undefined); // These will remain undefined
      updateSelection('aiModelPrice', undefined);   // as inputs are removed
    }
  };
  
  const handleSkip = () => {
    updateSelection('aiAppModel', ''); 
    // Clear other AI-related fields if skipping
    updateSelection('aiModelFeatures', undefined);
    updateSelection('aiModelPrice', undefined);
    setCurrentStep(prev => prev + 1);
  };

  const allowedModels: AiAppModel[] = ['OpenAI', 'Gemini', 'DeepSeek', 'Mistral'];

  const modelOptions = [
      { value: 'OpenAI', text: 'OpenAI (GPT series)', icon: <Bot size={48} /> },
      { value: 'Gemini', text: 'Google Gemini', icon: <Sparkles size={48} /> },
      { value: 'DeepSeek', text: 'DeepSeek', icon: <Search size={48} /> },
      { value: 'Mistral', text: 'Mistral AI', icon: <Wind size={48} /> },
  ].filter(option => allowedModels.includes(option.value as AiAppModel));


  return (
    <div className="space-y-6">
      <Checkbox
        label="Is your app primarily AI-focused or will it use a specific large language model / API?"
        checked={isAiApp}
        onChange={(e) => handleIsAiAppChange(e.target.checked)}
      />

      {isAiApp && (
        <>
          <RadioGroup
            label="Select AI Model Provider / Service:"
            name="aiAppModel"
            options={modelOptions}
            selectedValue={selections.aiAppModel}
            onChange={(value) => updateSelection('aiAppModel', value as AiAppModel)}
          />
          {/* Textarea and Input for features/pricing have been removed as per request */}
        </>
      )}
      <StepNavigation 
        nextDisabled={isAiApp && !selections.aiAppModel} 
        nextLabel={isAiApp ? "Next" : "Skip & Next"} 
        // If not an AI app, onNext will trigger handleSkip. 
        // If it is an AI app, onNext is undefined, so default behavior (increment step) applies.
        onNext={!isAiApp ? handleSkip : undefined} 
      />
    </div>
  );
};

export default AiModelStep;