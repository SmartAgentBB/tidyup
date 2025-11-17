"use client";

import { useState, useEffect } from 'react';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { storage, Post } from '@/lib/storage';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load posts on mount
  useEffect(() => {
    setMounted(true);
    setPosts(storage.getPosts());
  }, []);

  const handleSubmit = (image: string, text: string) => {
    try {
      const newPost = storage.savePost({ image, text });
      setPosts([newPost, ...posts]);

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
        </header>

        {/* Post Form */}
        <PostForm onSubmit={handleSubmit} />

        {/* Posts List */}
        <PostList posts={posts} onDelete={handleDelete} />
      </div>
    </div>
  );
}
