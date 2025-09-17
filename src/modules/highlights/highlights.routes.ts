import type { FastifyPluginAsync } from "fastify";
import { highlightsService } from "./highlights.service";
import { CreateHighlightDto } from "./highlights.types";  

const highlightsRoutes: FastifyPluginAsync = async (fastify) => {
  const service = highlightsService(fastify);

  fastify.get("/highlights", async (_request, _reply) => {
    const highlights = await service.getAll();
    return highlights;
  });

  fastify.get<{ Params: { id: string } }>("/highlights/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const highlight = await service.getById(id);
    return reply.send(highlight);
  });

  fastify.post<{ Body: CreateHighlightDto }>("/highlights", async (request, reply) => {
    const newHighlight = await service.create(request.body);
    // Return a 201 Created status code with the new post object
    return reply.code(201).send(newHighlight);
  });
};

export { highlightsRoutes };