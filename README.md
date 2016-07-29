## [The Amazing Farm Animal Viewer (React/Redux)](hhttp://llama-viewer.herokuapp.com/)
### By [Scott Vrable](http://scottvrable.com) / Made with [React.js](https://facebook.github.io/react/) and [Redux](http://redux.js.org/index.html) / Powered by [Flickr](http://flickr.com)

It's random, but this mobile-first, responsive, single-page app pulls in pictures of various farm animals tagged on Flickr, specifically: **llamas**, **cows**, **chickens**, **horses**, **pigs**, **sheep**, **goats** and **donkeys**. Why farm animals? Because they're slightly more interesting than pictures of what people ordered at a restaurant.

![llama viewer screenshot](https://raw.githubusercontent.com/scottvrable/llama-viewer-react/master/screenshots/llama-gallery.png)

On the initial page load, the app searches for images of llamas and loads the first 24 it finds based on "relevance" as determined by Flickr. (For the record, these images may not necessarily all be llamas. It's hard to control the random tags people put on their images.) The user can click on any of these square thumbnails to see a larger version of the image in a lightbox. The user can then click the left or right arrows to cycle through the images in this gallery. The "X" button in the top right exits out of the lightbox.

#### The "Show Me More" Button

![show me more button](https://raw.githubusercontent.com/scottvrable/llama-viewer-react/master/screenshots/show-me-more-llamas-button.png)

Clicking on this button will choose a random number between 1 and 40 (fewer than that if fewer photo pages of that animal exist), then send a new query to Flickr for that page of results. The gallery will repopulate with new images. I've limited the page query to 40 or under (or less if fewer than 40 pages exist) because it turns out that Flickr has an undocumented "feature" in which it only allow you to have access to approximately the first 1,500 photos in a query even if far more exist in its database. (Thank you, Stack Overflow.)

#### The "Show Me Something Else" Button

![show me something else button](https://raw.githubusercontent.com/scottvrable/llama-viewer-react/master/screenshots/show-me-something-different-button.png)

If you grow bored of llamas, you can click this button to see other farm animals. The currently selected animal will not appear in the list. Once you choose a new animal, a new query will be sent to Flickr that pulls in the first 24 images of that animal. The title of the page will now change from "The Amazing LLAMA Viewer!" to, for example, "The Amazing CHICKEN Viewer!" The "Show Me More Button" will now say, "Show Me More Chickens!"

#### Local Development

If you want to pull the source code down from GitHub and make some changes, by all means, do! And submit a pull request!

Clone the repo locally, navigate to the directory and install the necessary dependencies:

```
	> git clone https://github.com/scottvrable/llama-viewer-react.git
	> cd llama-viewer-react
	> npm install  
```

Next, do the first build of the application by running Gulp:

```
	> npm start
```

#### Final Notes

This application was built with React / Redux / JSX and Bootstrap 4 / Sass and React Router. I used Webpack for preprocessing, including CSS prefix appending, Sass compiling, concatenation and minification. No jQuery was used.
