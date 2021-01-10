---
title: Color Picker
date: "2019-07-10"
description: "Color Picker app"
tags: ["Projects", "Java"]
---

[github](https://github.com/Larqqa/Color-Picker)

![ColorPicker](./ColorPicker.png)

This is a Color Picker app made with Java. This app uses the AWT library for the graphics.

The concept for this app is the same as other color picker tools, but this allows you to pick the color from anywhere on your desktop. The app uses your mouse position to get the pointed pixels color value. The app then gives you the piceked color as RGB-, HSV- and HEX-colors, for a wide range of options. The preview window lets the user see which pixel is being targeted, to allow for accurate color selection, even if the color is only a single pixel.

I had to use a bit of a hacky solution to make the window stay in focus. When you pick a color the app is minimized and then brought back to view, which toggles the focus back to the app. This lets the user pick multiple colors while the picker is active.