import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Button from './shared/Button';
import { PartyPopper, Eye, Download, Copy, RefreshCcw } from 'lucide-react'; // Import necessary icons
import LoadingSpinner from './shared/LoadingSpinner';

const FinalScreen: React.FC = () => {
  const { generatedContext, selections, resetSelections, isLoading, generateContextFile } = useAppContext(); 
  const [showContext, setShowContext] = useState(false);
  const [copied, setCopied] = useState(false);

  const appName = selections.appName || selections.aiSuggestions.appName || "Uygulamanız";

  // If payment was successful but context hasn't been generated yet (e.g., page refresh before generation completed)
  // This might be redundant if generateContextFile is always awaited after payment.
  useEffect(() => {
    if (selections.paymentSuccessful && !generatedContext && !isLoading) {
      // generateContextFile(); // This was causing infinite loop if generation failed.
      // Let's assume context is generated before reaching this screen or handled by a direct action.
    }
  }, [selections.paymentSuccessful, generatedContext, isLoading, generateContextFile]);


  const handleDownload = () => {
    if (!generatedContext || generatedContext.startsWith("# Hata") || generatedContext.startsWith("Ödeme işlemi tamamlanmadığı")) {
      alert("Context dosyası indirilemiyor. Lütfen içeriğin doğru oluşturulduğundan emin olun.");
      return;
    }
    const blob = new Blob([generatedContext], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${appName.toLowerCase().replace(/\s+/g, '_')}_context.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!generatedContext || generatedContext.startsWith("# Hata") || generatedContext.startsWith("Ödeme işlemi tamamlanmadığı")) {
      alert("Context kopyalanamıyor. Lütfen içeriğin doğru oluşturulduğundan emin olun.");
      return;
    }
    navigator.clipboard.writeText(generatedContext).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Kopyalanamadı: ', err);
      alert('Context panoya kopyalanamadı.');
    });
  };
  
  const handleStartOver = () => {
    resetSelections(); // This should also reset paymentSuccessful and clientSecret via DEFAULT_SELECTIONS
  };

  if (isLoading) {
    return (
      <div className="text-center space-y-6">
        <LoadingSpinner size="xl" />
        <p className="text-slate-700 text-lg">Context dosyanız oluşturuluyor...</p>
        <p className="text-sm text-slate-500">Bu işlem biraz zaman alabilir. Lütfen bekleyin.</p>
      </div>
    );
  }

  if (!selections.paymentSuccessful) {
    return (
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-semibold text-red-600 flex items-center justify-center">
          <PartyPopper size={28} className="mr-2 text-red-600" /> Ödeme Gerekli
        </h3>
        <p className="text-slate-700"> 
          Context dosyasını görüntülemek ve indirmek için lütfen ödeme adımını tamamlayın.
        </p>
        <Button 
          onClick={handleStartOver} 
          variant="outline" 
          className="mt-8 border-slate-500/70 text-slate-600 hover:bg-slate-500/10 hover:border-slate-600 focus:ring-slate-400 shadow-md hover:shadow-lg" 
        >
          <RefreshCcw size={20} className="mr-2" />
          Başa Dön
        </Button>
      </div>
    );
  }


  return (
    <div className="text-center space-y-6">
      <h3 className="text-2xl font-semibold text-[#F26545] flex items-center justify-center"> {/* Orange title for emphasis */}
        <PartyPopper size={28} className="mr-2 text-[#F26545]" /> Context Dosyanız Hazır "{appName}"!
      </h3>
      <p className="text-slate-700"> 
        Seçimlerinize göre \`context.md\` dosyanız oluşturuldu.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-6">
        <Button onClick={() => setShowContext(!showContext)} variant="outline" className="w-full sm:w-auto shadow-md hover:shadow-lg">
           <Eye size={20} className="mr-2"/>
          {showContext ? 'Gizle' : 'Görüntüle'}
        </Button>
        <Button 
          onClick={handleDownload} 
          className="w-full sm:w-auto shadow-md hover:shadow-lg" 
          variant="primary"
          disabled={!generatedContext || generatedContext.startsWith("# Hata") || generatedContext.startsWith("Ödeme işlemi tamamlanmadığı")}
        > 
          <Download size={20} className="mr-2" />
          İndir (.md)
        </Button>
        <Button 
          onClick={handleCopy} 
          variant="secondary" 
          className="w-full sm:w-auto shadow-md hover:shadow-lg"
          disabled={!generatedContext || generatedContext.startsWith("# Hata") || generatedContext.startsWith("Ödeme işlemi tamamlanmadığı")}
        > 
          <Copy size={20} className="mr-2" />
          {copied ? 'Kopyalandı!' : 'Panoya Kopyala'}
        </Button>
      </div>

      {showContext && (
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg max-h-96 overflow-y-auto text-left shadow-inner">
          {generatedContext.startsWith("# Hata") || generatedContext.startsWith("Ödeme işlemi tamamlanmadığı") ? (
            <p className="text-red-600">{generatedContext}</p>
          ) : (
            <pre className="whitespace-pre-wrap text-sm text-slate-700 break-words">{generatedContext}</pre>
          )}
        </div>
      )}
      
      <Button 
        onClick={handleStartOver} 
        variant="outline" 
        className="mt-8 border-red-500/70 text-red-600 hover:bg-red-500/10 hover:border-red-600 focus:ring-red-400 shadow-md hover:shadow-lg" 
      >
        <RefreshCcw size={20} className="mr-2" />
        Başa Dön
      </Button>
    </div>
  );
};

export default FinalScreen;