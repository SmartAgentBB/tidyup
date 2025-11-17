// Level calculation utility
export function calculateLevel(postCount: number): number {
  if (postCount === 0) return 1;

  // Find the largest perfect square less than or equal to postCount
  const level = Math.floor(Math.sqrt(postCount));
  return Math.max(1, level);
}

// Check if current count is a perfect square (level up moment)
export function isPerfectSquare(n: number): boolean {
  if (n < 1) return false;
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

// Get next level milestone
export function getNextMilestone(currentCount: number): number {
  const currentLevel = calculateLevel(currentCount);
  const nextLevel = currentLevel + 1;
  return nextLevel * nextLevel;
}

// Get current level's post limit
export function getCurrentLevelLimit(currentCount: number): number {
  const level = calculateLevel(currentCount);
  return level * level;
}
