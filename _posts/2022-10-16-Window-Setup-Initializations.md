---
title: "Window & Powershell Initializing Setup"
layout: post
categories: window, powershell
---

Seting up a new working environment for Windows.
Since my company assign me a window11 workstation in my onboarding day, I realize that I need to have to workaround with Windows an PowerShell. Hope there's something you guys can use 😃.

## WSL2


## Terminal


## PowerShell
### 1. Chocolately
- First, we need some package manager (or actually a *window-cli-installer*, as we called it 😅), [chocolately](https://chocolatey.org/install) work for me. You can consider [Scoop](https://scoop.sh/) or [Winget]() instead.
- To install **Chocolately**, make sure you have an administrative shell (right-click powershel and 'Run as Administrator') and paste this:
```PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
- After that, you may need to restart your computer, then you can use `choco install` to install your needs.
### 2. Shell promt with oh-my-posh
After a while, I found [oh-my-posh](https://ohmyposh.dev/docs/) 😕. Yep, that's it.
Similar to what I normally use for Zsh in Linux, and also has the built-in [spaceship-promt](https://spaceship-prompt.sh/)
- Install/Update oh-my-posh:
```PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://ohmyposh.dev/install.ps1'))
```
- Fonts: 
	- Arcording to the [docs](https://ohmyposh.dev/docs/installation/fonts), we need to install [Nerd Fonts](https://www.nerdfonts.com/) for the promt working properly.
	- You can find fonts that recommend in the [docs](https://ohmyposh.dev/docs/installation/fonts) and install whatever you want.
- Edit `$PROFILE` (similar to `~/.bashrc` or `~/.zshrc` in Linux):
```PowerShell
notepad $PROFILE
```
> **⚠ Create new Profile if doesn't exist:**
> ```Powershell
> New-Item -Path $PROFILE -Type File -Force
> ```
- Add this line to your `$PROFILE`
```PowerShell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/${YOUR_THEME}.omp.json" | Invoke-Expression
```
You can choose whatever you want in the built-in [theme list](https://ohmyposh.dev/docs/themes) and replace the `${YOUR_THEME}` with it.

## Neovim
For me, who start with the Linux Vim since the first day, Window Notepad or even Notepad++ such a pain for typing 😅.
- First install Neovim with chocolately:
```PowerShell
choco install neovim
```
- Install [vim-plug](https://github.com/junegunn/vim-plug):
```PowerShell
iwr -useb https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim |`
    ni "$(@($env:XDG_DATA_HOME, $env:LOCALAPPDATA)[$null -eq $env:XDG_DATA_HOME])/nvim-data/site/autoload/plug.vim" -Force
```
- Configuring Neovim & vim-plug:
By default for window, nvim's stdpath at `C:\Users\$USERNAME\AppData\Local\nvim`. You can open a new nvim and type `:h init.vim` to check it out.
![[vim-init.png]]
- Create whatever you want for the vim-plug configurations inside `init.vim`. For references, checkout my default configurations at [github](https://github.com/d-clz/nvim.git).
- Start nvim and run `:PlugInstall`, nvim is now ready to use 👌.
## Docker & Docker-compose

## Kubectl

## Helm
