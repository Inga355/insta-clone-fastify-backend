import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("GET /highlights", () => {
  it("should return a single highlight by id with a 200 status code", async () => {
    const app = Fastify();
    const mockHighlights = [
        {
            id: 1,
            cover_img_url: "https://source.unsplash.com/random/800x600",
            title: "A random picture!",
        },
        {
            id: 2,
            cover_img_url: "https://source.unsplash.com/random/800x600",
            title: "Another random picture!",
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
          getAll: jest.fn(),
        },
        highlights: {
            create: jest.fn().mockReturnValue(mockHighlights),
            getAll: jest.fn().mockReturnValue(mockHighlights),
            getById: jest.fn().mockReturnValue(mockHighlights),
          },
      });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights/1",
    });

    expect(response.statusCode).toBe(200);
  });

  it("should return a list of highlights with a 200 status code", async () => {
    const app = Fastify();
    const mockHighlights = [
        {
            id: 1,
            cover_img_url: "https://source.unsplash.com/random/800x600",
            title: "A random picture!",
        },
        {
            id: 2,
            cover_img_url: "https://source.unsplash.com/random/800x600",
            title: "Another random picture!",
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
          getAll: jest.fn(),
        },
        highlights: {
            create: jest.fn().mockReturnValue(mockHighlights),
            getAll: jest.fn().mockReturnValue(mockHighlights),
            getById: jest.fn().mockReturnValue(mockHighlights),
          },
      });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights",
    });

    expect(response.statusCode).toBe(200);
  });
});
