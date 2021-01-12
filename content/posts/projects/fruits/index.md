---
title: Fruits
date: "2019-07-27"
description: "Connect three game made in vanilla JavaScript"
tags: ["Projects", "Gamedev", "JavaScript"]
---

<a href="https://github.com/Larqqa/Fruits/tree/game-maybe" class="icon">
  <i class="fab fa-github"></i>
</a>

<a href="https://fruits-game.netlify.com/" class="icon">
  <i class="fas fa-laptop"></i>
</a>

![Fruits](./Fruits.png)

I saw this cool image of some sneaker product page on Reddit with an isometric cube grid, and immidiately wanted to try making it with CSS. Getting the boxes look just right took a bit of trial and error, but it ended up looking really neat. After finishing the isometric grid with just HTML and CSS, i thought it would make for a cool little game.

I decided to try and continue on the vanilla train, and made the functionality with vanilla javascript.

The game consists of a simple set of rules:
* Try to connect three fruits in any direction
* To do this, exchange the position of a fruit to a location that is next to it in the grid
* When you connect three fruits, they get replaced with random fruits and you get a point
* You can move fruits without connecting three fruits, so you can play the game infinitely.

This game was a good recap for using vanilla tools and for DOM manipulation with JavaScript.

As a concept this was a fun little weekend project. If I was to make it again, I would make it more complex, with moving the whole column down when you connect three fruits and make fail states and a leaderboard. This might be planned for the unforeseeable future if I have interest to come back to this.