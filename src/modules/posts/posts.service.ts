import type { FastifyInstance } from "fastify";
import { CreatePostDto } from "./posts.types";

const postsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching all posts`);
      const posts = fastify.transactions.posts.getAll();
      return posts;
    },
    create: async (postData: CreatePostDto) => {
      fastify.log.info(`Creating a new post`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const post = fastify.transactions.posts.create(postData);
      return post;
    },
  };
};

export { postsService };