import React from 'react';

interface Props {
  language: 'en' | 'ne';
}

export const AboutPage: React.FC<Props> = ({ language }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            {language === 'en' ? 'About Smart Farming Assistant' : 'स्मार्ट खेती सहायकको बारेमा'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'en' 
              ? 'AI-powered plant disease detection for farmers'
              : 'किसानहरूको लागि AI-संचालित बिरुवा रोग पत्ता लगाउने'
            }
          </p>
        </div>

        {/* Project Info */}
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {language === 'en' ? '🎯 Project Overview' : '🎯 परियोजना अवलोकन'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? 'Smart Farming Assistant is an AI-powered web application designed to help farmers quickly identify plant diseases. Using advanced deep learning techniques, the system can detect 46 different crop diseases with 88.54% accuracy.'
                : 'स्मार्ट खेती सहायक एक AI-संचालित वेब अनुप्रयोग हो जुन किसानहरूलाई बिरुवाको रोगहरू छिटो पहिचान गर्न मद्दत गर्न डिजाइन गरिएको हो। उन्नत गहिरो शिक्षण प्रविधिहरू प्रयोग गरेर, प्रणालीले ८८.५४% शुद्धताका साथ ४६ विभिन्न बाली रोगहरू पत्ता लगाउन सक्छ।'
              }
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-700">88.54%</div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Accuracy' : 'शुद्धता'}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-700">46</div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Diseases' : 'रोगहरू'}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-700">54K</div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Training Images' : 'तालिम छविहरू'}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-700">2</div>
              <div className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Languages' : 'भाषाहरू'}
              </div>
            </div>
          </div>

          {/* Technology */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {language === 'en' ? '🛠️ Technology Stack' : '🛠️ प्रविधि स्ट्याक'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• React + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• React Router</li>
                  <li>• Deployed on Vercel</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Python Flask</li>
                  <li>• TensorFlow / Keras</li>
                  <li>• MobileNetV2 Model</li>
                  <li>• Deployed on Render</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {language === 'en' ? '👨‍💻 Developer' : '👨‍💻 विकासकर्ता'}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Name:</strong> Rudich Chhantel</p>
              <p className="text-gray-700"><strong>Student ID:</strong> 77466802</p>
              <p className="text-gray-700"><strong>Course:</strong> BSc (Hons) Computing - Level 6</p>
              <p className="text-gray-700"><strong>Year:</strong> 2025/2026</p>
            </div>
          </div>

          {/* Features */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {language === 'en' ? '✨ Key Features' : '✨ मुख्य विशेषताहरू'}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: '🤖', text: language === 'en' ? 'AI Disease Detection' : 'AI रोग पत्ता लगाउने' },
                { icon: '📸', text: language === 'en' ? 'Camera & Upload Support' : 'क्यामेरा र अपलोड समर्थन' },
                { icon: '🌍', text: language === 'en' ? 'Bilingual Interface' : 'द्विभाषी इन्टरफेस' },
                { icon: '📚', text: language === 'en' ? 'Disease Information Database' : 'रोग जानकारी डाटाबेस' },
                { icon: '📱', text: language === 'en' ? 'Mobile Responsive' : 'मोबाइल उत्तरदायी' },
                { icon: '🌐', text: language === 'en' ? 'Online Access' : 'अनलाइन पहुँच' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};