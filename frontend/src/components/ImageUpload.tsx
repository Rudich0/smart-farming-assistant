import React, { useRef, useState } from 'react';
import { CameraCapture } from './CameraCapture';

interface Props {
  onImageSelect: (file: File) => void;
  disabled: boolean;
}

export const ImageUpload: React.FC<Props> = ({ onImageSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleCapture = (file: File) => {
    onImageSelect(file);
    setShowCamera(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleUploadClick}
          disabled={disabled}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold
                   hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          📤 Upload Photo
        </button>

        <button
          onClick={() => setShowCamera(true)}
          disabled={disabled}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                   hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          📷 Use Camera
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-sm text-gray-600 text-center">
        Upload a photo or use your camera to detect plant diseases
      </p>

      {showCamera && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};