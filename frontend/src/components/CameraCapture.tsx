import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

interface Props {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export const CameraCapture: React.FC<Props> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const use = async () => {
    if (imgSrc) {
      // Convert base64 to File
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      onCapture(file);
      onClose();
    }
  };

  const videoConstraints = {
    facingMode: { ideal: "environment" } // Use back camera on mobile
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📸 Camera Capture</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="relative">
          {!imgSrc ? (
            <div className="rounded-lg overflow-hidden bg-black">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full"
              />
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <img src={imgSrc} alt="Captured" className="w-full" />
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {!imgSrc ? (
            <>
              <button
                onClick={capture}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                📷 Capture Photo
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={use}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                ✓ Use This Photo
              </button>
              <button
                onClick={retake}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                🔄 Retake
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};