import fetch from "node-fetch";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import readline from "readline";
import { join } from "path";
import { log } from "console";

dotenv.config();

const apiId = Number(process.env.TG_API_ID);
const apiHash = process.env.TG_API_HASH;
const channelTag = process.env.CHANNEL_TAG;
console.log(apiId, apiHash, channelTag);

const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
  connectionRetries: 5,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadImage(file, caption, rating) {
  const filePath =
    "C:\\Users\\98182\\OneDrive\\Рабочий стол\\уник\\Web\\Frontend-course-IS-TMO\\tg-photo-fetcher\\images"
  try {
    await client.downloadMedia(file, { outputFile: filePath });
    return { filePath: filePath, caption, rating };
  } catch (error) {
    console.error("Ошибка при загрузке изображения:", error);
    throw error;
  }
}

async function fetchImages() {
  await client.start({
    phoneNumber: "+79817761954",
    password: async () =>
      new Promise((resolve) => rl.question("password: ", resolve)),
    phoneCode: async () =>
      new Promise((resolve) => rl.question("received code: ", resolve)),
    onError: (err) => console.error(err),
  });
  const channel = await client.getEntity(channelTag);
  const messages = await client.getMessages(channel, { limit: 10 });

  const images = await Promise.all(
    messages
      .filter((message) => message.photo)
      .map(async (message) => {
        let rating = 0;
        const file = message.photo;
        const caption = message.message;
        message.reactions.results.map((result) => {
          rating += result.count;
        });
        return await downloadImage(file, caption, rating);
      })
  );

  return images;
}

fetchImages()
  .then((images) => {
    console.log(images.caption, images.rating);
  })
  .catch(console.error);

