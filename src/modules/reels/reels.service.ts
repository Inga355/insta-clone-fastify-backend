import type { FastifyInstance } from "fastify";

const reelsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching reels grid`);
      const reels = fastify.transactions.reels.getAll();
      return reels;
    },
  };
};

export { reelsService };