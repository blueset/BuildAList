# Build-a-list bot

- [Try it out on Telegram](https://t.me/buildalistbot)
- Made to run on Vercel.

## How to use
### Create a list
Send:

```
/create title
description...
more descriptions...

even more descriptions ...

---

entry one
entry two
entry thee
```

(The bot treats descriptions and entries equally, and will not remove extra blank lines from it.)

### Contribute to a list
Reply to a list with:
```
entry four
entry five
entry two
-entry one
```
This will add `entry four`, `entry five` and remove `entry one` from the list.
`entry two` will not be added twice since it is already in the list.

## Setup
### Install
```
yarn install
```

### Environment variables
Note: replace `123456:ABCDEFghijklmnop098765` with your own token.
```
echo 'BOT_TOKEN="123456:ABCDEFghijklmnop098765"' > .env
```

### Run in development mode
```
yarn dev
```

### Build and run
```
yarn build
yarn serve
```

### Set webhook with Telegram
Note: replace `example.com` with your own domain.

```
http POST https://api.telegram.org/bot123456:ABCDEFghijklmnop098765/setWebhook url=https://example.com/api/123456:ABCDEFghijklmnop098765
```