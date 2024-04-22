# idea-weaver
 
To run:

Open a terminal and cd into the backend/weaver branch and run `./gradlew clean build`, then `./gradlew bootrun`.

Open another terminal and in the main branch run `npm start`.

This should open electron and allow you to play around with the current build.

## Overview

This is a story world creation and tracking program. Once completed you will be able to create different elements from your story (e.g. characters, magic, items, countries) and write out timelines, outlines, and write your story in the program. These different parts of the program are separated into different tabs.

## Technologies Used

Backend: Java, Sqlite

Frontend: React, Javascript, Electron

## Work in progress

Right now work is focused on the elements tab.

When complete you will be able to create different element categories and elements within those categories as well as reference elements within each other. The elements are build off a panel system that allows you to grounp related characteristics, art, and relationships together for easy lookup. You will also be able to STAR panels. Any panels that are STARed will show up in the mini-reference showed on other elements panels.

If you would like to see what work is in progress and what is planned for the future please check out the [trello page](https://trello.com/b/2itkoDtf/idea-weaver-project).
