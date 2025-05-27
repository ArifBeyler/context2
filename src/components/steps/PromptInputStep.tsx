import * as React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Textarea from '../shared/Textarea';
import Button from '../shared/Button';
import { EXAMPLE_PROMPTS } from '../../constants';
import { ArrowRight, Lightbulb, Sparkles, TerminalSquare } from 'lucide-react';

const PromptInputStep: React.FC = () => {
  const { submitPrompt, isLoading, selections } = useAppContext();
  const [prompt, setPrompt] = React.useState(selections.userPrompt || '');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholderIndex(prevIndex => (prevIndex + 1) % EXAMPLE_PROMPTS.length);
    }, 3000); // Change placeholder every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (prompt.trim()) {
      submitPrompt(prompt.trim());
    }
  }, [prompt, submitPrompt]);

  const handleChipClick = React.useCallback((examplePrompt: string) => {
    setPrompt(examplePrompt);
  }, []);

  const suggestionChips = React.useMemo(() => {
    const uniquePrompts = Array.from(new Set(EXAMPLE_PROMPTS));
    return uniquePrompts.slice(0, 5);
  }, []);

  // Function to clean and format chip text
  const formatChipText = (text: string) => {
    let cleanText = text
      .replace("A smart ", "")
      .replace("An AI-powered ", "")
      .replace("A habit tracking app with ", "Habit tracker with ")
      .replace("An AI recipe generator that ", "Recipe generator that ")
      .replace("A productivity app with ", "Productivity app with ")
      .replace("An AI language learning companion with ", "Language learning with ")
      .replace("A smart workout planner that ", "Workout planner that ")
      .replace("An AI-powered mood tracker with ", "Mood tracker with ")
      .replace("A collaborative project management tool with ", "Project management with ")
      .replace("An AI travel planner that ", "Travel planner that ");
    
    // Capitalize first letter
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    
    // Limit to reasonable length but allow more characters
    if (cleanText.length > 65) {
      cleanText = cleanText.substring(0, 65) + "...";
    }
    
    return cleanText;
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6F9] text-[#292F3B] flex flex-col items-center p-4 sm:p-8 transition-colors duration-300 ease-in-out overflow-y-auto">
      {/* Top Section: Prompt Input Area - Increased top padding significantly */}
      <div className="w-full max-w-xl lg:max-w-2xl text-center pt-[10.5rem] sm:pt-[11.5rem] md:pt-[12.5rem]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Share Your Idea, <span className="text-[#F26545]">We'll Chart the Course.</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10">
          From idea to app in seconds, with your personal full-stack engineer.
        </p>

        <div className="relative mb-6">
          <Textarea
            placeholder={`Ask Ai Context Builder: ${EXAMPLE_PROMPTS[currentPlaceholderIndex].substring(0,40).replace("A mobile app for ","").replace("A web platform for ","").replace("An AI-powered ","")}...`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            disabled={isLoading}
            className="bg-white border-slate-300 placeholder-slate-400 text-[#292F3B] rounded-xl p-4 pr-16 text-lg focus:ring-2 focus:ring-[#F26545] shadow-xl"
            wrapperClassName="mb-0"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            isLoading={isLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 !p-2.5 bg-[#F26545] hover:bg-[#E05434] rounded-lg shadow-md hover:shadow-lg"
            aria-label="Submit prompt"
          >
            <ArrowRight size={20} className="text-white" />
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
          {suggestionChips.map((chipPrompt, index) => (
            <button
              key={index}
              onClick={() => handleChipClick(chipPrompt)}
              className="bg-white hover:bg-slate-100 text-slate-700 hover:text-[#292F3B] px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm cursor-pointer transition-all duration-200 ease-in-out shadow-md hover:shadow-lg border border-slate-200 hover:border-slate-300 max-w-xs text-center leading-relaxed"
              title={chipPrompt} // Show full text on hover
            >
              {formatChipText(chipPrompt)}
            </button>
          ))}
        </div>
      </div>

      {/* New Informational Section */}
      <section className="mt-16 sm:mt-20 md:mt-24 w-full max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#292F3B] mb-12 sm:mb-16">
          Got Brilliant Ideas but No Coding Skills?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center">
            <div className="flex justify-center mb-5">
              <Lightbulb size={48} className="text-[#F26545]" />
            </div>
            <h3 className="text-xl font-semibold text-[#292F3B] mb-3 text-center">Step-by-Step: Idea to Project</h3>
            <p className="text-slate-600 text-sm text-center">
              Ai Context Builder helps you transform your bright ideas into clear, structured project plans without getting bogged down in technical details.
            </p>
          </div>
          {/* Box 2 */}
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center">
            <div className="flex justify-center mb-5">
              <Sparkles size={48} className="text-[#F26545]" />
            </div>
            <h3 className="text-xl font-semibold text-[#292F3B] mb-3 text-center">AI-Powered Suggestions</h3>
            <p className="text-slate-600 text-sm text-center">
              Get smart recommendations from Gemini AI at every stage of your project, from app name and features to font selection and color palettes.
            </p>
          </div>
          {/* Box 3 */}
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center">
            <div className="flex justify-center mb-5">
              <TerminalSquare size={48} className="text-[#F26545]" />
            </div>
            <h3 className="text-xl font-semibold text-[#292F3B] mb-3 text-center">Easy Integration</h3>
            <p className="text-slate-600 text-sm text-center">
              Easily export the generated <code className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-xs font-mono shadow-sm">context.md</code> file to development tools like Cursor.ai and start coding with AI assistance right away.
            </p>
          </div>
        </div>
      </section>

      <p className="text-xs text-slate-500 mt-16 mb-8">
        Powered by Gemini AI & Ai Context Builder
      </p>
    </div>
  );
};

export default PromptInputStep;