import { PodcastIndexSearchByTermResponseSchema } from "~/types/PodcastTypes";

import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const APIKEY = config.podcastApiKey;
  const APISECRET = config.podcastApiSecret;

  const ts = Math.floor(Date.now() / 1000);
  const authString = APIKEY + APISECRET + ts.toString();
  const authHeader = crypto.createHash("sha1").update(authString).digest("hex");

  const response = await fetch(
    "https://api.podcastindex.org/api/1.0/search/byterm?q=At+The+Letters",
    {
      method: "GET",
      headers: {
        "User-Agent": "homemade pod-fetcher 0.026b",
        "X-Auth-Date": ts.toString(),
        "X-Auth-Key": APIKEY,
        Authorization: authHeader,
      },
    },
  );

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  }

  const data = await response.json()

  const validationResult = PodcastIndexSearchByTermResponseSchema.safeParse(data)

  if (!validationResult.success) {
    console.error('Podcast data validation failed:', validationResult.error);
    return []
  }

  console.log(validationResult)

  return validationResult.data.feeds;
});
