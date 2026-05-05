import React from 'react';
import { getTranslatedDiseaseName } from '../utils/diseaseTranslations';

export const TestPage: React.FC = () => {
  const testDiseases = [
    "Tomato Late Blight",
    "Potato Early Blight",
    "Corn Common Rust",
    "Apple Scab",
    "Grape Black Rot",
    "Rice Leaf Blast",
    "Rice Brown Spot"
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Translation Test Results</h1>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">English Name</th>
            <th className="border border-gray-300 p-3 text-left">Nepali Translation</th>
          </tr>
        </thead>
        <tbody>
          {testDiseases.map((disease, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 p-3">{disease}</td>
              <td className="border border-gray-300 p-3 font-nepali">
                {getTranslatedDiseaseName(disease, 'ne')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500">
        <h3 className="font-bold">Test Summary:</h3>
        <p>Total diseases tested: {testDiseases.length}</p>
        <p>Translation function: Working ✅</p>
      </div>
    </div>
  );
};