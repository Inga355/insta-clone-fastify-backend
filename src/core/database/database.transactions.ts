import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";
import { CreateReelDto } from "src/modules/reels/reels.types";
import { CreateTaggedDto } from "src/modules/tagged/tagged.types";
import { CreateHighlightDto } from "src/modules/highlights/highlights.types";

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
    getAllTagged: db.prepare("SELECT * FROM tagged"),
    createTagged: db.prepare(
      "INSERT INTO tagged (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
    ),
    getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    getAllHighlights: db.prepare("SELECT * FROM highlights"),
    createHighlight: db.prepare(
      "INSERT INTO highlights (img_url, title) VALUES (@img_url, @title) RETURNING *"
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

  const tagged = {
    getAll: () => {
      return statements.getAllTagged.all();
    },
  };

  const highlights = {
    getById: (id: number) => {
      return statements.getHighlightById.get(id);
    },
    getAll: () => {
      return statements.getAllHighlights.all();
    },
    create: (data: CreateHighlightDto) => {
      return statements.createHighlight.get(data);
    },
  };

  return {
    posts,
    reels,
    tagged,
    highlights
  };
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };