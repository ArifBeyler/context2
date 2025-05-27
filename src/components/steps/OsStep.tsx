import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { OperatingSystem } from '../../types';
import RadioGroup from '../shared/RadioGroup';
import StepNavigation from './StepNavigation';
import { Apple, AppWindow } from 'lucide-react';

const OsStep: React.FC = () => {
  const { selections, updateSelection, setCurrentStep } = useAppContext();

  const isOsRequired = selections.devTool === 'Cursor' || selections.devTool === 'Windsurf';

  useEffect(() => {
    if (!isOsRequired) {
      // Skip this step if not required by advancing currentStep
      setCurrentStep(prev => prev + 1); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOsRequired, setCurrentStep]);

  if (!isOsRequired) {
    return <p className="text-center text-slate-500">Operating system selection is not required for the chosen development tool. Skipping...</p>;
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500"> 
        This helps personalize recommendations (e.g., simulator suggestions).
      </p>
      <RadioGroup
        label="Your Main Development Operating System:"
        name="operatingSystem"
        options={[
          { value: 'macOS', text: 'macOS', icon: <Apple size={48} /> },
          { value: 'Windows', text: 'Windows', icon: <AppWindow size={48} /> },
        ]}
        selectedValue={selections.operatingSystem || ''}
        onChange={(value) => updateSelection('operatingSystem', value as OperatingSystem)}
      />
      <StepNavigation nextDisabled={!selections.operatingSystem} />
    </div>
  );
};

export default OsStep;