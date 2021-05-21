---
title: "Ubuntu VM Initializing"
layout: post
categories: linux
---

Setting up a new VM machine running Ubuntu with:
- **zsh** using [oh-my-zsh](https://ohmyz.sh) and [spacship prompt](https://github.com/denysdovhan/spaceship-prompt) theme.
- **neovim** with [vimplug](https://github.com/junegunn/vim-plug) plugin.
- Additional: docker, net-tools, nmap, etc.


## General
```
    sudo apt update && sudo apt upgrade -y
    sudo apt install -y git zsh neovim curl wget htop net-tools nmap'
```

## oh-my-zsh
- Install oh-my-zsh
```
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
- Changing SHELL manually 
```
    sudo chsh -s $(which zsh) <username>
```
- Spaceship promt theme 
```
    git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1 && ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```
- zsh-syntax-highlighting 
```
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## neovim & vimplug
- Install vimplug 
```
    sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```
- clone `.config/nvim` file from git 
```
    cd .config || mkdir .config && cd .config
    git clone https://github.com/d-clz/nvim.git
```

## docker & docker-compose
### using repository
- Setup the repository
```
    sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
```
- Add Docker's official GPG key 
```
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
- Add repository 
```
echo \
  "deb [arch=arm64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
```
- Install docker
```
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### using script
```
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
```

### using docker without sudo
```
    sudo usermod -aG docker <username>
```
