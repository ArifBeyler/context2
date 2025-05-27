import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Input from '../shared/Input';
import Checkbox from '../shared/Checkbox';
import StepNavigation from './StepNavigation';
import Button from '../shared/Button';
import { CORE_FEATURES } from '../../constants';

const PageFeatureStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();
  const [currentPage, setCurrentPage] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');

  const handleAddPage = () => {
    if (currentPage.trim() && !selections.pages.includes(currentPage.trim())) {
      updateSelection('pages', [...selections.pages, currentPage.trim()]);
      setCurrentPage('');
    }
  };

  const handleRemovePage = (pageToRemove: string) => {
    updateSelection('pages', selections.pages.filter(p => p !== pageToRemove));
  };

  const handleAddFeature = () => {
    if (currentFeature.trim() && !selections.features.includes(currentFeature.trim())) {
      updateSelection('features', [...selections.features, currentFeature.trim()]);
      setCurrentFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    updateSelection('features', selections.features.filter(f => f !== featureToRemove));
  };

  const handleToggleCoreFeature = (feature: string) => {
    if (selections.features.includes(feature)) {
      updateSelection('features', selections.features.filter(f => f !== feature));
    } else {
      updateSelection('features', [...selections.features, feature]);
    }
  };

  return (
    <div className="space-y-6">
      <Input
        label="Your Application Name"
        placeholder="Enter your application name"
        value={selections.appName}
        onChange={(e) => updateSelection('appName', e.target.value)}
      />
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Main Pages/Screens</label>
        <div className="flex items-center space-x-2 mb-2">
          <Input 
            value={currentPage} 
            onChange={(e) => setCurrentPage(e.target.value)} 
            placeholder="e.g., Home, Profile, Settings" 
            wrapperClassName="flex-grow mb-0"
            onKeyPress={(e) => e.key === 'Enter' && handleAddPage()}
          />
          <Button onClick={handleAddPage} size="sm" variant="outline" className="shadow-md hover:shadow-lg">+</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {selections.pages.map(page => (
            <span key={page} className="bg-[#F26545]/20 text-[#F26545] px-2 py-1 rounded-md text-xs flex items-center shadow-sm">
              {page}
              <button onClick={() => handleRemovePage(page)} className="ml-2 text-[#F26545] hover:text-orange-600">×</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Core Features</label>
        
        {/* Core Features Selection Grid */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-800 mb-3">Select from common features:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {CORE_FEATURES.map(feature => (
              <button
                key={feature}
                onClick={() => handleToggleCoreFeature(feature)}
                className={`text-left px-3 py-2 rounded-md text-sm border transition-all duration-200 ${
                  selections.features.includes(feature)
                    ? 'bg-[#F26545] text-white border-[#F26545] shadow-md'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-[#F26545] hover:bg-[#F26545]/5'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Feature Input */}
        <div className="flex items-center space-x-2 mb-2">
          <Input 
            value={currentFeature} 
            onChange={(e) => setCurrentFeature(e.target.value)} 
            placeholder="Add custom feature..." 
            wrapperClassName="flex-grow mb-0"
            onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
          />
          <Button onClick={handleAddFeature} size="sm" variant="outline" className="shadow-md hover:shadow-lg">+</Button>
        </div>

        {/* Selected Features Display */}
        <div className="flex flex-wrap gap-2">
          {selections.features.map(feature => (
            <span key={feature} className="bg-[#F26545]/20 text-[#F26545] px-2 py-1 rounded-md text-xs flex items-center shadow-sm">
              {feature}
              <button onClick={() => handleRemoveFeature(feature)} className="ml-2 text-[#F26545] hover:text-orange-600">×</button>
            </span>
          ))}
        </div>
      </div>

      <Checkbox
        label="Add Profile Picture Upload/Display Feature?"
        checked={selections.includeProfilePic}
        onChange={(e) => updateSelection('includeProfilePic', e.target.checked)}
      />
      <StepNavigation nextDisabled={!selections.appName} />
    </div>
  );
};

export default PageFeatureStep;