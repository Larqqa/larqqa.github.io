---
title: Asteroids
date: "2018-05-30"
description: "Asteroids game made in vanilla JavaScript"
tags: ["Projects", "Gamedev", "JavaScript"]
---

<a href="https://github.com/Larqqa/Electron-asteroids" class="icon">
  <i class="fab fa-github"></i>
</a>

<a href="https://those-asteroids.web.app/" class="icon">
  <i class="fas fa-laptop"></i>
</a>

![asteroids](./asteroids.png)

My interpretation of the classic asteroids game. This game was made using vanilla JavaScript.

This is one of my earlier projects using JavaScript. I decided to heavily rely on objects in JavaScript, which made handling the game state much easier. The basis for this very simple game engine was the HTML `canvas` element and `setInterval` to control the game loop.

The most difficulty I had with this project was the positioning and movements of all the game pieces, and the interactions between these pieces. I had to study implementing 2D coordinate systems in Javascript and implementing simple physics-esque calculations for the game. For example the ship uses a drag system for the movement. You apply a force when you want to move the ship, and it slows down with a constant drag every loop.