import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Input from '../shared/Input';
import Checkbox from '../shared/Checkbox';
import StepNavigation from './StepNavigation';
import Button from '../shared/Button';
import { CORE_FEATURES } from '../../constants';

const PageFeatureStep: React.FC = () => {
  const { currentStep, nextStep, updateSelection, selections } = useAppContext();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(selections.features || []);
  const [customFeature, setCustomFeature] = useState('');

  if (currentStep !== 8) return null;

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleAddCustomFeature = () => {
    if (customFeature.trim() && !selectedFeatures.includes(customFeature.trim())) {
      setSelectedFeatures(prev => [...prev, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  const handleNext = () => {
    updateSelection('features', selectedFeatures);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Core Features</h3>
        <p className="text-gray-600">
          Choose the features you want to include in your application
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CORE_FEATURES.map((feature) => (
          <button
            key={feature}
            onClick={() => handleFeatureToggle(feature)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedFeatures.includes(feature)
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                selectedFeatures.includes(feature)
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedFeatures.includes(feature) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium">{feature}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Add Custom Feature</h4>
        <div className="flex gap-2">
          <Input
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            placeholder="Enter custom feature name"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFeature()}
          />
          <Button
            onClick={handleAddCustomFeature}
            disabled={!customFeature.trim()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Add
          </Button>
        </div>
      </div>

      {selectedFeatures.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Features ({selectedFeatures.length}):</h4>
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {feature}
                <button
                  onClick={() => handleFeatureToggle(feature)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button
          onClick={() => updateSelection('features', selectedFeatures)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Skip
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedFeatures.length === 0}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PageFeatureStep;