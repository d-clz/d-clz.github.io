---
title: "Customize MX Anywhere 3 with LogiOps [ArchLinux]"
layout: post
categories: linux, logitech, logiops, archlinux
---

`logiops` is an unofficial driver for Logitech mice and keyboard
*(Currently compatible only with HID++ >2.0 devices.)*  

In this article, we will try to customize Logitech MX Anywhere 3 Wireless Mouse buttons using [logiops](https://github.com/PixlOne/logiops), as a replace solution for [Logitech Options](https://www.logitech.com/en-us/product/options) which support Windows & Mac only.  


![mxanywhere3](https://bizweb.dktcdn.net/100/326/151/products/35b96b0d-3d94-44cd-af2c-35f72c04ad8b-cr0-0-1464-600-pt0-sx1464-v1.jpg?v=1606036870593)

## Install `logiops` from AUR
### 1. Dependencies:
- This project requires C++14 complier, `cmake`, `libevdev`, `libudev` and `libconfig`.
- Install dependencies:
```
    yay -S cmake libevdev libconfig pkgconf
```
- Simply install `logiops` with Arch User Repository:
```
    yay -S logiops-git
```
### 2. Start using `logiops`
- Start logiops daemon with `systemd`:
```
    sudo systemctl start logid
```
- Set daemon to start at boot:
```
    sudo systemctl enable logid
```

## Custom keys binding
### 1. Useful commands:
- Listing for connected device:
```
    sudo logid -v
```
- Debug config file (Highly recommend using when config file changed, by default is `/etc/logid.cfg`)
```
    sudo logid -v -c /etc/logid.cfg
```
### 2. Remappable Keys & Features
```
➜ sudo logid -v                       
[DEBUG] Unsupported device /dev/hidraw0 ignored
[DEBUG] Unsupported device /dev/hidraw1 ignored
[DEBUG] Unsupported device /dev/hidraw2 ignored
[INFO] Device found: MX Anywhere 3 on /dev/hidraw3:255
[DEBUG] /dev/hidraw3:255 remappable buttons:
[DEBUG] CID  | reprog? | fn key? | mouse key? | gesture support?
[DEBUG] 0x50 |         |         | YES        | 
[DEBUG] 0x51 |         |         | YES        | 
[DEBUG] 0x52 | YES     |         | YES        | YES
[DEBUG] 0x53 | YES     |         | YES        | YES
[DEBUG] 0x56 | YES     |         | YES        | YES
[DEBUG] 0xc4 | YES     |         | YES        | YES
[DEBUG] 0xd7 | YES     |         |            | YES
```
![buttons](https://file.hstatic.net/1000129940/file/logitech-mx-anywhere-3-for-mac-nd-6_a6ffe0961f614739ad79464bbf9587c4.jpg)
MX Anywhere 3 Button's CID table:
| Buttons           | CID  |
|:------------------|:----:|
|Magspeed Wheel     | 0x52 |
|Mode Shift Button  | 0xc4 |
|Back (thumb button)| 0x53 |
|Forward (thumb btn)| 0x56 |
All these 4 keys are gestures supported, we're going to customize them.  
Other 3 buttons are Mouse click buttons (`0x50` and `0x51`) and Devices Swicht Button (`0xd7`), just leave them alone for not getting fucked.
### 3. Customize configurations

