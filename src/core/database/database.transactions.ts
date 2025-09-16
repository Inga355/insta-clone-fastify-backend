import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";

// This factory function creates and returns our transaction helpers.
function createTransactionHelpers(db: Database) {
  // We use prepared statements for security and performance.
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
    ),
    // Optional: reels table may not exist in all environments; adjust accordingly
    getAllReels: db.prepare(
      "SELECT id, video_url, thumbnail_url, caption, views FROM reels"
    ),
  };

  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: CreatePostDto) => {
      return statements.createPost.get(data);
    },
  };

  const reels = {
    getAll: () => {
      return statements.getAllReels.all();
    },
  };

  return {
    posts,
    reels,
  };
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };