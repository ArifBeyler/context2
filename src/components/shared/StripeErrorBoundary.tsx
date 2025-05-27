import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class StripeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Stripe Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-4 my-4 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-lg font-semibold">Ödeme Formu Yüklenemedi</h2>
          <p>Stripe ile ilgili bir sorun oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
          {this.state.error && <p className="text-sm mt-2">Hata: {this.state.error.message}</p>}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default StripeErrorBoundary;