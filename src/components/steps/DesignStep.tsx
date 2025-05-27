import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { UiStyle, IconStyle } from '../../types';
import RadioGroup from '../shared/RadioGroup';
import Checkbox from '../shared/Checkbox';
import StepNavigation from './StepNavigation';
import { Ratio, Circle, Smile, ImageIcon, Palette } from 'lucide-react';

const DesignStep: React.FC = () => {
  const { selections, updateSelection } = useAppContext();

  return (
    <div className="space-y-6">
      <RadioGroup
        label="UI Corner Style:"
        name="uiStyle"
        options={[
          { value: 'Sharp', text: 'Sharp Edges (Modern, Minimal)', icon: <Ratio size={48} /> },
          { value: 'Rounded', text: 'Rounded Corners (Friendly, Soft)', icon: <Circle size={48} /> },
        ]}
        selectedValue={selections.uiStyle}
        onChange={(value) => updateSelection('uiStyle', value as UiStyle)}
      />
      <RadioGroup
        label="Icon Style:"
        name="iconStyle"
        options={[
          { value: 'Emoji', text: 'Emoji (Fun, Simple)', icon: <Smile size={48} /> },
          { value: 'SVG', text: 'SVG Icons (Clean, Scalable)', icon: <ImageIcon size={48} /> },
          { value: 'Custom', text: 'Custom Illustrations (Unique)', icon: <Palette size={48} /> },
        ]}
        selectedValue={selections.iconStyle}
        onChange={(value) => updateSelection('iconStyle', value as IconStyle)}
      />
      <Checkbox
        label="Use Stroke/Outlines on UI Elements (e.g., buttons, cards)?"
        checked={selections.useStroke}
        onChange={(e) => updateSelection('useStroke', e.target.checked)}
      />
      <StepNavigation nextDisabled={!selections.uiStyle || !selections.iconStyle} />
    </div>
  );
};

export default DesignStep;