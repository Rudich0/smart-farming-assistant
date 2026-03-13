import React from 'react';
import { getTranslatedDiseaseName } from '../utils/diseaseTranslations';

interface Result {
  className: string;
  confidence: number;
}

interface Props {
  results: Result[];
  isAnalyzing: boolean;
  onLearnMore?: (className: string) => void;
}

const ResultsPanel: React.FC<Props> = ({ results, isAnalyzing, onLearnMore }) => {
  
  if (isAnalyzing) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl animate-spin mb-3">🔬</div>
        <p className="text-green-700 font-semibold text-lg">Analyzing crop...</p>
      </div>
    );
  }

  if (results.length === 0) return null;

  const top = results[0];
  const isHealthy = top.className.toLowerCase().includes('healthy');

  return (
    <div className="mt-6 space-y-4">
      <div className={`p-5 rounded-2xl text-center shadow-sm
        ${isHealthy ? 'bg-green-100 border border-green-300'
                    : 'bg-red-100 border border-red-300'}`}>
        <p className="text-4xl mb-2">{isHealthy ? '✅' : '⚠️'}</p>
        <p className="text-2xl font-bold text-gray-800">
          {top.className}
        </p>
        <p className="text-gray-500 mt-1">
          {(top.confidence * 100).toFixed(1)}% confidence
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-400 uppercase mb-3">
          Top 5 Predictions
        </p>
        {results.slice(0, 5).map((r, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">
                {r.className}
              </span>
              <span className="font-semibold text-gray-600">
                {(r.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all
                  ${i === 0 ? 'bg-green-500' : 'bg-green-300'}`}
                style={{ width: `${r.confidence * 100}%` }}
              />
            </div>
            {onLearnMore && (
              <button
                onClick={() => onLearnMore(r.className)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                📖 Learn More →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Analyze Another Button */}
      {results.length > 0 && (
        <div className="mt-6 text-center border-t border-gray-200 pt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg 
                     hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 
                     font-semibold shadow-md hover:shadow-lg"
          >
            🔄 Analyze Another Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;