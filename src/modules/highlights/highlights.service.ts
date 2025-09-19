import type { FastifyInstance } from "fastify";
import { CreateHighlightDto } from "./highlights.types";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info(`Fetching all highlights`);
      const highlights = fastify.transactions.highlights.getAll();
      return highlights;
    },
    create: async (highlightData: CreateHighlightDto) => {
      fastify.log.info(`Creating a new highlight`);
      const highlight = fastify.transactions.highlights.create(highlightData);
      return highlight;
    },
    getById: async (id: number) => {
      fastify.log.info(`Fetching highlight by Id`);
      const highlight = fastify.transactions.highlights.getById(id);
      return highlight;
    }
  };
};

export { highlightsService };