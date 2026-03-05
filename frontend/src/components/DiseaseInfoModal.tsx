import React from 'react';
import { useTranslation } from 'react-i18next';

interface DiseaseInfo {
  name: string;
  crop: string;
  severity: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  organic_treatment: string[];
}

interface Props {
  diseaseInfo: DiseaseInfo | null;
  onClose: () => void;
}

export const DiseaseInfoModal: React.FC<Props> = ({ diseaseInfo, onClose }) => {
  const { t } = useTranslation();
  if (!diseaseInfo) return null;

  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'very high':
        return 'bg-red-100 text-red-800 border-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-400';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'none':
        return 'bg-blue-100 text-blue-800 border-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {diseaseInfo.name}
              </h2>
              <p className="text-green-100 text-lg">
                {t('disease.crop')}: {diseaseInfo.crop}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
            >
              ✕
            </button>
          </div>
          <div className="mt-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getSeverityColor(diseaseInfo.severity)}`}>
              {t('disease.severity')}: {diseaseInfo.severity}
            </span>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Symptoms */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              🔍 {t('disease.symptoms')}
            </h3>
            <ul className="space-y-2">
              {diseaseInfo.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 font-bold">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              🦠 {t('disease.causes')}
            </h3>
            <ul className="space-y-2">
              {diseaseInfo.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-amber-600 mt-1 font-bold">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              💊 {t('disease.treatment')}
            </h3>
            <ul className="space-y-2">
              {diseaseInfo.treatment.map((treat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 mt-1 font-bold">•</span>
                  <span>{treat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Organic Treatment */}
          {diseaseInfo.organic_treatment && diseaseInfo.organic_treatment.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                🌿 {t('disease.organicTreatment')}
              </h3>
              <ul className="space-y-2">
                {diseaseInfo.organic_treatment.map((organic, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span>{organic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prevention */}
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              🛡️ {t('disease.prevention')}
            </h3>
            <ul className="space-y-2">
              {diseaseInfo.prevention.map((prev, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 mt-1 font-bold">•</span>
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
          >
            {t('disease.close')}
          </button>
        </div>
      </div>
    </div>
  );
};