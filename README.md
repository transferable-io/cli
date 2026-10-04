# Transferable CLI

Upload files and create deliveries on [Transferable](https://transferable.io) from the
terminal, or let your AI agent do it.

## Install

```sh
brew install transferable-io/tap/transferable
```

or

```sh
curl -fsSL https://transferable.io/install | sh
```

or, with Node.js 18+

```sh
npm install -g @transferable/cli
```

macOS (Apple Silicon and Intel) and Linux (x64 and arm64). The binaries are attached to
each [release](https://github.com/transferable-io/cli/releases) with their SHA-256 checksums.

## Use

```sh
transferable login                                  # sign in through the browser
transferable upload ./Wedding-Dupont --folder "Dupont"
transferable deliver "Wedding - Dupont" --from "Dupont" --sections-from-subfolders
transferable delivery show <id>                     # check it, then
transferable delivery publish <id>                  # put the link online
```

`transferable --help` lists every command. Large uploads can run in the background with
`--background`, then `transferable status`.

## AI agents

Paste this into your agent (Claude Code, Codex, Cursor and others with a terminal):

```text
Set up Transferable so I can send files to my clients from here.
1. Install: run `curl -fsSL https://transferable.io/install | sh`, then `npx -y skills add transferable-io/skills -g -y`.
2. Sign in: run `transferable login`, ask me to approve in the browser, then confirm with `transferable whoami`.
```

The skill teaches your agent to upload, follow the upload, prepare and adjust the delivery, and
never to publish a link without your go-ahead.

## Support

contact@transferable.io
