"use client";

import { useState, useEffect } from 'react';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import CollectionView from '@/components/CollectionView';
import { storage, Post } from '@/lib/storage';
import { calculateLevel, getNextMilestone, isPerfectSquare } from '@/lib/level';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Load posts on mount
  useEffect(() => {
    setMounted(true);
    setPosts(storage.getPosts());
  }, []);

  const handleSubmit = (image: string, text: string) => {
    try {
      const newPost = storage.savePost({ image, text });
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);

      // Check for level up
      if (isPerfectSquare(updatedPosts.length)) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      // Scroll to top to see new post
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert(error instanceof Error ? error.message : '저장에 실패했습니다.');
    }
  };

  const handleDelete = (id: string) => {
    storage.deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const currentLevel = calculateLevel(posts.length);
  const nextMilestone = getNextMilestone(posts.length);
  const canViewCollection = currentLevel >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🧹 비움 챌린지
          </h1>
          <p className="text-gray-600">
            연말을 맞아 불필요한 것들을 비워내고 새로운 시작을 준비하세요
          </p>

          {/* Level Info */}
          <div className="mt-4 inline-block bg-white rounded-lg shadow-md px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  Level {currentLevel}
                </div>
                <div className="text-xs text-gray-500">
                  {posts.length}개 기록
                </div>
              </div>

              {posts.length < nextMilestone && (
                <>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">
                      다음 레벨까지
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {nextMilestone - posts.length}개
                    </div>
                  </div>
                </>
              )}

              {canViewCollection && (
                <>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <button
                    onClick={() => setShowCollection(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  >
                    📚 모아보기
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Level Up Notification */}
        {showLevelUp && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-lg text-center">
              <div className="text-2xl font-bold">🎉 Level {currentLevel} 달성!</div>
              <div className="text-sm mt-1">축하합니다!</div>
            </div>
          </div>
        )}

        {/* Post Form */}
        <PostForm onSubmit={handleSubmit} />

        {/* Posts List */}
        <PostList posts={posts} onDelete={handleDelete} />

        {/* Collection View Modal */}
        {showCollection && (
          <CollectionView
            posts={posts}
            onClose={() => setShowCollection(false)}
          />
        )}
      </div>
    </div>
  );
}
