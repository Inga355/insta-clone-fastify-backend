import { z } from "zod";

const createTaggedDtoSchema = z.object({
  img_url: z.string().url(),
  caption: z.string().nullable().optional(),
  user_tagged: z.string(),
});

const taggedSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(),
  user_tagged: z.string(),
});

const taggedsSchema = z.array(taggedSchema);

type CreateTaggedDto = z.infer<typeof createTaggedDtoSchema>;
type Tagged = z.infer<typeof taggedSchema>;

export { createTaggedDtoSchema, taggedsSchema, CreateTaggedDto, Tagged };


