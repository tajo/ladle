---
id: cli
title: CLI
---

`@ladle/react` provides a CLI so you can `serve` (dev) or `build` your application:

```bash
Usage: ladle [options] [command]

Options:
  -h, --help       display help for command

Commands:
  serve [options]  start developing
  build [options]  build static production app
  help [command]   display help for command
```

## Serve command

```bash
Usage: ladle serve [options]

start developing

Options:
  -p, --port [number]      port to serve the application
  --stories [string]       glob to find stories
  --theme [string]         theme light, dark or auto
  --config [string]        folder where Ladle configs are located, default .ladle
  --viteConfig [string]    file with Vite configuration
  -h, --help               display help for command
```

## Build command

```bash
Usage: ladle build [options]

build static production app

Options:
  -o, --outDir <path>      output directory
  --stories [string]       glob to find stories
  --theme [string]         theme light, dark or auto
  --config [string]        folder where config is located, default .ladle
  --viteConfig [string]    file with Vite configuration
  -h, --help               display help for command
```
