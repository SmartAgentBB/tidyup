"use client";

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Post } from '@/lib/storage';
import { calculateLevel } from '@/lib/level';

interface CollectionViewProps {
  posts: Post[];
  onClose: () => void;
}

export default function CollectionView({ posts, onClose }: CollectionViewProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<'details' | 'complete'>('details');

  const level = calculateLevel(posts.length);
  const gridSize = level; // 2x2 for level 2, 3x3 for level 3, etc.
  const displayCount = gridSize * gridSize;

  // Get oldest posts first for the grid (left-top = oldest)
  const displayPosts = posts.slice(-displayCount).reverse();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleExportImage = async () => {
    if (!gridRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(gridRef.current, {
        width: 900,
        height: 900,
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const today = new Date().toISOString().split('T')[0];
        link.download = `비움챌린지-레벨${level}-${today}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-auto max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                모아보기 - Level {level}
              </h2>
              <p className="text-sm text-gray-600">
                {displayCount}개의 비움 기록
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('details')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                viewMode === 'details'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              날짜와 기록
            </button>
            <button
              onClick={() => setViewMode('complete')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                viewMode === 'complete'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Complete
            </button>
          </div>
        </div>

        {/* Grid Layout - Fixed 900x900px */}
        <div className="p-4 flex justify-center">
          <div
            ref={gridRef}
            className="grid gap-1 relative"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              width: '900px',
              height: '900px',
            }}
          >
            {displayPosts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                {/* Image */}
                <img
                  src={post.image}
                  alt="비움 기록"
                  className="w-full h-full object-cover"
                />

                {/* Text labels with background - only in details mode */}
                {viewMode === 'details' && (
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="inline-block bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded mb-1">
                      {formatDate(post.date)}
                    </div>
                    <div className="bg-black/50 text-white text-sm px-2 py-1 rounded line-clamp-2">
                      {post.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Fill empty slots if needed */}
            {Array.from({ length: displayCount - displayPosts.length }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm">준비 중</span>
              </div>
            ))}

            {/* Complete Mode Overlay */}
            {viewMode === 'complete' && (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700/40 via-orange-800/40 to-yellow-900/40 flex items-center justify-center rounded-lg">
                <h1 className="text-white text-6xl font-bold drop-shadow-lg">
                  Level {level} Complete
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isExporting ? '저장 중...' : '💾 저장'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
