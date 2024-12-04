import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import express from 'express';
import cors from "cors";

async function fetchImages(channelTag) {
  await client.start({
    phoneNumber: "+79817761954",
    password: async () =>
      new Promise((resolve) => rl.question("password: ", resolve)),
    phoneCode: async () =>
      new Promise((resolve) => rl.question("received code: ", resolve)),
    onError: (err) => console.error(err),
  });
  const channel = await client.getEntity(channelTag);
  const messages = await client.getMessages(channel, { limit: 100000 });
  let count=0;
  const images = await Promise.all(
    messages
      .filter((message) => message.photo)
      .map(async (message) => {
        count++;
        let rating = 0;
        const file = message.photo;
        const caption = message.message;
  
        if (!message.reactions) {
          console.log(`No reactions for message: ${message.message}`);
        }
        if (message.reactions && message.reactions.results) {
          message.reactions.results.forEach((result) => {
            rating += result.count;
          });
        }
        const filePath = `\\images\\${channelTag}_${count}.jpg`
        // await downloadImage(file, filePath);
        return { filePath: filePath, caption: caption, rating: rating };
      })
  );  
  return images;
}

async function downloadImage(file, filePath) {
  try {
    await client.downloadMedia(file, { outputFile: filePath});
  } catch (error) {
    console.error("Ошибка при загрузке изображения:", error);
    throw error;
  }
}



dotenv.config();
const apiId = Number(process.env.TG_API_ID);
const apiHash = process.env.TG_API_HASH;
const string = process.env.TG_STRING_SESSION
const stringSession = new StringSession(process.env.TG_STRING_SESSION);
console.log(string)
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public')); // Для статических файлов (HTML, CSS, JS)
const port = 1489

app.get('/fetch-images/:channelTag', async (req, res) => {
  const channelTag = req.params.channelTag;

  try {
    const images = await fetchImages(channelTag)

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при получении изображений');
  }
});

const server = app.listen(port);
console.log(`Сервер запущен на http://localhost:${port}`);
