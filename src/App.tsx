import React from 'react';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">AI Context Builder</h1>
            <p className="text-gray-600 mt-2">Generate custom context files for AI development tools</p>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to AI Context Builder</h2>
                <p className="text-gray-600">
                  Create custom context files for your AI development projects. 
                  Our wizard will guide you through selecting the right tools, frameworks, and features for your application.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Step-by-step project configuration
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      AI-powered suggestions
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Custom context file generation
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Compatible with Cursor, Windsurf, and more
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">How it works</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                      <div>
                        <h4 className="font-medium text-gray-900">Describe your app idea</h4>
                        <p className="text-sm text-gray-600">Tell us about your project vision and requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                      <div>
                        <h4 className="font-medium text-gray-900">Choose your tech stack</h4>
                        <p className="text-sm text-gray-600">Select platforms, frameworks, and tools</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                      <div>
                        <h4 className="font-medium text-gray-900">Get your context file</h4>
                        <p className="text-sm text-gray-600">Download and use with your AI development tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Start Building Your Context File
                </button>
                <p className="text-sm text-gray-500 mt-2">Only $1 - Generate unlimited context files</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 AI Context Builder. Built with React and Tailwind CSS.</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;