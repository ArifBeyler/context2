import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Platform, MobileOS } from '../../types';
import RadioGroup from '../shared/RadioGroup';
import Checkbox from '../shared/Checkbox';
import StepNavigation from './StepNavigation';
import { Smartphone, Globe, Apple, Bot } from 'lucide-react';

const PlatformStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();

  const handlePlatformChange = (value: string) => {
    updateSelection('platform', value as Platform);
    if (value === 'Web') {
      updateSelection('mobileOS', undefined); // Clear mobile OS if web is selected
    }
  };

  const handleMobileOSChange = (value: string) => {
    updateSelection('mobileOS', value as MobileOS);
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        label="Select Platform:"
        name="platform"
        options={[
          { value: 'Mobile', text: 'Mobile App', icon: <Smartphone size={48} /> },
          { value: 'Web', text: 'Web Application', icon: <Globe size={48} /> },
        ]}
        selectedValue={selections.platform}
        onChange={handlePlatformChange}
      />

      {selections.platform === 'Mobile' && (
        <RadioGroup
          label="Mobile Operating System:"
          name="mobileOS"
          options={[
            { value: 'iOS', text: 'iOS', icon: <Apple size={48} /> },
            { value: 'Android', text: 'Android', icon: <Bot size={48} /> },
          ]}
          selectedValue={selections.mobileOS || ''}
          onChange={handleMobileOSChange}
        />
      )}

      {selections.platform === 'Web' && (
        <Checkbox
          label="Enable Responsive Design?"
          checked={selections.responsiveDesign || false}
          onChange={(e) => updateSelection('responsiveDesign', e.target.checked)}
        />
      )}
      <StepNavigation nextDisabled={!selections.platform || (selections.platform === 'Mobile' && !selections.mobileOS)} />
    </div>
  );
};

export default PlatformStep;