export interface Post {
  id: string;
  image: string; // Base64 encoded image
  text: string;
  date: string; // ISO date string
}

const STORAGE_KEY = 'tidyup-posts';

export const storage = {
  // Get all posts from localStorage
  getPosts(): Post[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to get posts:', error);
      return [];
    }
  },

  // Save a new post
  savePost(post: Omit<Post, 'id' | 'date'>): Post {
    const newPost: Post = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...post,
    };

    const posts = this.getPosts();
    posts.unshift(newPost); // Add to beginning (newest first)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      return newPost;
    } catch (error) {
      console.error('Failed to save post:', error);
      throw new Error('저장 공간이 부족합니다. 일부 게시물을 삭제해주세요.');
    }
  },

  // Delete a post
  deletePost(id: string): void {
    const posts = this.getPosts();
    const filtered = posts.filter(post => post.id !== id);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  },

  // Clear all posts
  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear posts:', error);
    }
  }
};
