import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  language: 'en' | 'ne';
}

export const HelpPage: React.FC<Props> = ({ language }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: {
        en: 'How accurate is the disease detection?',
        ne: 'रोग पत्ता लगाउने कत्तिको सटीक छ?'
      },
      answer: {
        en: 'Our AI model achieves 88.54% accuracy on test data and 97.20% top-3 accuracy. This means the correct disease appears in the top 3 predictions 97% of the time.',
        ne: 'हाम्रो AI मोडेलले परीक्षण डाटामा ८८.५४% शुद्धता र ९७.२०% शीर्ष-३ शुद्धता प्राप्त गर्दछ। यसको मतलब सही रोग ९७% समय शीर्ष ३ भविष्यवाणीहरूमा देखा पर्दछ।'
      }
    },
    {
      question: {
        en: 'What image quality should I use?',
        ne: 'मैले कस्तो गुणस्तरको छवि प्रयोग गर्नुपर्छ?'
      },
      answer: {
        en: 'Use clear, well-lit photos showing the affected leaf area. Avoid blurry, dark, or distant shots. Close-up photos of diseased areas work best.',
        ne: 'प्रभावित पात क्षेत्र देखाउने स्पष्ट, राम्रो उज्यालो फोटोहरू प्रयोग गर्नुहोस्। धमिलो, अँध्यारो, वा टाढाका शटहरू नराख्नुहोस्। रोगग्रस्त क्षेत्रहरूको क्लोज-अप फोटोहरू राम्रो काम गर्छन्।'
      }
    },
    {
      question: {
        en: 'Which crops are supported?',
        ne: 'कुन बालीहरू समर्थित छन्?'
      },
      answer: {
        en: 'We support 13 different crops: Tomato, Potato, Corn, Apple, Grape, Peach, Pepper, Strawberry, Cherry, Blueberry, Raspberry, Soybean, and Squash.',
        ne: 'हामी १३ विभिन्न बाली समर्थन गर्छौं: टमाटर, आलु, मकै, स्याउ, अंगूर, आरु, खुर्सानी, स्ट्रबेरी, चेरी, ब्लुबेरी, रास्पबेरी, भटमास, र स्क्वास।'
      }
    },
    {
      question: {
        en: 'Can I use this offline?',
        ne: 'के म यसलाई अफलाइन प्रयोग गर्न सक्छु?'
      },
      answer: {
        en: 'The web version requires internet connection. However, you can download and run the application locally on your computer for offline use.',
        ne: 'वेब संस्करणलाई इन्टरनेट जडान आवश्यक छ। यद्यपि, तपाईं अफलाइन प्रयोगको लागि आफ्नो कम्प्युटरमा स्थानीय रूपमा अनुप्रयोग डाउनलोड र चलाउन सक्नुहुन्छ।'
      }
    },
    {
      question: {
        en: 'Is my data stored or shared?',
        ne: 'के मेरो डाटा भण्डारण वा साझा गरिएको छ?'
      },
      answer: {
        en: 'No. All images are processed in real-time and not stored. We do not collect or share any personal data. Your privacy is fully protected.',
        ne: 'होइन। सबै छविहरू वास्तविक-समयमा प्रशोधन गरिन्छ र भण्डारण गरिँदैन। हामी कुनै व्यक्तिगत डाटा सङ्कलन वा साझा गर्दैनौं। तपाईंको गोपनीयता पूर्ण रूपमा सुरक्षित छ।'
      }
    },
    {
      question: {
        en: 'Why are predictions sometimes wrong?',
        ne: 'किन भविष्यवाणीहरू कहिलेकाहीं गलत हुन्छन्?'
      },
      answer: {
        en: 'Accuracy depends on image quality, lighting, and disease stage. Some diseases look similar. Always verify with multiple images and consult agricultural experts for confirmation.',
        ne: 'शुद्धता छवि गुणस्तर, प्रकाश, र रोग चरणमा निर्भर गर्दछ। केहि रोगहरू समान देखिन्छन्। सधैं धेरै छविहरूसँग प्रमाणित गर्नुहोस् र पुष्टिको लागि कृषि विशेषज्ञहरूसँग परामर्श गर्नुहोस्।'
      }
    },
    {
      question: {
        en: 'How do I switch languages?',
        ne: 'म कसरी भाषा स्विच गर्ने?'
      },
      answer: {
        en: 'Click the 🌐 globe icon in the top-right corner to toggle between English and Nepali. You can also use Ctrl+L keyboard shortcut.',
        ne: 'अंग्रेजी र नेपाली बीच टगल गर्न शीर्ष-दायाँ कुनामा 🌐 ग्लोब आइकनमा क्लिक गर्नुहोस्। तपाईं Ctrl+L किबोर्ड सर्टकट पनि प्रयोग गर्न सक्नुहुन्छ।'
      }
    },
    {
      question: {
        en: 'Can I use the camera on mobile?',
        ne: 'के म मोबाइलमा क्यामेरा प्रयोग गर्न सक्छु?'
      },
      answer: {
        en: 'Yes! The camera feature works on mobile devices. Make sure to allow camera permissions when prompted by your browser.',
        ne: 'हो! क्यामेरा सुविधा मोबाइल उपकरणहरूमा काम गर्दछ। तपाईंको ब्राउजरद्वारा सोधिएको बेला क्यामेरा अनुमति दिन निश्चित गर्नुहोस्।'
      }
    }
  ];

  const quickLinks = [
    {
      icon: '🏠',
      title: { en: 'Home', ne: 'होम' },
      description: { en: 'Start detecting diseases', ne: 'रोगहरू पत्ता लगाउन सुरु गर्नुहोस्' },
      link: '/'
    },
    {
      icon: '⚙️',
      title: { en: 'How It Works', ne: 'यो कसरी काम गर्छ' },
      description: { en: 'Learn about the process', ne: 'प्रक्रियाको बारेमा जान्नुहोस्' },
      link: '/how-it-works'
    },
    {
      icon: '🦠',
      title: { en: 'All Diseases', ne: 'सबै रोगहरू' },
      description: { en: 'Browse supported diseases', ne: 'समर्थित रोगहरू ब्राउज गर्नुहोस्' },
      link: '/diseases'
    },
    {
      icon: 'ℹ️',
      title: { en: 'About', ne: 'बारेमा' },
      description: { en: 'Project information', ne: 'परियोजना जानकारी' },
      link: '/about'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            {language === 'en' ? '❓ Help & FAQ' : '❓ मद्दत र सामान्य प्रश्नहरू'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'en' 
              ? 'Find answers to common questions'
              : 'सामान्य प्रश्नहरूको जवाफ फेला पार्नुहोस्'
            }
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'en' ? '🔗 Quick Links' : '🔗 द्रुत लिङ्कहरू'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-green-50 hover:border-green-300 border-2 border-gray-200 transition-all"
              >
                <span className="text-4xl">{link.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{link.title[language]}</h3>
                  <p className="text-sm text-gray-600">{link.description[language]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'en' ? '💬 Frequently Asked Questions' : '💬 बारम्बार सोधिने प्रश्नहरू'}
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800 pr-4">
                    {faq.question[language]}
                  </span>
                  <span className="text-2xl text-green-600 flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t-2 border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer[language]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                {language === 'en' ? '📧 Still Need Help?' : '📧 अझै मद्दत चाहिन्छ?'}
                </h3>

                <p className="text-gray-700 mb-4">
                {language === 'en'
                    ? 'If you have questions not covered here, feel free to reach out!'
                    : 'यदि तपाईंसँग यहाँ समावेश नभएका प्रश्नहरू छन् भने, सम्पर्क गर्न नहिचकिचाउनुहोस्!'
                }
                </p>

                <div className="flex flex-wrap gap-4">

                <a
                    href="https://github.com/Rudich0/smart-farming-assistant/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                    {language === 'en' ? 'Report an Issue' : 'समस्या रिपोर्ट गर्नुहोस्'}
                </a>

                <a
                    href="https://github.com/Rudich0/smart-farming-assistant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                    {language === 'en' ? 'View on GitHub' : 'GitHub मा हेर्नुहोस्'}
                </a>

                </div>
            </div>
            </div>
      </div>
    </div>
  );
};