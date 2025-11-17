"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';

interface PostFormProps {
  onSubmit: (image: string, text: string) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_TEXT_LENGTH = 140;
  const MAX_IMAGE_SIZE = 800; // Maximum width/height in pixels
  const IMAGE_QUALITY = 0.7; // JPEG compression quality (0-1)

  // Compress and resize image to square
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');

          // Make square canvas
          const targetSize = MAX_IMAGE_SIZE;
          canvas.width = targetSize;
          canvas.height = targetSize;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // Calculate crop area (center square)
          const sourceSize = Math.min(img.width, img.height);
          const sourceX = (img.width - sourceSize) / 2;
          const sourceY = (img.height - sourceSize) / 2;

          // Draw cropped and resized square image
          ctx.drawImage(
            img,
            sourceX, sourceY, sourceSize, sourceSize, // Source: center square
            0, 0, targetSize, targetSize              // Destination: full canvas
          );

          // Convert to JPEG with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', IMAGE_QUALITY);
          resolve(compressedBase64);
        };
        img.onerror = () => reject(new Error('이미지 로드 실패'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // Validate file size (10MB limit before compression)
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 크기는 10MB 이하여야 합니다.');
      return;
    }

    try {
      // Compress and resize image
      const compressedBase64 = await compressImage(file);
      setImage(compressedBase64);
      setPreview(compressedBase64);
    } catch (error) {
      console.error('Image compression error:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('사진을 선택해주세요.');
      return;
    }

    if (!text.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    onSubmit(image, text);

    // Reset form
    setText('');
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">새 비움 기록하기</h2>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          사진 선택
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
        />

        {/* Image Preview */}
        {preview && (
          <div className="mt-4 relative">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto max-h-64 rounded-lg mx-auto"
            />
          </div>
        )}
      </div>

      {/* Text Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          무엇을 비웠나요? ({text.length}/{MAX_TEXT_LENGTH})
        </label>
        <textarea
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= MAX_TEXT_LENGTH) {
              setText(e.target.value);
            }
          }}
          placeholder="오늘 비운 것에 대해 간단히 기록해보세요..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          rows={4}
          maxLength={MAX_TEXT_LENGTH}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!image || !text.trim()}
      >
        기록하기
      </button>
    </form>
  );
}
