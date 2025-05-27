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

// Mock payment intent creation for testing
export const createPaymentIntent = async (amount: number): Promise<{ clientSecret: string }> => {
  try {
    // Generate a properly formatted mock client secret for testing
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const randomSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const mockClientSecret = `pi_${randomId}_secret_${randomSecret}`;
    
    console.log('Mock PaymentIntent created successfully');
    return {
      clientSecret: mockClientSecret
    };
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

export const getPaymentStatus = async (paymentIntentId: string) => {
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
}; 