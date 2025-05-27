
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { COLOR_PALETTES } from '../../constants';
import StepNavigation from './StepNavigation';

const ColorPaletteStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();

  return (
    <div className="space-y-6">
      <p className="text-slate-700">Choose a base color theme for your application:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COLOR_PALETTES.map(palette => (
          <button
            key={palette.id}
            onClick={() => updateSelection('colorPaletteId', palette.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 
                        ${selections.colorPaletteId === palette.id ? 'border-[#F26545] ring-2 ring-[#F26545] ring-offset-2 ring-offset-white scale-105' : 'border-slate-300 hover:border-[#F26545]/70'} 
                        ${palette.background.includes('slate') || palette.background.includes('gray-900') ? palette.background : palette.background + ' bg-opacity-90'} 
                        ${palette.background === 'bg-white' || palette.background === 'bg-[#F5F6F9]' || palette.background === 'bg-gray-100' || palette.background === 'bg-green-50' ? 'bg-white' : palette.background}
                        shadow-lg hover:shadow-xl`}
          >
            <h3 className={`font-semibold mb-2 ${palette.text}`}>{palette.name}</h3>
            <div className="flex space-x-2">
              <div className={`w-8 h-8 rounded ${palette.previewClasses.bg} border border-black/10 shadow-inner`}></div>
              <div className={`w-8 h-8 rounded ${palette.previewClasses.text.startsWith('text-') ? palette.previewClasses.text.replace('text-','bg-') : 'bg-slate-500' } border border-black/10 shadow-inner`}></div>
              <div className={`w-8 h-8 rounded ${palette.previewClasses.accent} border border-black/10 shadow-inner`}></div>
            </div>
            {palette.id === 'primary-light-theme' && <span className={`text-xs block mt-1 ${palette.text} opacity-70`}>(Recommended Light Theme)</span>}
            {palette.id === 'dark-default-theme' && <span className={`text-xs block mt-1 ${palette.text} opacity-70`}>(Recommended Dark Theme)</span>}
          </button>
        ))}
      </div>
      <StepNavigation nextDisabled={!selections.colorPaletteId} />
    </div>
  );
};

export default ColorPaletteStep;