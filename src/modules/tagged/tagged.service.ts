import type { FastifyInstance } from "fastify";

const taggedService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching tagged grid`);
      const tagged = fastify.transactions.tagged.getAll();
      return tagged;
    },
  };
};

export { taggedService };