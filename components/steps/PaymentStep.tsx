import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../shared/Button';
import StepNavigation from './StepNavigation';
import { STRIPE_PUBLISHABLE_KEY, PAYMENT_AMOUNT } from '../../constants';
import { createPaymentIntent } from '../../services/supabase';
import LoadingSpinner from '../shared/LoadingSpinner';
import StripeErrorBoundary from '../shared/StripeErrorBoundary';

// Load Stripe with publishable key
const stripePromise = STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_YOUR_ACTUAL') ? null : loadStripe(STRIPE_PUBLISHABLE_KEY);
if (!stripePromise) {
  console.error("Stripe Publishable Key (STRIPE_PUBLISHABLE_KEY) is not set or invalid in constants.ts. Please enter your own Stripe test publishable key.");
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Poppins", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      },
      border: "1px solid #ced4da", 
      padding: "10px 12px", 
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  },
};

const CheckoutForm: React.FC = () => {
  const { selections, handlePaymentSuccess, setIsLoading, isLoading, generateContextFile, setCurrentStep } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const clientSecret = selections.paymentClientSecret;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setError("Payment system is not ready or client secret could not be obtained. Please try again.");
      return;
    }

    setProcessing(true);
    setIsLoading(true); 
    setError(null);

    // Check if this is a mock payment (client secret starts with pi_ but not pi_test_)
    const isMockPayment = clientSecret.startsWith('pi_') && !clientSecret.includes('_test_');
    
    if (isMockPayment) {
      // Mock payment - simulate success without calling Stripe
      console.log('Processing mock payment...');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      handlePaymentSuccess(clientSecret); 
      await generateContextFile(); 
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Real Stripe payment processing
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
        setError("Card information could not be retrieved.");
        setProcessing(false);
        setIsLoading(false);
        return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (stripeError) {
      setError(stripeError.message || "A payment error occurred.");
      setProcessing(false);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      handlePaymentSuccess(clientSecret); 
      await generateContextFile(); 
      setCurrentStep(prev => prev + 1); 
    } else {
      setError("Unexpected payment status: " + paymentIntent?.status);
      setProcessing(false);
      setIsLoading(false);
    }
  };
  
  if (isLoading && processing) {
    return <div className="text-center py-8"><LoadingSpinner size="lg" /><p className="mt-4 text-slate-600">Processing your payment...</p></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-slate-300 rounded-lg shadow-sm bg-white">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      
      {error && <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md border border-red-300" role="alert">{error}</div>}
      {succeeded && <div className="text-green-600 text-sm p-3 bg-green-50 rounded-md border border-green-300" role="alert">Payment Successful! Your context file is being prepared...</div>}

      <div className="mt-8 flex justify-between items-center">
         <StepNavigation hidePrev={succeeded || processing} nextDisabled={true} /> 
        <Button
            type="submit"
            disabled={!stripe || processing || succeeded || isLoading || !clientSecret}
            isLoading={processing}
            className="w-full sm:w-auto"
          >
            {processing ? 'Processing...' : succeeded ? 'Successful!' : `Pay $${PAYMENT_AMOUNT / 100} & Continue`} 
        </Button>
      </div>
       <p className="text-xs text-slate-500 text-center mt-2">
        🧪 Test Mode: Mock payment system active. 
        No real payment will be charged. Use any card details.
      </p>
    </form>
  );
};

const PaymentStep: React.FC = () => {
  const { updateSelection, selections, setIsLoading, isLoading } = useAppContext();
  const [initialLoading, setInitialLoading] = useState(true);
  const [errorFetchingSecret, setErrorFetchingSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (selections.paymentClientSecret || selections.paymentSuccessful) {
        setInitialLoading(false);
        return;
      }

      setInitialLoading(true);
      setIsLoading(true);
      setErrorFetchingSecret(null);

      try {
        console.log("Sending PaymentIntent creation request to Supabase backend...");
        
        // Prepare context data
        const contextData = {
          userPrompt: selections.userPrompt,
          platform: selections.platform,
          devTool: selections.devTool,
          appName: selections.appName,
          pages: selections.pages,
          features: selections.features,
          colorPaletteId: selections.colorPaletteId,
          font: selections.font,
          language: selections.language,
        };

        const data = await createPaymentIntent(
          PAYMENT_AMOUNT,
          'usd',
          undefined, // user_email - optional
          undefined, // user_name - optional
          contextData
        );

        if (data.clientSecret) {
          console.log("Client secret received from Supabase backend:", data.clientSecret);
          updateSelection('paymentClientSecret', data.clientSecret);
        } else {
          throw new Error("Could not get clientSecret from backend.");
        }

      } catch (err) {
        console.error("Error getting client secret:", err);
        setErrorFetchingSecret(err instanceof Error ? err.message : String(err));
      } finally {
        setInitialLoading(false);
        setIsLoading(false);
      }
    };
    
    if (stripePromise) {
      fetchClientSecret();
    } else {
      setErrorFetchingSecret("Stripe could not be loaded. Please check your API key (constants.ts).");
      setInitialLoading(false);
    }
  }, [stripePromise, updateSelection, selections, setIsLoading]);

  if (initialLoading || (isLoading && !selections.paymentClientSecret) ) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-slate-600">Loading payment information...</p>
      </div>
    );
  }

  if (errorFetchingSecret) {
    return (
      <div className="text-center py-8 p-4 my-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-lg font-semibold">Payment Form Could Not Be Loaded</h2>
        <p>{errorFetchingSecret}</p>
        <p className="mt-2 text-sm">Please refresh the page or try again later. If the problem persists, check the `STRIPE_PUBLISHABLE_KEY` value in `constants.ts`.</p>
        <p className="mt-2 text-xs text-red-600">
          Error: Invalid value for elements(): clientSecret should be a client secret of the form {'{id}'}_secret_{'{secret}'}. You specified: {selections.paymentClientSecret}.
        </p>
      </div>
    );
  }
  
  if (!stripePromise) {
     return (
      <div className="text-center py-8 p-4 my-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <h2 className="text-lg font-semibold">Stripe Could Not Be Loaded</h2>
        <p>Please make sure the `STRIPE_PUBLISHABLE_KEY` value in `constants.ts` is set correctly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Context File Generation
        </h3>
        <p className="text-slate-700">
          You need to make a payment of ${PAYMENT_AMOUNT / 100} before creating your context file.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            ✅ Secure payment with Stripe<br/>
            ✅ Instant context file generation<br/>
            ✅ All your selections are saved
          </p>
        </div>
      </div>
      
      {selections.paymentClientSecret && (
        <StripeErrorBoundary>
          <Elements stripe={stripePromise} options={{ clientSecret: selections.paymentClientSecret, appearance: { theme: 'stripe' } }}>
            <CheckoutForm />
          </Elements>
        </StripeErrorBoundary>
      )}
      
      {!selections.paymentClientSecret && !initialLoading && !errorFetchingSecret && (
         <div className="text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-slate-600">Preparing payment system...</p>
            <p className="text-xs text-slate-400 mt-2">(Waiting for client secret)</p>
         </div>
       )}
    </div>
  );
};

export default PaymentStep;