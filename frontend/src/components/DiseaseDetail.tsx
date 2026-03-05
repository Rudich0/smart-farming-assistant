import React from 'react';

interface Disease {
  disease_id: string;
  common_name: string;
  scientific_name: string;
  crop: string;
  severity: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  organic_treatment: string[];
  when_to_treat: string;
}

interface Props {
  disease: Disease;
  onClose: () => void;
}

export const DiseaseDetail: React.FC<Props> = ({ disease, onClose }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{disease.common_name}</h2>
              <p className="text-green-100 italic text-sm">{disease.scientific_name}</p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  🌱 {disease.crop}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(disease.severity)}`}>
                  ⚠️ {disease.severity} Severity
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">{disease.description}</p>
          </div>

          {/* Symptoms */}
          <div className="bg-red-50 rounded-xl p-5">
            <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
              🔍 Symptoms to Look For
            </h3>
            <ul className="space-y-2">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="bg-orange-50 rounded-xl p-5">
            <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
              🦠 What Causes It
            </h3>
            <ul className="space-y-2">
              {disease.causes.map((cause, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment */}
          <div className="bg-blue-50 rounded-xl p-5">
            <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
              💊 Treatment Options
            </h3>
            <ul className="space-y-2">
              {disease.treatment.map((treat, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700">{treat}</span>
                </li>
              ))}
            </ul>
            {disease.when_to_treat && (
              <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">⏰ Best Time:</span> {disease.when_to_treat}
                </p>
              </div>
            )}
          </div>

          {/* Organic Treatment */}
          {disease.organic_treatment && disease.organic_treatment.length > 0 && (
            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                🌿 Organic Treatment Options
              </h3>
              <ul className="space-y-2">
                {disease.organic_treatment.map((treat, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">🌱</span>
                    <span className="text-gray-700">{treat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prevention */}
          <div className="bg-purple-50 rounded-xl p-5">
            <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
              🛡️ Prevention Tips
            </h3>
            <ul className="space-y-2">
              {disease.prevention.map((prev, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">{prev}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl border-t">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};