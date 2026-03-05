import React, { useRef, ChangeEvent, useState } from 'react';
import { CameraCapture } from './CameraCapture';
import { useTranslation } from 'react-i18next';

interface Props {
  onImageSelect: (file: File) => void;
  disabled: boolean;
}

export const ImageUpload: React.FC<Props> = ({ onImageSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { t } = useTranslation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = (file: File) => {
    onImageSelect(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={handleUploadClick}
          disabled={disabled}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📤 {t('upload.uploadButton')}
        </button>
        
        <button
          onClick={() => setShowCamera(true)}
          disabled={disabled}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📷 {t('upload.cameraButton')}
        </button>
      </div>
      
      <p className="text-sm text-gray-600 text-center">
        {t('upload.description')}
      </p>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};