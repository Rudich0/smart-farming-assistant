import nepalDiseaseNames from '../locales/ne/diseases.json';

export const getTranslatedDiseaseName = (
  englishName: string,
  language: string
): string => {
  if (language !== 'ne') return englishName;

  // Convert disease name to key format
  const key = englishName
    .toLowerCase()
    .replace(/pv /g, '')
    .replace(/ /g, '_');

  return (nepalDiseaseNames as any)[key] || englishName;
};