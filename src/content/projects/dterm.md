---
title: "dterm"
tagline: "SSH session manager — bookmarks, split panes, SFTP, tunnels"
tech: ["Go", "Bubble Tea", "x/crypto/ssh", "pkg/sftp"]
github: "https://github.com/d-clz/dterm"
---

A terminal SSH session manager, built as a TUI rather than a shell script wrapping `ssh`.

## Why a TUI

Keeping a list of hosts in `~/.ssh/config` works until you have more than a handful of them, each with its own port, jump host, or key. `dterm` keeps that list as something you can actually browse and launch from, instead of grepping a config file every time.

## What it does

- **Bookmarks** — saved hosts, organized rather than scattered across shell aliases.
- **Split panes** — more than one session on screen at once, without juggling terminal tabs.
- **SFTP** — browsing and transferring files over the same connection, no separate client.
- **Tunnels** — local/remote port forwarding managed alongside the sessions that need them.

## Built with

[Bubble Tea](https://github.com/charmbracelet/bubbletea) for the TUI, Go's `x/crypto/ssh` for the SSH transport, and `pkg/sftp` for file transfer — no shelling out to the system `ssh` binary.

Source and the full README are on [GitHub](https://github.com/d-clz/dterm).
