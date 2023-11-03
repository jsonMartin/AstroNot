import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from 'fs';
import readingTime from 'reading-time';
import { config } from 'dotenv';
import { parseArgs } from 'node:util';
import { sanitizeUrl, sanitizeImageString } from './helpers/sanitize.mjs';
import { hashString, downloadImage } from './helpers/images.mjs';
import { delay } from './helpers/delay.mjs';

// Input Arguments
const ARGUMENT_OPTIONS = {
  published: { // Only sync published posts
    type: 'boolean',
    short: 'p'
  },
};
const { values: { published } } = parseArgs({ options: ARGUMENT_OPTIONS });
const isPublished = !!published;
console.log(`Syncing Published Only: ${isPublished}`)

// Load ENV Variables
config();
if (!process.env.NOTION_KEY || !process.env.DATABASE_ID) throw new Error("Missing Notion .env data")
const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.DATABASE_ID; // TODO: Import from ENV

const POSTS_PATH = `src/pages/posts`;
const THROTTLE_DURATION = 334; // ms Notion API has a rate limit of 3 requests per second, so ensure that is not exceeded

const notion = new Client({
  auth: NOTION_KEY,
  config: {
    parseChildPages: false,
  }
});

// Notion Custom Block Transform START
const n2m = new NotionToMarkdown({ notionClient: notion });
n2m.setCustomTransformer("embed", async (block) => {
  const { embed } = block;
  if (!embed?.url) return "";
  return `<figure>
  <iframe src="${embed?.url}"></iframe>
  <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
</figure>`;
});

n2m.setCustomTransformer("image", async (block) => {
  const { image, id } = block;
  const imageUrl = image?.file?.url || image?.external?.url;
  const imageFileName = sanitizeImageString(imageUrl.split('/').pop());
  const filePath = await downloadImage(imageUrl, `./images/${imageFileName}`);
  const fileName = filePath.split('/').pop();

  return `<Image src="/images/posts/${fileName}" />`;
});

n2m.setCustomTransformer("video", async (block) => {
  const { video } = block;
  const { caption, type, external: { url: videoUrl } } = video;

  let url = videoUrl;

  if (url.includes('youtube.com')) {
    if (url.includes('/watch')) {
      // Youtube URLs with the /watch format don't work, need to be replaced with /embed
      const videoId = url.split('&')[0].split('?v=')[1];
      url = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  return `<iframe width="100%" height="480" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
});
// Notion Custom Block Transform END

// Fetch Notion Posts from Database via Notion API
const queryParams = {
  database_id: DATABASE_ID,
}

if (isPublished) {
  queryParams.filter = {
    "and": [
      {
        "property": "status",
        "select": {
          equals: 'published'
        }
      },
    ]
  }
}

const databaseResponse = await notion.databases.query(queryParams);
const { results } = databaseResponse;

// Create Pages
const pages = results.map((page) => {
  const { properties, cover, created_time, last_edited_time, icon, archived } = page;
  const title = properties.title.title[0].plain_text
  const slug = properties?.slug?.rich_text[0]?.plain_text || sanitizeUrl(title)

  console.info("Notion Page:", page);

  return {
    id: page.id,
    title,
    type: page.object,
    cover: cover?.external?.url || cover?.file?.url,
    tags: properties.tags.multi_select,
    created_time,
    last_edited_time,
    icon,
    archived,
    status: properties?.status?.select?.name,
    publish_date: properties?.publish_date?.date?.start,
    description: properties?.description?.rich_text[0]?.plain_text,
    slug,
  }
});

for (let page of pages) {
  console.info("Fetching from Notion & Converting to Markdown: ", `${page.title} [${page.id}]`);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const { parent: mdString } = n2m.toMarkdownString(mdblocks);

  const estimatedReadingTime = readingTime(mdString || '').text;

  // Download Cover Image
  const coverFileName = page.cover ? await downloadImage(page.cover, { isCover: true }) : '';
  if (coverFileName) console.info("Cover image downloaded:", coverFileName)

  // Generate page contents (frontmatter, MDX imports, + converted Notion markdown)
  const pageContents = `---
layout: "../../layouts/PostLayout.astro"
id: "${page.id}"
slug: "${page.slug}"
title: "${page.title}"
cover: "${coverFileName}"
tags: ${JSON.stringify(page.tags)}
created_time: ${page.created_time}
last_edited_time: ${page.last_edited_time}
icon: ${JSON.stringify(page.icon)}
archived: ${page.archived}
status: "${page.status}"
publish_date: ${page.publish_date ? page.publish_date : false}
description: "${page.description === 'undefined' ? '' : page.description}"
reading_time: "${estimatedReadingTime}"
---
import Image from '../../components/Image.astro';

${mdString}
`

  if (mdString) fs.writeFileSync(`${process.cwd()}/${POSTS_PATH}/${page.slug}.mdx`, pageContents);
  else console.log(`No content for page ${page.id}`)

  console.debug(`Sleeping for ${THROTTLE_DURATION} ms...\n`)
  await delay(THROTTLE_DURATION); // Need to throttle requests to avoid rate limiting
}

console.info("Successfully synced posts with Notion")
