/* eslint-disable @typescript-eslint/ban-ts-comment */
import { XMLParser } from "fast-xml-parser";

const NEW_FEEDBACK_RSS_URL =
  "https://support.deskpro.com/portal/api/community/forum/9.rss";

const rssToJson = async (url: string) => {
  if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(url)) return [];

  const data = await fetch(url);

  const xml = new XMLParser({
    attributeNamePrefix: "",
    textNodeName: "$text",
    ignoreAttributes: false,
  });

  const result = xml.parse(await data.text());

  const item = result.rss.channel.item;

  return Array.isArray(item) ? item : [item];
};

export const fetchFeedbackFeed = async () =>
  rssToJson(NEW_FEEDBACK_RSS_URL);
