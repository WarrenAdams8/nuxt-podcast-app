import { nullable, z } from "zod";

// Define the value model schema
const ValueModelSchema = z.object({
  type: z.enum(["lightning", "hive", "webmonetization"]),
  method: z.string(),
  suggested: z.string().nullable(),
});

// Define the value destination schema
const ValueDestinationSchema = z.object({
  name: z.string(),
  address: z.string(),
  type: z.enum(["node"]),
  split: z.number().int(),
  fee: z.boolean().nullable(),
  customKey: z.string().nullable(),
  customValue: z.string().nullable(),
});

// Define the value schema
const ValueSchema = z.object({
  model: ValueModelSchema,
  destinations: z.array(ValueDestinationSchema),
});

// Define the funding schema
const FundingSchema = z.object({
  url: z.string().url().nullable(),
  message: z.string(),
});

// Define the feed schema
const FeedSchema = z.object({
  id: z.number().int(),
  podcastGuid: z.string(),
  title: z.string(),
  url: z.string(),
  originalUrl: z.string().url(),
  link: z.string().url(),
  description: z.string(),
  author: z.string(),
  ownerName: z.string(),
  image: z.string().url(),
  artwork: z.string().url(),
  lastUpdateTime: z.number().int(),
  lastCrawlTime: z.number().int(),
  lastParseTime: z.number().int(),
  lastGoodHttpStatusTime: z.number().int(),
  lastHttpStatus: z.number().int(),
  contentType: z.string(),
  itunesId: z.number().int().nullable(),
  itunesType: z.string(),
  generator: z.string().nullable(),
  language: z.string(),
  explicit: z.boolean(),
  type: z.number().int().min(0).max(1),
  medium: z.string(),
  dead: z.number().int(),
  chash: z.string(),
  episodeCount: z.number().int(),
  crawlErrors: z.number().int(),
  parseErrors: z.number().int(),
  categories: z.record(z.string()),
  locked: z.number().int().min(0).max(1),
  imageUrlHash: z.number().int(),
  value: ValueSchema.optional(),
  funding: FundingSchema.optional(),
});

// Define the query schema
const QuerySchema = z.object({
  id: z.string(),
});

// Define the root response schema
export const PodcastResponseSchema = z.object({
  status: z.union([z.literal("true"), z.literal("false")]),
  query: QuerySchema,
  feed: FeedSchema,
  description: z.string(),
});

export type FeedInfo = z.infer<typeof PodcastResponseSchema>;


