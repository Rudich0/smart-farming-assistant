import React, { useState, useEffect } from 'react';
import { ImageUpload } from './components/ImageUpload';
import ResultsPanel from './components/ResultsPanel';
import { classifyImage } from './utils/modelLoader';
import { DiseaseInfoModal } from './components/DiseaseInfoModal';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const [language, setLanguage] = useState<'en' | 'ne'>('en');
  const [classNames, setClassNames] = useState<string[]>([]);
  const [results, setResults] = useState<{ className: string; confidence: number }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDiseaseInfo, setSelectedDiseaseInfo] = useState<any>(null);
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (e: any) => {
      setLanguage(e.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    fetch('/class_names.json')
      .then((r) => r.json())
      .then(setClassNames)
      .catch(console.error);
  }, []);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Simple translation function
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
    } catch (e: any) {
      console.error(e);
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
        console.error('Disease not found:', className);
      }
    } catch (error) {
      console.error('Error fetching disease info:', error);
    }
  };

  return (
  <>
    <LanguageSwitcher />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      
      {/* Demo Mode Notice*/}
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
                <img 
                  src={selectedImage} 
                  alt="Uploaded crop" 
                  className="w-full rounded-lg border-2 border-gray-200"
                />
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
      </div>
    </>
  );
}

export default App;