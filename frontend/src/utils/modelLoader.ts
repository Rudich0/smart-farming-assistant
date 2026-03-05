const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
export const classifyImage = async (
  file: File
): Promise<{ className: string; confidence: number }[]> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${BACKEND_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.predictions;
};