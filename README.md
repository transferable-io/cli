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

macOS (Apple Silicon and Intel) and Linux (x64 and arm64). The binaries are attached to
each [release](https://github.com/transferable-io/cli/releases) with their SHA-256 checksums.

## Use

```sh
transferable login                                  # sign in through the browser
transferable upload ./Wedding-Dupont --folder "Dupont"
transferable deliver "Wedding - Dupont" --from "Dupont" --publish
```

`transferable --help` lists every command. Large uploads can run in the background with
`--background`, then `transferable status`.

## AI agents

Teach your agent (Claude Code, Cursor, Codex and others) to use Transferable:

```sh
npx skills add transferable-io/skills
```

## Support

contact@transferable.io
