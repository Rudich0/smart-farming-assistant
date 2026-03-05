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
      const response = await fetch(`http://localhost:5000/disease-info/${diseaseId}`);
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