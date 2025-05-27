import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dkrejwxcjzykewzlaqru.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcmVqd3hjanlrZXd6bGFxcnUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNzU2NzE5NCwiZXhwIjoyMDUzMTQzMTk0fQ.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PaymentRecord {
  id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const createPaymentIntent = async (amount: number): Promise<{ clientSecret: string }> => {
  try {
    const response = await supabase.functions.invoke('create-payment-intent', {
      body: { amount }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const savePaymentRecord = async (paymentData: Omit<PaymentRecord, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error saving payment record:', error);
    throw error;
  }
};



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