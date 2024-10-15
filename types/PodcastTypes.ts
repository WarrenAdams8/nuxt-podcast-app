import { z } from "zod";

const categorySchema = z.record(z.string(), z.string());

export const feedSchema = z.object({
  id: z.number().int(),
  podcastGuid: z.string().uuid(),
  title: z.string(),
  url: z.string().url(),
  originalUrl: z.string().url(),
  link: z.string(),
  description: z.string(),
  author: z.string(),
  ownerName: z.string(),
  image: z.string().optional(),
  artwork: z.string().optional(),
  lastUpdateTime: z.number().int(),
  lastCrawlTime: z.number().int(),
  lastParseTime: z.number().int(),
  lastGoodHttpStatusTime: z.number().int(),
  lastHttpStatus: z.number().int(),
  contentType: z.string(),
  itunesId: z.number().int().nullable(),
  generator: z.string().nullable(),
  language: z.string(),
  explicit: z.boolean(),
  type: z.union([z.literal(0), z.literal(1)]),
  medium: z.string(),
  dead: z.number().int(),
  episodeCount: z.number().int(),
  crawlErrors: z.number().int(),
  parseErrors: z.number().int(),
  categories: categorySchema.nullable(),
  locked: z.union([z.literal(0), z.literal(1)]),
  imageUrlHash: z.number().int(),
  newestItemPubdate: z.number().int(),
  inPollingQueue: z.number().int(),
  priority: z.number().int(),
});

export const PodcastIndexSearchByTermResponseSchema = z.object({
  status: z.union([z.literal("true"), z.literal("false")]),
  feeds: z.array(feedSchema),
  count: z.number().int(),
  query: z.string(),
  description: z.string(),
});

export type Feed = z.infer<typeof feedSchema>;

export type PodcastIndexSearchByTermResponse = z.infer<
  typeof PodcastIndexSearchByTermResponseSchema
>;
