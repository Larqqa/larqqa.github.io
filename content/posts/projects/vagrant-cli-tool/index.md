---
title: Vagrant CLI tool
date: "2020-09-18"
description: "A command line tool for making Wordpress development environments easily."
tags: ["Projects", "Vagrant", "PHP", "Bash", "Wordpress"]
---

<a href="https://github.com/Larqqa/Vagrant-Lamp-stack" class="icon">
  <i class="fab fa-github"></i>
</a>

This tool allows you to quickly and easily make new virtual machines with [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/), for developing and testing Wordpress websites. The tool is written in Bash, but is only tested to work on windows 10 (I know, what a weird mishmash). I like using Git BASH from [git for windows](https://gitforwindows.org/) which allowed me to build this tool using Bash. With some tweaking this could be made to work with other operating systems, which I might do in the future.

The purpose was to be able to quickly and easily make new virtual machines with Vagrant. Vagrant is a tool that helps with managing and building vitrual machines by automating the deployment you can have fully working virtual machines with very little effort. You can also utilize VirtualBox's snapshotting, which lets you save the state of the VM for example for testing purposes.

You can customize the setup options of the VM so you can better match your development environment with the production environment.

These options let you set:
* the name of the VM (default folder name is new-box and vm name is new-box + timestamp)
* the name of the Wordpress folder (default is wordpress)
* Apache2 instead of Nginx
* use PHP5.6 instead of 7.3
* use MySQL instead of MariaDB
* Purging of the default Wordpress content
* Installing of the All In One Migration plugin for quick & easy site importing

This tool also has an archiving functionality using [7-zip](https://www.7-zip.org/), so you can make full backups of your websites directory, that allows for example for easy transfer of the whole website between different developer's machines.