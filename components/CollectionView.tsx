"use client";

import { Post } from '@/lib/storage';
import { calculateLevel } from '@/lib/level';

interface CollectionViewProps {
  posts: Post[];
  onClose: () => void;
}

export default function CollectionView({ posts, onClose }: CollectionViewProps) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
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

        {/* Grid Layout */}
        <div className="p-4">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
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

                {/* Text labels with background */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="inline-block bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded mb-1">
                    {formatDate(post.date)}
                  </div>
                  <div className="bg-black/70 text-white text-sm px-2 py-1 rounded line-clamp-2">
                    {post.text}
                  </div>
                </div>
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
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
