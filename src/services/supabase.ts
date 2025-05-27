import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Payment intent creation function
export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  userEmail?: string,
  userName?: string,
  contextData?: any
) {
  try {
    console.log('Creating PaymentIntent with Supabase Edge Function...');
    
    // TEMPORARY: Mock payment for testing while Edge Function is being fixed
    console.log('Using mock payment for testing purposes');
    
    // Generate a properly formatted mock client secret for testing
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const randomSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const mockClientSecret = `pi_${randomId}_secret_${randomSecret}`;
    
    console.log('Mock PaymentIntent created successfully');
    return {
      clientSecret: mockClientSecret,
      paymentIntentId: `pi_${randomId}`
    };
    
    /* REAL IMPLEMENTATION (currently disabled due to Edge Function issues):
    const response = await fetch(`${SUPABASE_URL}/functions/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        user_email: userEmail,
        user_name: userName,
        context_data: contextData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase Edge Function error:', errorText);
      throw new Error(`Failed to create payment intent: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.clientSecret) {
      throw new Error('No client secret received from backend');
    }
    
    console.log('PaymentIntent created successfully');
    return data;
    */
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw error;
  }
}

// Payment status check function
export async function getPaymentStatus(paymentIntentId: string) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('stripe_payment_intent_id', paymentIntentId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Payment status check error:', error);
    throw error;
  }
} 