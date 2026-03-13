import React from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

interface Props {
  language: 'en' | 'ne';
}

export const Footer: React.FC<Props> = ({ language }) => {
  return (
    <footer className="mt-12 pt-8 border-t-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              🌾 Smart Farming Assistant
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {language === 'en'
                ? 'AI-powered plant disease detection with 88.54% accuracy. Supporting farmers with instant diagnosis and treatment recommendations.'
                : 'AI-संचालित बिरुवा रोग पत्ता लगाउने ८८.५४% शुद्धताका साथ। तत्काल निदान र उपचार सिफारिसहरूको साथ किसानहरूलाई समर्थन गर्दै।'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">
              {language === 'en' ? 'Quick Links' : 'द्रुत लिङ्कहरू'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                  {language === 'en' ? '🏠 Home' : '🏠 होम'}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  {language === 'en' ? 'ℹ️ About' : 'ℹ️ बारेमा'}
                </a>
              </li>
              <li>
                <a href="/diseases" className="text-gray-600 hover:text-green-600 transition-colors">
                  {language === 'en' ? '🦠 Diseases' : '🦠 रोगहरू'}
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-600 hover:text-green-600 transition-colors">
                  {language === 'en' ? '❓ Help' : '❓ मद्दत'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">
              {language === 'en' ? 'Connect' : 'जडान गर्नुहोस्'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/Rudich0/smart-farming-assistant" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  <span>📁</span> GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href={`${BACKEND_URL}/health`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  <span>🟢</span> API Status
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Rudich0/smart-farming-assistant/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  <span>🐛</span> Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="text-center md:text-left">
              <p className="font-semibold">
                {language === 'en' ? 'Created by' : 'द्वारा निर्मित'} <span className="text-green-700">Rudich Chhantel</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Student ID: 77466802 | BSc (Hons) Computing - Level 6 | 2025/2026
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500">
                © 2026 Smart Farming Assistant
              </p>
              <p className="text-xs text-gray-500">
                {language === 'en' ? 'Academic Project' : 'शैक्षिक परियोजना'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};