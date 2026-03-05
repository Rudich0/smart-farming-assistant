export const classifyImage = async (
  file: File
): Promise<{ className: string; confidence: number }[]> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('http://192.168.1.3:5000/predict', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.predictions;
};