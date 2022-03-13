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
  --stories [string]  glob to find stories
  --port [number]     port to serve the application
  --theme [string]    theme light, dark or auto
  --open [string]     open browser, e.g. chrome, firefox, safari. Set none to disable
  --output [string]   console logging, e.g. dashboard or stream
  --config [string]   folder where config is located, default .ladle
  -h, --help          display help for command
```

## Build command

```bash
Usage: ladle build [options]

build static production app

Options:
  --stories [string]   glob to find stories
  --out <path>         output directory
  --sourcemap          generate source maps
  --theme [string]     theme light, dark or auto
  --base-url [string]  when hosted in a sub-directory, default /
  --config [string]    folder where config is located, default .ladle
  -h, --help           display help for command
```
