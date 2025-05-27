
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Button from '../shared/Button';

interface StepNavigationProps {
  onNext?: () => void; // Custom logic before navigating next
  nextDisabled?: boolean;
  hidePrev?: boolean;
  nextLabel?: string;
  hideNext?: boolean; // To hide the next button, e.g., on PaymentStep where payment button is primary
}

const StepNavigation: React.FC<StepNavigationProps> = ({ 
  onNext, 
  nextDisabled = false, 
  hidePrev = false, 
  nextLabel = "İleri", // Default to Turkish "İleri"
  hideNext = false 
}) => {
  const { currentStep, setCurrentStep, selections } = useAppContext();

  // STEPS array in App.tsx has 12 items (indices 0 to 11).
  // Step 0 is PromptInputStep.
  // Steps 1 through 9 are original configuration steps.
  // Step 10 is PaymentStep.
  // Step 11 is FinalScreen.
  // The step before PaymentStep is LanguageStep at index 9.
  // The step before FinalScreen is PaymentStep at index 10.
  const languageStepIndex = 9; 
  // const paymentStepIndex = 10; // For reference if needed

  const handleNext = async () => {
    if (onNext) {
      onNext(); // Custom logic if any (e.g., skip AI model step)
    }
    // No special "Generate Context" logic here anymore,
    // as context generation is tied to payment success.
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className={`mt-8 flex ${hidePrev ? 'justify-end' : 'justify-between'} items-center`}>
      {!hidePrev && (
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={currentStep === 0 || selections.paymentSuccessful} // Disable prev if payment done
        >
          Geri
        </Button>
      )}
      {!hideNext && (
        <Button 
          onClick={handleNext}
          disabled={nextDisabled || selections.paymentSuccessful} // Disable next if payment done or explicitly disabled
        >
          {/* 
            The "Generate Context" text is no longer needed here as generation happens after payment.
            If currentStep is languageStepIndex, nextLabel will be "İleri" (to PaymentStep).
            PaymentStep will have its own "Öde" button.
          */}
          {nextLabel}
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;