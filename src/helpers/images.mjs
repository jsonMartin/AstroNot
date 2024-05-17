import path from "path";
import imageType from "image-type";
import crypto from "crypto";
import fs from "fs";

const IMAGE_PATH = `src/images/posts`;

// IMPORTANT: This bit is required to allow dynamic importing of images via Astro & Vite
// postImageImport allows dynamically import images from local filesystem via Vite with variable names
export async function postImageImport(imageFileName) {
  // Image paths must be relative, and end with file extension to work in Vite build process
  // See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#meta
  const filename = path.parse(imageFileName);
  const name = filename.name;
  const ext = filename.ext;

  if (!name) {
    console.warn("No image, skipping", imageFileName);
    return;
  }

  switch (ext) {
    case ".webp":
      return await import(`../images/posts/${name}.webp`);
    case ".jpg":
      return await import(`../images/posts/${name}.jpg`);
    case ".png":
      return await import(`../images/posts/${name}.png`);
    case ".svg":
      return await import(`../images/posts/${name}.svg`);
    case ".gif":
      return await import(`../images/posts/${name}.gif`);
    case ".avif":
      return await import(`../images/posts/${name}.avif`);
    case ".jpeg":
      return await import(`../images/posts/${name}.jpeg`);
    case ".bmp":
      return await import(`../images/posts/${name}.bmp`);
    default:
      return await import(`../images/posts/${name}.jpg`);
  }

  /*
  The returned imported image results are in this format:

  {
    default: {
      src: '/@fs/Users/json/Projects/astronot/src/images/posts/4f9edb242363447c8ed31c88e86fcb1766a93d2b938bf25c2528d52da4dc478b-cover.jpg?origWidth=1500&origHeight=1397&origFormat=jpg',
      width: 1500,
      height: 1397,
      format: 'jpg',
      orientation: 1
    },
    [Symbol(Symbol.toStringTag)]: 'Module'
  }
  */
}

export function hashString(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export async function downloadImage(
  imageUrl,
  {
    isCover = false, // Notion Cover image, displays at top of posts
  },
) {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { ext, mime } = await imageType(buffer);

  const fileHash = hashString(imageUrl);
  const fileName = `${process.cwd()}/${IMAGE_PATH}/${fileHash}${isCover ? "-cover" : ""
    }.${ext}`;
  console.info("Hashed Filename:", fileName);

  fs.writeFileSync(fileName, buffer);
  console.info(`Image downloaded to ${fileName}`, mime);

  return fileName;
}
