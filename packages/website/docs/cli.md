---
id: cli
title: CLI
---

`@ladle/react` provides a CLI so you can `serve` (dev) or `build` your application:

```bash
Usage: ladle [options] [command]

Options:
  -h, --help           display help for command

Commands:
  serve|dev [options]  start developing
  build [options]      build static production app
  preview [options]    start a server to preview the build in outDir
  help [command]       display help for command
```

## Serve command

```bash
Usage: ladle serve|dev [options]

start developing

Options:
  -h, --host [string]    host to serve the application
  -p, --port [number]    port to serve the application
  --stories [string]     glob to find stories
  --theme [string]       theme light, dark or auto
  --config [string]      folder where config is located, default .ladle
  --viteConfig [string]  file with Vite configuration
  --base [string]        base URL path for build output
  --mode [string]        Vite mode
  --noWatch [string]     disable file system watcher
  --no-open              disable opening the browser
  -h, --help             display help for command

```

Use `--no-open` to start the development server without opening a browser, even when [`server.open`](https://vite.dev/config/server-options.html#server-open) is enabled in the Vite config:

```bash
pnpm ladle serve --no-open
```

Without this option, Ladle continues to follow `server.open`. You can also set `BROWSER=none` to disable browser opening through the environment instead of the CLI.

## Build command

```bash
Usage: ladle build [options]

build static production app

Options:
  -o, --outDir <path>    output directory
  --stories [string]     glob to find stories
  --theme [string]       theme light, dark or auto
  --config [string]      folder where config is located, default .ladle
  --viteConfig [string]  file with Vite configuration
  --base [string]        base URL path for build output
  --mode [string]        Vite mode
  -h, --help             display help for command

```

## Preview command

```bash
Usage: ladle preview [options]

start a server to preview the build in outDir

Options:
  -o, --outDir <path>    output directory
  -h, --host [string]    host to serve the application
  -p, --port [number]    port to serve the application
  --config [string]      folder where config is located, default .ladle
  --viteConfig [string]  file with Vite configuration
  --base [string]        base URL path for build output
  --mode [string]        Vite mode
  -h, --help             display help for command

```
