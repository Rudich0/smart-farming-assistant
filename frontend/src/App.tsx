import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ImageUpload } from './components/ImageUpload';
import ResultsPanel from './components/ResultsPanel';
import { classifyImage } from './utils/modelLoader';
import { DiseaseInfoModal } from './components/DiseaseInfoModal';
import { Toast } from './components/Toast';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DiseasesPage } from './pages/DiseasesPage';
import { HelpPage } from './pages/HelpPage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Home Page Component
function HomePage({ language }: { language: 'en' | 'ne' }) {
  const [classNames, setClassNames] = useState<string[]>([]);
  const [results, setResults] = useState<{ className: string; confidence: number }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDiseaseInfo, setSelectedDiseaseInfo] = useState<any>(null);
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'|'info'} | null>(null);

  const t = (key: string) => {
    const translations: any = {
      en: {
        title: 'Smart Farming Assistant',
        subtitle: 'Upload a crop photo to detect diseases instantly',
        uploadedImage: 'Uploaded Image',
        poweredBy: 'Powered by MobileNetV2',
        classes: 'disease classes'
      },
      ne: {
        title: 'स्मार्ट खेती सहायक',
        subtitle: 'रोग पत्ता लगाउन बालीको फोटो अपलोड गर्नुहोस्',
        uploadedImage: 'अपलोड गरिएको तस्बिर',
        poweredBy: 'MobileNetV2 द्वारा संचालित',
        classes: 'रोग वर्गहरू'
      }
    };
    return translations[language]?.[key] || key;
  };

  useEffect(() => {
    fetch('/class_names.json')
      .then((r) => r.json())
      .then(setClassNames)
      .catch(console.error);
  }, []);

  const handleImage = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    setResults([]);
    try {
      const preds = await classifyImage(file);
      setResults(preds);
      setToast({ message: 'Analysis complete!', type: 'success' });
    } catch (e: any) {
      console.error(e);
      setToast({ message: 'Analysis failed. Please try again.', type: 'error' });
    }
    setIsAnalyzing(false);
  };

  const handleLearnMore = async (className: string) => {
    try {
      const diseaseId = className.toLowerCase().replace(/ /g, '_');
      const response = await fetch(`${BACKEND_URL}/disease-info/${diseaseId}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedDiseaseInfo(data.disease);
        setShowDiseaseModal(true);
      } else {
        setToast({ message: 'Disease information not found', type: 'error' });
      }
    } catch (error) {
      console.error('Error fetching disease info:', error);
      setToast({ message: 'Failed to load disease information', type: 'error' });
    }
  };

  return (
    <>
      {/* Demo Mode Notice */}
      <div className="max-w-xl mx-auto mb-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
          <div className="flex items-start">
            <span className="text-2xl mr-3">ℹ️</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-800 mb-1">
                {language === 'en' ? 'Demo Mode' : 'डेमो मोड'}
              </p>
              <p className="text-xs text-yellow-700">
                {language === 'en' 
                  ? 'This online version shows simulated predictions. For real 88.54% accurate results, run locally with the actual trained model.'
                  : 'यो अनलाइन संस्करणले नक्कली भविष्यवाणीहरू देखाउँछ। वास्तविक ८८.५४% सटीक परिणामहरूको लागि, वास्तविक प्रशिक्षित मोडेलको साथ स्थानीय रूपमा चलाउनुहोस्।'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">
            🌾 {t('title')}
          </h1>
          <p className="text-gray-500 mt-2">
            {t('subtitle')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <ImageUpload
            onImageSelect={handleImage}
            disabled={isAnalyzing}
          />

          {selectedImage && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {t('uploadedImage')}:
              </h3>
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Uploaded crop" 
                  className={`w-full max-h-96 object-contain rounded-lg border-2 border-gray-200 bg-gray-50 transition-all
                    ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                    <div className="bg-white px-6 py-4 rounded-lg shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        <span className="text-gray-700 font-semibold">Analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
                {!isAnalyzing && (
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResults([]);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          <ResultsPanel
            results={results}
            isAnalyzing={isAnalyzing}
            onLearnMore={handleLearnMore}
          />
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          {t('poweredBy')} • {classNames.length} {t('classes')}
        </p>
      </div>

      {/* Footer */}
      <footer className="max-w-xl mx-auto mt-12 pt-6 border-t border-gray-300">
        <div className="text-center text-gray-600 space-y-2">
          <p className="text-sm font-semibold">
            {language === 'en' ? 'Created by' : 'द्वारा निर्मित'} Rudich Chhantel
          </p>
          <p className="text-xs text-gray-500">
            Student ID: 77466802 | BSc (Hons) Computing - Level 6
          </p>
          <div className="flex justify-center gap-4 mt-3 text-sm">
            <a 
              href="https://github.com/Rudich0/smart-farming-assistant" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              GitHub
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href={`${BACKEND_URL}/health`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              API Status
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            © 2026 Smart Farming Assistant • Academic Project
          </p>
        </div>
      </footer>

      {showDiseaseModal && selectedDiseaseInfo && (
        <DiseaseInfoModal
          diseaseInfo={selectedDiseaseInfo}
          onClose={() => {
            setShowDiseaseModal(false);
            setSelectedDiseaseInfo(null);
          }}
        />
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
}

// Main App Component
function App() {
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  useEffect(() => {
    const handleLanguageChange = (e: any) => {
      setLanguage(e.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ne' : 'en';
    setLanguage(newLang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
        {/* Navigation */}
        <Navigation language={language} onLanguageToggle={toggleLanguage} />
        
        {/* Main Content */}
        <main className="flex-1 px-6 pb-6">
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="/how-it-works" element={<HowItWorksPage language={language} />} />
            <Route path="/diseases" element={<DiseasesPage language={language} />} />
            <Route path="/help" element={<HelpPage language={language} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer language={language} />
      </div>
    </BrowserRouter>
  );
}

export default App;