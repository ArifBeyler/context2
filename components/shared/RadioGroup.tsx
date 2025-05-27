import React from 'react';
import { Check } from 'lucide-react'; // Import the Check icon

export interface RadioOption {
  value: string;
  text: string; // Main text label
  icon?: React.ReactNode; // Optional SVG icon component
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  wrapperClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedValue, onChange, name, label, wrapperClassName }) => {
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {label && <span className="block text-sm font-medium text-slate-700 mb-2">{label}</span>}
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        {options.map((option) => {
          return (
            <label
              key={option.value}
              className={`
                relative flex flex-col items-center justify-center text-center
                cursor-pointer p-4 bg-white hover:bg-slate-50
                rounded-lg transition-all duration-200
                border border-slate-300 hover:border-[#F26545]/70
                shadow-md hover:shadow-lg
                
                peer-checked:bg-orange-50 
                peer-checked:text-[#F26545]
                peer-checked:border-2 peer-checked:border-[#F26545]
                peer-checked:shadow-lg
                peer-checked:hover:bg-orange-100

                aspect-square
              `}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only peer" // Visually hide the radio button but keep it accessible
              />
              {option.icon && (
                <span className="mb-2 text-slate-700 peer-checked:text-[#F26545] [&>svg]:w-10 [&>svg]:h-10 sm:[&>svg]:w-12 sm:[&>svg]:h-12">
                  {option.icon}
                </span>
              )}
              {/* Text color inherits from label's peer-checked:text-[#F26545] or defaults */}
              <span className={`text-xs sm:text-sm ${option.icon ? '' : 'text-center w-full'}`}>{option.text}</span>
              {/* Add checkmark for selected state */}
              <div className="absolute top-2 right-2 hidden peer-checked:block">
                <Check size={20} className="text-[#F26545]" strokeWidth={3} />
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;