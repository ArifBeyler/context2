import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppLanguage } from '../../types';
import RadioGroup from '../shared/RadioGroup';
import StepNavigation from './StepNavigation';

const UKFlagIcon: React.FC = () => (
  <svg viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M0 0H60V36H0V0Z" fill="#012169"/>
    <path d="M0 0L60 36M0 36L60 0" stroke="white" strokeWidth="6"/>
    <path d="M0 0L60 36M0 36L60 0" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30 0V36M0 18H60" stroke="white" strokeWidth="10"/>
    <path d="M30 0V36M0 18H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

const TRFlagIcon: React.FC = () => (
  <svg viewBox="0 0 75 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="75" height="50" fill="#E30A17"/>
    <path d="M39.5833 25C39.5833 29.9325 35.5992 33.9167 30.6667 33.9167C25.7341 33.9167 21.75 29.9325 21.75 25C21.75 20.0675 25.7341 16.0833 30.6667 16.0833C35.5992 16.0833 39.5833 20.0675 39.5833 25Z" fill="white"/>
    <path d="M43.4042 25C43.4042 28.9914 40.0127 32.2083 35.9375 32.2083C31.8623 32.2083 28.4708 28.9914 28.4708 25C28.4708 21.0086 31.8623 17.7917 35.9375 17.7917C40.0127 17.7917 43.4042 21.0086 43.4042 25Z" fill="#E30A17"/>
    <path d="M45.3125 25L42.8703 26.9641L43.6467 23.9695L41.2045 22.0359L44.2269 22.0305L45.3125 19.0833L46.3981 22.0305L49.4205 22.0359L46.9783 23.9695L47.7547 26.9641L45.3125 25Z" fill="white"/>
  </svg>
);


const LanguageStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();

  return (
    <div className="space-y-6">
      <RadioGroup
        label="Primary Language for UI & Content:"
        name="language"
        options={[
          { value: 'English', text: 'English', icon: <UKFlagIcon /> },
          { value: 'Turkish', text: 'Turkish', icon: <TRFlagIcon /> },
          // Add more languages as needed
        ]}
        selectedValue={selections.language}
        onChange={(value) => updateSelection('language', value as AppLanguage)}
      />
      <p className="text-xs text-slate-500"> 
        This helps generate context related to localization and UI considerations.
      </p>
      <StepNavigation nextDisabled={!selections.language} />
    </div>
  );
};

export default LanguageStep;