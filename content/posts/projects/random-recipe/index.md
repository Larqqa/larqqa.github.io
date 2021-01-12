---
title: Random Recipe
date: "2019-07-24"
description: "A website that gives you random recipe suggestions."
tags: ["Projects", "React", "Express", "Node"]
---

<a href="https://github.com/Larqqa/RESTful-recipes" class="icon">
  <i class="fab fa-github"></i>
</a>

<a href="https://random-resepti.herokuapp.com/" class="icon">
  <i class="fas fa-laptop"></i>
</a>

![RandomRecipe](./RandomRecipe.png)

I've run into the problem of "what should we eat" so many times that i decided to resolve the problem once and for all. This web application serves you a random recipe when you enter the site. You can make a user and add new recipes to the website. These recipes are then served to all the users who are faced with the conundrum of food.

The website is another CRUD application. You can make an account, edit the account, and remove the account. With an account you can make, edit and delete recipes. These recipes are not deleted when you delete your user account. On the website, you can also browse all the recipes. There is simple filtering to let you view only a certain category of recipes. The filter has a selection for certain meal and an assortment of different food items that the recipes can contain.

The website is a MERN (MongoDB, Express, React and Node) app. This was the first web app I built completely on my own, utilizing React router, MongoDB and Mongoose, Express and Jest. This was my continuation of the course [Full Stack open 2019](https://fullstackopen.com/). I mainly made tests for communications between the back end and database, since that was the most critical thing to have working properly. I also implemented my own password encyption functions with Node's Crypto module. The crypto module has the building blocks, like salts and hashing, but I wanted to build the system to utilize these myselffor practice.

I tried to design the website with a "mobile first" approach, as you would mostly use something like this on the go, or in the kitchen. Desktop use would mostly be for making and editing the recipes.