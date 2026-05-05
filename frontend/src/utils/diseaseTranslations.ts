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

// Make it available in console for testing
if (typeof window !== 'undefined') {
  (window as any).getTranslatedDiseaseName = getTranslatedDiseaseName;
  (window as any).testTranslations = () => {
    console.log("=".repeat(50));
    console.log("DISEASE TRANSLATION TEST");
    console.log("=".repeat(50));
    
    const testDiseases = [
      "Tomato Late Blight",
      "Potato Early Blight",
      "Corn Common Rust",
      "Apple Scab",
      "Grape Black Rot"
    ];
    
    testDiseases.forEach(disease => {
      console.log(`EN: ${disease}`);
      console.log(`NE: ${getTranslatedDiseaseName(disease, 'ne')}`);
      console.log("-".repeat(30));
    });
    
    console.log("Translation function type:", typeof getTranslatedDiseaseName);
    console.log("Invalid disease test:", getTranslatedDiseaseName("Invalid Disease", 'ne'));
    console.log("=".repeat(50));
  };
}