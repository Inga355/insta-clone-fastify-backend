import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";
import { CreateReelDto } from "./reels.types";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.get("/reels/grid", async (_request, _reply) => {
    const reels = await service.getAll();
    return reels;
  });
};

export { reelsRoutes };