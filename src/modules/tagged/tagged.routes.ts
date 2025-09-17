import type { FastifyPluginAsync } from "fastify";
import { taggedService } from "./tagged.service";

const taggedRoutes: FastifyPluginAsync = async (fastify) => {
  const service = taggedService(fastify);
  fastify.get("/tagged/grid", async (_request, _reply) => {
    const tagged = await service.getAll();
    return tagged;
  });
};

export { taggedRoutes };