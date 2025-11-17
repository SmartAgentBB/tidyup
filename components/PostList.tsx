"use client";

import { Post } from '@/lib/storage';

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

export default function PostList({ posts, onDelete }: PostListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">아직 기록이 없습니다.</p>
        <p className="text-gray-400 mt-2">첫 비움을 기록해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        비움 기록 ({posts.length})
      </h2>

      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={post.image}
              alt="비움 기록"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <time className="text-sm text-gray-500 block mb-3">
              {formatDate(post.date)}
            </time>

            <p className="text-gray-800 whitespace-pre-wrap break-words">
              {post.text}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => {
                if (confirm('이 기록을 삭제하시겠습니까?')) {
                  onDelete(post.id);
                }
              }}
              className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium"
            >
              삭제
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
