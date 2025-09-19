import Fastify from "fastify";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";
import multipart from "@fastify/multipart";
import path from "path";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), "public", "uploads"),
  prefix: "/uploads/",
});
// Register multipart plugin
fastify.register(multipart);
// Register database plugin
fastify.register(databasePlugin);
// Register new posts routes
fastify.register(postsRoutes);
// Register reels routes
fastify.register(reelsRoutes);
// Register tagged routes
fastify.register(taggedRoutes);
// Register highlights routes
fastify.register(highlightsRoutes);

// Declare a default route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

const port = 3000;

fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});