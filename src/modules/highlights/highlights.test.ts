import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("GET /highlights", () => {
  it("should return a list of highlights with a 200 status code", async () => {
    const app = Fastify();
    const mockHighlights = [
        {
            img_url: "https://source.unsplash.com/random/800x600",
            caption: "A random picture!",
        },
        {
            img_url: "https://source.unsplash.com/random/800x600",
            caption: "Another random picture!",
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
            getAll: jest.fn().mockReturnValue(mockHighlights),
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


describe("GET /highlights/:id", () => {
    it("should return a single highlights with a 200 status code", async () => {
      const app = Fastify();
      const mockHighlightsId = [
          {
              img_url: "https://source.unsplash.com/random/800x600",
              caption: "A random picture!",
              id: 1
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
              getById: jest.fn().mockReturnValue(mockHighlightsId),
            },
        });
  
      app.register(highlightsRoutes);
  
      const response = await app.inject({
        method: "GET",
        url: "/highlights/:id",
      });
  
      expect(response.statusCode).toBe(200);
    });
  });