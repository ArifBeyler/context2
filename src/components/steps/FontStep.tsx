import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AppFont } from '../../types';
import { APP_FONTS } from '../../constants';
import RadioGroup from '../shared/RadioGroup';
import StepNavigation from './StepNavigation';

const FontStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();
  const aiSuggestedFont = selections.aiSuggestions.font;
  const aiFontReason = selections.aiSuggestions.fontReason;

  const fontOptions = APP_FONTS.map(font => ({
    value: font,
    text: `${font}${font === aiSuggestedFont ? ' (AI Suggestion)' : ''}`
    // Icon prop'u burada kullanılmıyor, çünkü ikonlar ana seçenekler için.
    // "AI Suggestion" etiketi metnin bir parçası olarak kalır.
  }));

  return (
    <div className="space-y-6">
      {aiSuggestedFont && aiFontReason && (
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 shadow-md">
          <p className="text-sm text-slate-700"> 
            <span className="font-semibold text-[#F26545]">AI Suggestion:</span> Based on your app idea, <span className="font-semibold">{aiSuggestedFont}</span> might be a good choice because: "{aiFontReason}"
          </p>
        </div>
      )}
      <RadioGroup
        label="Select Primary Font:"
        name="font"
        options={fontOptions} // Her bir font için genel bir ikon (örn: Type) eklenebilir istenirse. Şimdilik ikonsuz.
        selectedValue={selections.font}
        onChange={(value) => updateSelection('font', value as AppFont)}
      />
      <StepNavigation nextDisabled={!selections.font} />
    </div>
  );
};

export default FontStep;