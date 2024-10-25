import { z } from 'zod';

const EpisodeType = z.enum(['full', 'trailer', 'bonus']);
const LiveItemStatus = z.enum(['ended', 'live']);
const Explicit = z.literal(0).or(z.literal(1)); //  no or z union
const SocialInteractProtocol = z.enum([
  'disabled',
  'activitypub',
  'twitter',
  'lightning',
]);
const TranscriptType = z.enum([
  'application/json',
  'application/srt',
  'text/html',
  'text/plain',
  'text/srt',
  'text/vtt',
]);
const ValueModelType = z.enum(['lightning', 'hive', 'webmonetization']);
const ValueDestinationType = z.literal('node');

const ValueModel = z.object({
  type: ValueModelType,
  method: z.string(),
  suggested: z.string().nullable(),
});

const ValueDestination = z.object({
  name: z.string(),
  address: z.string(),
  type: ValueDestinationType,
  split: z.number(),
  fee: z.boolean().nullable(),
  customKey: z.string().nullable(),
  customValue: z.string().nullable(),
});

const Value = z.object({
  model: ValueModel,
  destinations: z.array(ValueDestination).optional(),
});

const Soundbite = z.object({
  startTime: z.number(),
  duration: z.number(),
  title: z.string(),
});

const Transcript = z.object({
  url: z.string(),
  type: TranscriptType,
});

const Person = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  group: z.string(),
  href: z.string(),
  img: z.string(),
});

const SocialInteract = z.object({
  url: z.string(),
  protocol: SocialInteractProtocol,
  accountId: z.string(),
  accountUrl: z.string(),
  priority: z.number(),
});

const BaseEpisode = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  description: z.string(),
  guid: z.string(),
  datePublished: z.number(),
  datePublishedPretty: z.string(),
  dateCrawled: z.number(),
  enclosureUrl: z.string(),
  enclosureType: z.string(),
  enclosureLength: z.number(),
  duration: z.number().nullable(),
  explicit: Explicit,
  episode: z.number().nullable(),
  episodeType: EpisodeType.nullable(),
  season: z.number().nullable(),
  image: z.string(),
  feedItunesId: z.number().nullable(),
  feedImage: z.string(),
  feedId: z.number(),
  feedLanguage: z.string(),
  feedDead: z.number(),
  feedDuplicateOf: z.number().nullable(),
  chaptersUrl: z.string().nullable(),
  transcriptUrl: z.string().nullable(),
});

const LiveItem = BaseEpisode.extend({
  startTime: z.number(),
  endTime: z.number(),
  status: LiveItemStatus,
  contentLink: z.string(),
});

const EpisodeItem = BaseEpisode.extend({
  feedUrl: z.string(),
  podcastGuid: z.string(),
  transcripts: z.array(Transcript).optional(),
  soundbite: Soundbite.optional(),
  soundbites: z.array(Soundbite).optional(),
  persons: z.array(Person).optional(),
  socialInteract: z.array(SocialInteract).optional(),
  value: Value.optional(),
});

const Query = z.union([z.string(), z.array(z.string())]);

export const ResponseSchema = z
  .object({
    status: z.enum(['true','false']),
    liveItems: z.array(LiveItem).default([]),
    items: z.array(EpisodeItem).default([]),
    count: z.number().default(0),
    query: Query.optional(),
    description: z.string().default(''),
  })

  export type EpisodeItem = z.infer<typeof EpisodeItem>;
  export type feedResponse = z.infer<typeof ResponseSchema>;

