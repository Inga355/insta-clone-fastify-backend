import type { FastifyPluginAsync } from "fastify";
import { highlightsService } from "./highlights.service";

const highlightsRoutes: FastifyPluginAsync = async (fastify) => {
  const service = highlightsService(fastify);
  fastify.get("/highlights", async (_request, _reply) => {
    const highlights = await service.getAll();
    return highlights;
  });
};

export { highlightsRoutes };