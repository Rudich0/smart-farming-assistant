import React from 'react';

interface Props {
  language: 'en' | 'ne';
}

export const HowItWorksPage: React.FC<Props> = ({ language }) => {
  const steps = [
    {
      number: 1,
      icon: '📤',
      title: { en: 'Upload Image', ne: 'तस्बिर अपलोड गर्नुहोस्' },
      description: { 
        en: 'Take a clear photo of the affected plant leaf or upload an existing image from your device.',
        ne: 'प्रभावित बिरुवाको पातको स्पष्ट फोटो लिनुहोस् वा आफ्नो उपकरणबाट अवस्थित छवि अपलोड गर्नुहोस्।'
      }
    },
    {
      number: 2,
      icon: '🔬',
      title: { en: 'AI Analysis', ne: 'AI विश्लेषण' },
      description: { 
        en: 'Our deep learning model analyzes the image using MobileNetV2 architecture trained on 54,000 images.',
        ne: 'हाम्रो गहिरो शिक्षण मोडेलले ५४,००० छविहरूमा तालिम प्राप्त MobileNetV2 वास्तुकला प्रयोग गरेर छवि विश्लेषण गर्दछ।'
      }
    },
    {
      number: 3,
      icon: '📊',
      title: { en: 'Get Results', ne: 'परिणामहरू प्राप्त गर्नुहोस्' },
      description: { 
        en: 'Receive instant predictions with confidence scores showing the most likely diseases affecting your crop.',
        ne: 'तपाईंको बालीलाई असर गर्ने सम्भावित रोगहरू देखाउने विश्वास स्कोरहरूसहित तत्काल भविष्यवाणीहरू प्राप्त गर्नुहोस्।'
      }
    },
    {
      number: 4,
      icon: '📖',
      title: { en: 'Learn & Treat', ne: 'सिक्नुहोस् र उपचार गर्नुहोस्' },
      description: { 
        en: 'Access detailed information about symptoms, causes, treatment options, and prevention methods.',
        ne: 'लक्षणहरू, कारणहरू, उपचार विकल्पहरू, र रोकथाम विधिहरूको बारेमा विस्तृत जानकारी पहुँच गर्नुहोस्।'
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            {language === 'en' ? 'How It Works' : 'यो कसरी काम गर्छ'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'en' 
              ? 'Simple 4-step process to detect plant diseases'
              : 'बिरुवाको रोगहरू पत्ता लगाउन सरल ४-चरण प्रक्रिया'
            }
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{step.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {step.title[language]}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description[language]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {language === 'en' ? '🧠 Behind the Scenes' : '🧠 पर्दा पछाडि'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">
                {language === 'en' ? 'MobileNetV2' : 'MobileNetV2'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'en'
                  ? 'Efficient CNN architecture optimized for mobile and web deployment'
                  : 'मोबाइल र वेब तैनातीको लागि अनुकूलित कुशल CNN वास्तुकला'
                }
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Transfer Learning' : 'स्थानान्तरण शिक्षा'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'en'
                  ? 'Pre-trained on ImageNet, fine-tuned on agricultural disease dataset'
                  : 'ImageNet मा पूर्व-प्रशिक्षित, कृषि रोग डाटासेटमा फाइन-ट्युन गरिएको'
                }
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Real-time' : 'वास्तविक-समय'}
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'en'
                  ? 'Fast predictions in 2-3 seconds with cloud-based processing'
                  : 'क्लाउड-आधारित प्रशोधनको साथ २-३ सेकेन्डमा छिटो भविष्यवाणीहरू'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Accuracy Info */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-600">
          <h3 className="font-bold text-gray-800 mb-2 text-lg">
            {language === 'en' ? '🎯 Accuracy & Performance' : '🎯 शुद्धता र प्रदर्शन'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold text-green-700">88.54%</div>
              <div className="text-gray-600">
                {language === 'en' ? 'Test Accuracy' : 'परीक्षण शुद्धता'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">97.20%</div>
              <div className="text-gray-600">
                {language === 'en' ? 'Top-3 Accuracy' : 'शीर्ष-३ शुद्धता'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">0.3493</div>
              <div className="text-gray-600">
                {language === 'en' ? 'Test Loss' : 'परीक्षण हानि'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};