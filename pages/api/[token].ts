import next, { NextApiRequest, NextApiResponse } from 'next';
import { Telegraf } from 'telegraf'
import ProxyAgent from "simple-proxy-agent";
import { STRINGS, dropDuplicates } from "../../utils";
import { TelegrafOptions } from 'telegraf/typings/telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

const LIST_PREFIX = "[LIST] ";
const BOT_ID = parseInt(process.env.BOT_TOKEN.match(/^[0-9]+/g)[0]);

const PROXY =
  process.env.http_proxy ||
  process.env.HTTP_PROXY ||
  process.env.https_proxy ||
  process.env.HTTPS_PROXY || null;

const telegrafOptions: TelegrafOptions = {};

if (PROXY) {
  telegrafOptions.telegram = { agent: new ProxyAgent(PROXY) };
}

const bot = new Telegraf(process.env.BOT_TOKEN, telegrafOptions);

bot.use((ctx: TelegrafContext, next) => {
  let strings = STRINGS.zhHans;
  if (ctx?.message?.from?.language_code === "en") {
    strings = STRINGS.en;
  }
  ctx.strings = strings;
  return next();
});

async function printHelp(context: TelegrafContext) {
  await context.reply(context.strings.help, { reply_to_message_id: context.message.message_id });
}

bot.start(printHelp);
bot.help(printHelp);
bot.command("create", async (context) => {
  const message = context.message;
  if (!message) return;

  const text = message.text.replace(/^\/create(@buildalistbot)?(\s)?/gi, "");
  const entries = dropDuplicates(text.split("\n"), true);

  await context.reply(
    `${LIST_PREFIX}${context.strings.header}\n${entries.join('\n')}`,
    { reply_to_message_id: context.message.message_id }
  );
});

bot.on("message", async (context) => {
  const message = context.message;
  if (!message) return;
  const replyTo = message.reply_to_message;
  if (!replyTo || replyTo.from.id !== BOT_ID) return;
  if (!replyTo.text.startsWith(LIST_PREFIX)) {
    await context.reply(
      context.strings.defaultHelp,
      { reply_to_message_id: context.message.message_id }
    );
    return;
  }

  const text = message.text.split("\n");
  let entries = dropDuplicates(text);
  let previous = replyTo.text.split("\n");
  const existing = new Set(previous);

  const toRemove = new Set(entries.filter((v) => v.startsWith("-")).map((v) => v.slice(1)));
  console.log(previous, entries, toRemove);
  previous = previous.filter((v) => !toRemove.has(v));
  entries = entries.filter((v) => (!v.startsWith("-") && !existing.has(v)));
  const newText = previous.concat(entries).join("\n");
  console.log(previous, entries, newText)

  await context.reply(
    newText,
    { reply_to_message_id: context.message.message_id }
  );
  await context.deleteMessage(replyTo.message_id);
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { token },
  } = req
  if (token !== process.env.BOT_TOKEN || req.method !== 'POST') {
    res.statusCode = 200;
    res.setHeader("X-TOKEN", token);
    res.end("");
    return;
  }
  await bot.handleUpdate(req.body, res);
  if (!res.writableEnded) {
    res.statusCode = 200;
    res.end("Ended!");
  }
}
