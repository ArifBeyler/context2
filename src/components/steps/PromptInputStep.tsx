import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { EXAMPLE_PROMPTS } from '../../constants';
import Button from '../shared/Button';
import Textarea from '../shared/Textarea';
import Input from '../shared/Input';

const PromptInputStep: React.FC = () => {
  const { currentStep, nextStep, updateSelection, selections } = useAppContext();
  const [prompt, setPrompt] = useState(selections.prompt || '');
  const [appName, setAppName] = useState(selections.appName || '');

  if (currentStep !== 9) return null;

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleNext = () => {
    updateSelection('prompt', prompt);
    updateSelection('appName', appName);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Describe Your App Idea</h3>
        <p className="text-gray-600">
          Tell us about your application idea. Be as detailed as possible to get the best context file.
        </p>
      </div>

      <div>
        <Input
          label="Application Name"
          placeholder="Enter your application name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          className="mb-4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          App Description
        </label>
        <Textarea
          placeholder="Describe your app idea, features, target audience, and any specific requirements..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          className="w-full"
        />
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Ideas</h4>
        <p className="text-sm text-gray-600 mb-4">
          Click on any example below to use it as a starting point:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMPLE_PROMPTS.map((example, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleExampleClick(example.prompt)}
            >
              <h5 className="font-semibold text-gray-900 mb-2">{example.title}</h5>
              <p className="text-sm text-gray-600 line-clamp-3">{example.prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={() => {
            updateSelection('prompt', prompt);
            updateSelection('appName', appName);
          }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Save Draft
        </Button>
        <Button
          onClick={handleNext}
          disabled={!prompt.trim() || !appName.trim()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          Continue to Payment
        </Button>
      </div>

      {(!prompt.trim() || !appName.trim()) && (
        <p className="text-sm text-gray-500 text-center">
          Please enter both app name and description to continue
        </p>
      )}
    </div>
  );
};

export default PromptInputStep;