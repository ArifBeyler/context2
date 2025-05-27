
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { DevTool } from '../../types';
import RadioGroup from '../shared/RadioGroup';
import StepNavigation from './StepNavigation';
// Fix: Changed MousePointerSquare to MousePointer as MousePointerSquare is not an exported member.
import { MousePointer, Wind, BrainCircuit } from 'lucide-react';

const DevToolStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();

  return (
    <div className="space-y-6">
      <RadioGroup
        label="Main Development Tool/Environment:"
        name="devTool"
        options={[
          // Fix: Changed MousePointerSquare to MousePointer
          { value: 'Cursor', text: 'Cursor (AI Code Editor)', icon: <MousePointer size={48} /> },
          { value: 'Windsurf', text: 'Windsurf (AI Dev Env)', icon: <Wind size={48} /> },
          { value: 'Google AI Studio', text: 'Google AI Studio', icon: <BrainCircuit size={48} /> },
        ]}
        selectedValue={selections.devTool}
        onChange={(value) => updateSelection('devTool', value as DevTool)}
      />
      <StepNavigation nextDisabled={!selections.devTool} />
    </div>
  );
};

export default DevToolStep;