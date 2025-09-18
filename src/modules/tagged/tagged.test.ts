import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged", () => {
  it("should return a list of tagged posts with a 200 status code", async () => {
    const app = Fastify();
    const mockTagged = [
        {
            img_url: "https://source.unsplash.com/random/800x600",
            caption: "A random picture!",
            user_tagged: "Henry Ford",
        },
        {
            img_url: "https://source.unsplash.com/random/800x600",
            caption: "Another random picture!",
            user_tagged: "Albert Einstein,"
        },
      ];

      app.decorate("transactions", {
        posts: {
          create: jest.fn(),
          getAll: jest.fn(),
          getById: jest.fn(),
        },
        reels: {
          getAll: jest.fn(),
        },
        tagged: {
          getAll: jest.fn().mockReturnValue(mockTagged),
        },
        highlights: {
          create: jest.fn(),
          getAll: jest.fn(),
          getById: jest.fn(),
        },
      });

    app.register(taggedRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/tagged/grid",
    });

    expect(response.statusCode).toBe(200);
  });
});