---
id: http2
title: HTTP/2
---

**You can significantly boost Ladle's dev server performance by activating HTTP/2**. How does it work? Ladle is powered by Vite and Vite serves each module individually over HTTP since it's not creating bundles.

Some of the bigger stories might import hundreds or even thousands of modules. That's a lot of individual network requests. It can dramatically slow down the browser.

HTTP/2 solves this problem by allowing multiple requests to be sent over the same connection. This means that the browser can send multiple requests at the same time, and the server can send multiple responses at the same time.

## Configuration

HTTP/2 requires an additional configuration - a valid SSL certificate. Fortunately, **it's very easy to do with [mkcert](https://github.com/FiloSottile/mkcert)**!

### macOS

[Linux](https://github.com/FiloSottile/mkcert#linux). [Windows](https://github.com/FiloSottile/mkcert#windows).

```bash
brew install mkcert #assuming you have homebrew installed
mkcert -install #creates a new local certificate authority
mkcert localhost #creates a new certificate for localhost
```

Expect to be prompted for your OS password. This will create two files: `localhost.pem` and `localhost-key.pem`. Now we need to pass them into the `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem"),
    },
  },
});
```

That's it. Now you can run `pnpm ladle serve` and Ladle will be served over HTTP/2! The default URL `https://localhost:61000` should be automatically opened in your browser.

## Alternatives

Alternatively, you can use node based tool called [devcert](https://github.com/davewasmer/devcert).

There is also [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl) that's really easy to setup; however, it generates only untrusted certificates so you'll be getting warnings in your browser.

## Security

**Be sure to never share the root key that these tools create!**

Devcert docs provides a good reason why:

> There's a reason that your OS prompts you for your root password when devcert attempts to install it's root certificate authority. By adding it to your machine's trust stores, your browsers will automatically trust any certificate generated with it.

> This exposes a potential attack vector on your local machine: if someone else could use the devcert certificate authority to generate certificates, and if they could intercept / manipulate your network traffic, they could theoretically impersonate some websites, and your browser would not show any warnings (because it trusts the devcert authority).
