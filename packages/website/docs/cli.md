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
  preview [options]    start a server to preview the build
  help [command]       display help for command
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

## Preview command

```bash
Usage: ladle preview [options]

start a server to preview the build in outDir

Options:
  -o, --outDir <path>    output directory
  -p, --port [number]    port to serve the application
  --config [string]      folder where config is located, default .ladle
  --viteConfig [string]  file with Vite configuration
  -h, --help             display help for command
```
