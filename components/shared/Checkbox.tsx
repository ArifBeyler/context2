
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, wrapperClassName, className, ...props }) => {
  return (
    <div className={`flex items-center mb-4 ${wrapperClassName}`}>
      <input
        id={id || props.name}
        type="checkbox"
        className={`h-5 w-5 text-[#F26545] bg-white border-slate-300 rounded focus:ring-[#F26545] focus:ring-2 focus:ring-offset-2 focus:ring-offset-white cursor-pointer shadow-sm ${className}`}
        {...props}
      />
      <label htmlFor={id || props.name} className="ml-2 block text-sm text-slate-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;