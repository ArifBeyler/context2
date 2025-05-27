
import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { AppSelections, AppContextType, AISuggestions, Platform, MobileOS, DevTool, OperatingSystem, AiAppModel, UiStyle, IconStyle, AppFont, AppLanguage } from '../types';
import { DEFAULT_SELECTIONS, GEMINI_MODEL_TEXT, APP_FONTS } from '../constants';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selections, setSelections] = useState<AppSelections>(DEFAULT_SELECTIONS);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedContext, setGeneratedContext] = useState<string>('');

  const updateSelection = useCallback(<K extends keyof AppSelections>(key: K, value: AppSelections[K]) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateAISuggestions = useCallback((suggestions: Partial<AISuggestions>) => {
    setSelections(prev => ({
      ...prev,
      aiSuggestions: {
        ...prev.aiSuggestions,
        ...suggestions,
      }
    }));
  }, []);

  const resetSelections = useCallback(() => {
    setSelections(DEFAULT_SELECTIONS);
    setCurrentStep(0);
    setGeneratedContext('');
  }, []);

  const handlePaymentSuccess = useCallback((clientSecret: string) => {
    updateSelection('paymentClientSecret', clientSecret); // Store client secret if needed later
    updateSelection('paymentSuccessful', true);
    // generateContextFile will be called after this, leading to the final screen
  }, [updateSelection]);


  const submitPrompt = async (prompt: string) => {
    setIsLoading(true);
    updateSelection('userPrompt', prompt);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = GEMINI_MODEL_TEXT;
      
      const systemInstruction = `You are an expert technical consultant. Based on the user's app idea, provide suggestions.
      Respond ONLY with a valid JSON object. Do not include any explanatory text before or after the JSON.
      The JSON object should have the following keys:
      - "suggestedFeaturesString": A comma-separated string of 3-5 relevant technical features or integrations (e.g., "User Authentication,Push Notifications,Offline Storage,Image Upload").
      - "suggestedAppName": A creative and catchy name for this application.
      - "suggestedFont": A single suitable font name from these options: ${APP_FONTS.join(", ")}. The output for "suggestedFont" must be a JSON string (e.g., "Poppins" or "SF Pro").
      - "fontReason": A brief explanation for the font suggestion.
      
      Example JSON:
      {
        "suggestedFeaturesString": "User Authentication via OAuth,Real-time Chat,Cloud Data Storage (e.g., Firebase)",
        "suggestedAppName": "ConnectSphere",
        "suggestedFont": "Poppins",
        "fontReason": "Poppins is a versatile and modern geometric sans-serif, excellent for UI."
      }`;

      const fullPrompt = `User's app idea: "${prompt}"`;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
        }
      });

      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }
      
      const parsedData = JSON.parse(jsonStr);

      let featuresArray: string[] = [];
      if (parsedData.suggestedFeaturesString && typeof parsedData.suggestedFeaturesString === 'string') {
        featuresArray = parsedData.suggestedFeaturesString.split(',').map((feature: string) => feature.trim()).filter((feature: string) => feature);
      }

      updateAISuggestions({
        features: featuresArray.length > 0 ? featuresArray : ["Özellik A (varsayılan)", "Özellik B (varsayılan)"],
        appName: parsedData.suggestedAppName || `Benim ${prompt.substring(0,15)} Uygulamam`,
        font: (APP_FONTS.includes(parsedData.suggestedFont) ? parsedData.suggestedFont : 'Poppins') as AppFont,
        fontReason: parsedData.fontReason || '',
      });
      if (!selections.appName && parsedData.suggestedAppName) {
        updateSelection('appName', parsedData.suggestedAppName);
      }
      if (parsedData.suggestedFont && APP_FONTS.includes(parsedData.suggestedFont)) {
         updateSelection('font', parsedData.suggestedFont as AppFont);
      } else {
         updateSelection('font', 'Poppins');
      }

      setCurrentStep(1); 
    } catch (error) {
      console.error("Gemini API çağrısı veya JSON ayrıştırma hatası:", error);
       updateAISuggestions({
        features: ["Özellik A (hata durumu)", "Özellik B (hata durumu)"],
        appName: `Benim ${prompt.substring(0,15)} Uygulamam (Hata)`,
        font: 'Poppins', 
        fontReason: 'Hata nedeniyle varsayılan font.',
      });
      if (!selections.appName) {
        updateSelection('appName', `Benim ${prompt.substring(0,15)} Uygulamam (Hata)`);
      }
      updateSelection('font', 'Poppins'); 
      setCurrentStep(1); 
    } finally {
      setIsLoading(false);
    }
  };

  const generateContextFile = useCallback(async () => {
    if (!selections.paymentSuccessful) {
      console.warn("Ödeme başarılı olmadan context dosyası oluşturulamaz.");
      setGeneratedContext("Ödeme işlemi tamamlanmadığı için içerik oluşturulamadı. Lütfen ödeme adımını tamamlayın.");
      setIsLoading(false); // Ensure loading is stopped
      return;
    }

    setIsLoading(true);
    const {
      userPrompt, aiSuggestions, platform, mobileOS, responsiveDesign,
      devTool, operatingSystem, aiAppModel, aiModelFeatures, aiModelPrice,
      appName: finalAppNameInput, pages, features, includeProfilePic, uiStyle,
      iconStyle, useStroke, colorPaletteId, font, language
    } = selections;

    const chosenAppName = finalAppNameInput || aiSuggestions.appName || "Benim Uygulamam";

    // Construct detailed prompt for Gemini
    const geminiPrompt = `
You are an AI assistant that generates 'context.md' files for software development projects.
Based on the following user selections, create a comprehensive 'context.md' file in MARKDOWN format.
The file should follow the structure provided below.
If a selection is empty or not applicable (e.g. mobileOS when platform is Web), state 'Belirtilmedi' or 'Uygulanamaz' or adapt the text accordingly as shown in the template.
Use the actual app name provided by the user, or the AI suggested one if not provided.
The entire response should be ONLY the markdown content, starting with '# {{Uygulama Adı}} - context.md'. Do not include any other explanatory text.

KULLANICI SEÇİMLERİ:
- Kullanıcı Fikri: "${userPrompt}"
- Platform: "${platform || 'Belirtilmedi'}"
- Mobil İşletim Sistemi: "${platform === 'Mobile' && mobileOS ? mobileOS : 'Uygulanamaz'}"
- Duyarlı Tasarım (Web için): ${platform === 'Web' ? (responsiveDesign ? 'Evet' : 'Hayır') : 'Uygulanamaz'}
- Geliştirme Aracı: "${devTool || 'Belirtilmedi'}"
- İşletim Sistemi (Geliştirme için): "${(devTool === 'Cursor' || devTool === 'Windsurf') && operatingSystem ? operatingSystem : 'Uygulanamaz'}"
- Uygulama için AI Modeli: "${aiAppModel || 'Belirtilmedi'}"
- AI Model Özellikleri: "${aiAppModel && aiModelFeatures ? aiModelFeatures : 'Belirtilmedi'}"
- AI Model Fiyatlandırma/Notlar: "${aiAppModel && aiModelPrice ? aiModelPrice : 'Belirtilmedi'}"
- Uygulama Adı: "${chosenAppName}"
- Ana Sayfalar/Ekranlar: ${pages.length > 0 ? pages.join(', ') : 'Belirtilmedi'}
- Temel Özellikler: ${features.length > 0 ? features.join(', ') : (aiSuggestions.features.length > 0 ? aiSuggestions.features.join(', ') + ' (AI Önerisi)' : 'Belirtilmedi')}
- Profil Resmi Özelliği: ${includeProfilePic ? 'Evet' : 'Hayır'}
- UI Köşe Stili: "${uiStyle || 'Belirtilmedi'}"
- İkon Stili: "${iconStyle || 'Belirtilmedi'}"
- UI Elemanlarında Stroke/Outline Kullanımı: ${useStroke ? 'Evet' : 'Hayır'}
- Renk Paleti ID: "${colorPaletteId || 'Belirtilmedi'}"
- Yazı Tipi: "${font || 'Belirtilmedi'}"
- AI Önerilen Yazı Tipi Nedeni: "${font === aiSuggestions.font && aiSuggestions.fontReason ? aiSuggestions.fontReason : 'Belirtilmedi'}"
- Birincil Dil: "${language || 'Belirtilmedi'}"

context.md ŞABLONU:

# ${chosenAppName} - context.md

## 0. Kullanıcı Fikri/Prompt
${userPrompt}

## 1. Platform Seçimi
- Platform: ${platform || 'Belirtilmedi'}
${platform === 'Mobile' ? `- Mobil İşletim Sistemi: ${mobileOS || 'Belirtilmedi'}\n` : ''}${platform === 'Web' ? `- Duyarlı Tasarım: ${responsiveDesign ? 'Evet' : 'Hayır'}\n` : ''}
## 2. Geliştirme Aracı
- Araç: ${devTool || 'Belirtilmedi'}

## 3. İşletim Sistemi (Gerekliyse)
${(devTool === 'Cursor' || devTool === 'Windsurf') ? `- OS: ${operatingSystem || 'Belirtilmedi'}\n` : '- İşletim sistemi seçimi bu geliştirme aracı için geçerli değil.'}
${(devTool === 'Cursor' || devTool === 'Windsurf') && operatingSystem === 'macOS' ? `- Öneri: Native modüller için iOS Simulator ve Xcode kullanın.\n` : ''}${(devTool === 'Cursor' || devTool === 'Windsurf') && operatingSystem === 'Windows' ? `- Öneri: Test için Expo Go kullanın; belirli araçlar için WSL2 kurulumunu sağlayın.\n` : ''}
## 4. Uygulama için AI Modeli (Gerekliyse)
${aiAppModel ? `- Model: ${aiAppModel}\n` : '- Uygulamanın temel işlevselliği için belirli bir AI modeli seçilmedi.'}
${aiAppModel && aiModelFeatures ? `- Anahtar Özellikler: ${aiModelFeatures}\n` : ''}${aiAppModel && aiModelPrice ? `- Fiyatlandırma/Notlar: ${aiModelPrice}\n` : ''}
## 5. Sayfalar & Özellikler
- Uygulama Adı: ${chosenAppName}
- Anahtar Sayfalar: ${pages.length > 0 ? pages.join(', ') : 'Belirtilmedi'}
- Temel Özellikler: ${features.length > 0 ? features.join(', ') : (aiSuggestions.features.length > 0 ? aiSuggestions.features.join(', ') + ' (AI Önerisi)' : 'Belirtilmedi')}
- Profil Resmi Yükleme/Gösterme Özelliği: ${includeProfilePic ? 'Evet' : 'Hayır'}

## 6. Tasarım Seçimleri
- UI Köşe Stili: ${uiStyle || 'Belirtilmedi'}
- İkon Stili: ${iconStyle || 'Belirtilmedi'}
- UI Elemanlarında Stroke/Outline Kullanımı: ${useStroke ? 'Evet' : 'Hayır'}

## 7. Renk Paleti
- Seçilen Palet ID: ${colorPaletteId || 'Belirtilmedi'}

## 8. Yazı Tipi Seçimi
- Yazı Tipi: ${font || 'Belirtilmedi'}
${font === aiSuggestions.font && aiSuggestions.fontReason ? `- Sebep (AI Önerisi): ${aiSuggestions.fontReason}\n` : ''}
## 9. Dil Desteği
- Birincil Dil: ${language || 'Belirtilmedi'}
${language ? `- UI Notları: Otomatik düzen uyumluluğunu sağlayın; yerelleştirme için metin genişlemesini göz önünde bulundurun.\n` : ''}
## Cursor AI Entegrasyon Notları
1. Bu içeriği projenizin kök dizinine 'context.md' olarak kaydedin.
2. Cursor'da Ctrl+K (Cmd+K) kullanın ve 'Insert File' yazıp context.md dosyasını seçin veya 'Auto Context' özelliğinin aktif olduğundan emin olun.
3. Cursor sohbetinde '@context' yazarak bu dosyaya referans verebilirsiniz.
`;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = GEMINI_MODEL_TEXT;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: geminiPrompt,
         // config: { systemInstruction: "You are an expert context.md generator." } // Optional: A simpler system instruction if the main prompt is very detailed.
      });

      let contextText = response.text.trim();
      // Remove potential markdown fences if Gemini wraps the output
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = contextText.match(fenceRegex);
      if (match && match[2]) {
        contextText = match[2].trim();
      }

      setGeneratedContext(contextText);
    } catch (error) {
      console.error("Gemini API ile context.md oluşturma hatası:", error);
      setGeneratedContext(`# Hata\n\nContext dosyası oluşturulurken bir hata oluştu: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  }, [selections]);


  return (
    <AppContext.Provider value={{ 
      selections, updateSelection, updateAISuggestions,
      currentStep, setCurrentStep, 
      isLoading, setIsLoading, 
      generatedContext, setGeneratedContext,
      generateContextFile, submitPrompt, resetSelections,
      handlePaymentSuccess
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
