

# Website Description
A small SPA for my father's band where people can discover them, listen to their music, download songs/albums, view pictures.
- ### Home Page: 
    Random song player, responsive cards with the site's description.
- ### Music Page: 
    A full music player with all the band's songs loaded lazily, with a great UI!
- ### About Page: 
    Parallaxed images and paragraphs about the band
- ### Comeback Page: 
    




## Features / Technologies
I built it from scratch: 
- In vanilla.js (pure javascript)

- No UI framework. Just my own HTML SASS and vanilla JS

- Setup webpack from scratch ( compiling sass, collecting js html, hashing, copying assets, minifying, pollyfying ES6 JS ) 

- Hosted on custom domain

- Created my own router for a small Single-Page-App ( read documention in ./src/scripts/router/
router.js)

- Wrote a very perfomant CSS-only parallax effect ( took me too much time ) 

- Created a pure js audio-wrapper library: Amuse.js (and used it)

- Lazy loaded images and songs of different pages ( thanks to the router )

**** 

# Setup

1. Clone the repository on local pc:
    ```git
    git init
    git clone https://github.com/FaidonKourounakis/maelstrom.git
    ```
2. Install dependencies: 
    ```npm 
    npm install
    ```
3. Run development server
    ```npm
    npm run start
    ```
4. Build production files
    ```npm 
    npm run build
    ```
5. Deploy to gh-pages
    ```npm 
    npm run deploy
    ```
   

****

### Author: 
Faidon C. Kourounakis
### Portofolio: 
[Website](www.faidon.kourounakis.com)

