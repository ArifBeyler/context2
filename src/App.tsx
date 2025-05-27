import React from 'react';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 pt-8 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Context Builder
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Yapay zeka geliştirme araçların için özel context dosyaları oluştur. 
              <span className="text-yellow-300 font-semibold"> Cursor, Windsurf</span> ve daha fazlası ile uyumlu!
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Hero Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Projeni Dakikalar İçinde Hazırla! ⚡
                </h2>
                <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                  AI destekli sihirbazımız ile platform seçiminden özellik belirlemeye kadar her şeyi kolayca yapılandır.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Destekli Öneriler</h3>
                  <p className="text-purple-200">Gemini AI ile akıllı öneriler ve otomatik yapılandırma</p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Adım Adım Konfigürasyon</h3>
                  <p className="text-purple-200">Kolay wizard ile platform, araç ve özellik seçimi</p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Anında İndirme</h3>
                  <p className="text-purple-200">Özel context dosyanı hemen indir ve kullanmaya başla</p>
                </div>
              </div>

              {/* How it works */}
              <div className="bg-white/5 rounded-2xl p-8 mb-12 border border-white/10">
                <h3 className="text-2xl font-bold text-white text-center mb-8">Nasıl Çalışır? 🚀</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Uygulama Fikrini Anlat</h4>
                      <p className="text-purple-200 text-sm">Proje vizyonunu ve gereksinimlerini detaylı şekilde açıkla</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Teknoloji Yığınını Seç</h4>
                      <p className="text-purple-200 text-sm">Platform, framework ve geliştirme araçlarını belirle</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">3</div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Context Dosyanı Al</h4>
                      <p className="text-purple-200 text-sm">AI geliştirme araçlarında kullanmak üzere indir</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></span>
                  <span className="relative flex items-center">
                    Context Dosyamı Oluştur
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <p className="text-purple-300 mt-4 text-lg">
                  💰 Sadece <span className="text-yellow-300 font-bold">$1</span> - Sınırsız context dosyası oluştur
                </p>
                <p className="text-purple-400 text-sm mt-2">
                  ✨ Demo modunda - gerçek ödeme alınmaz
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white text-center mb-8">Desteklenen Teknolojiler 🛠️</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {['React', 'Vue.js', 'Angular', 'Next.js', 'Flutter', 'React Native', 'Node.js', 'Python', 'TypeScript', 'Tailwind', 'Bootstrap', 'Firebase'].map((tech) => (
                  <div key={tech} className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                    <p className="text-white font-medium">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-black/20 backdrop-blur-lg border-t border-white/10 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-purple-200">
              &copy; 2024 AI Context Builder. 
              <span className="text-yellow-300"> React</span> ve 
              <span className="text-blue-300"> Tailwind CSS</span> ile ❤️ ile yapıldı.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </AppProvider>
  );
}

export default App;