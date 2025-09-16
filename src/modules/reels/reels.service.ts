import type { FastifyInstance } from "fastify";
import { CreateGETDto } from "./reels.types";

const reelsService = (fastify: FastifyInstance) => {
  return {
    create: async (postData: CreateGETDto) => {
      fastify.log.info(`Creating a new post`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const post = fastify.transactions.posts.create(postData);
      return post;
    },
  };
};

export { reelsService };