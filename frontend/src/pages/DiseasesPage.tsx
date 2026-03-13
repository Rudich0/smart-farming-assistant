import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

interface Props {
  language: 'en' | 'ne';
}

interface Disease {
  id: string;
  name: string;
  crop: string;
  severity: string;
}

export const DiseasesPage: React.FC<Props> = ({ language }) => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/diseases`);
      const data = await response.json();
      if (data.success) {
        setDiseases(data.diseases);
      }
    } catch (error) {
      console.error('Failed to fetch diseases:', error);
    }
    setLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'very high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'none':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Get unique crops
  const crops = ['all', ...Array.from(new Set(diseases.map(d => d.crop)))];

  // Filter diseases
  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || disease.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  // Group by crop
  const groupedDiseases = filteredDiseases.reduce((acc, disease) => {
    if (!acc[disease.crop]) {
      acc[disease.crop] = [];
    }
    acc[disease.crop].push(disease);
    return acc;
  }, {} as Record<string, Disease[]>);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading diseases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            {language === 'en' ? '🦠 Supported Diseases' : '🦠 समर्थित रोगहरू'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'en' 
              ? `Our system can detect ${diseases.length} different plant diseases`
              : `हाम्रो प्रणालीले ${diseases.length} विभिन्न बिरुवा रोगहरू पत्ता लगाउन सक्छ`
            }
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder={language === 'en' ? '🔍 Search diseases or crops...' : '🔍 रोग वा बाली खोज्नुहोस्...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Crop Filter */}
          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="all">
                {language === 'en' ? '🌾 All Crops' : '🌾 सबै बाली'}
              </option>
              {crops.slice(1).map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">{diseases.length}</div>
            <div className="text-sm text-gray-600 mt-1">
              {language === 'en' ? 'Total Diseases' : 'कुल रोगहरू'}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center border-2 border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{crops.length - 1}</div>
            <div className="text-sm text-gray-600 mt-1">
              {language === 'en' ? 'Crop Types' : 'बाली प्रकार'}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center border-2 border-purple-200">
            <div className="text-3xl font-bold text-purple-700">
              {diseases.filter(d => d.name.toLowerCase().includes('healthy')).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {language === 'en' ? 'Healthy Classes' : 'स्वस्थ वर्ग'}
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center border-2 border-orange-200">
            <div className="text-3xl font-bold text-orange-700">
              {diseases.filter(d => !d.name.toLowerCase().includes('healthy')).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {language === 'en' ? 'Disease Classes' : 'रोग वर्ग'}
            </div>
          </div>
        </div>

        {/* Disease List */}
        {filteredDiseases.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {language === 'en' ? 'No diseases found matching your search' : 'तपाईंको खोजसँग मिल्दो कुनै रोग फेला परेन'}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedDiseases).map(([crop, cropDiseases]) => (
              <div key={crop}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🌱</span>
                  <span>{crop}</span>
                  <span className="text-sm font-normal text-gray-500">
                    ({cropDiseases.length} {language === 'en' ? 'diseases' : 'रोगहरू'})
                  </span>
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cropDiseases.map((disease) => (
                    <div
                      key={disease.id}
                      className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 flex-1">
                          {disease.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getSeverityColor(disease.severity)}`}>
                          {disease.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {disease.crop}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};