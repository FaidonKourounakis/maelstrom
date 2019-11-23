# The website

****

### Description
A small SPA for my father's band where people can discover them, listen to their music, download songs/albums, view pictures.

****

### Features / Technologies
I built it from scratch: 
- In vanilla.js (pure javascript)

- No UI framework. Just my own HTML and SASS

- Setup webpack from scratch ( compiling sass, collecting js html, hashing, copying assets, minifying) 

- Hosted on custom domain

- Created my own router for a small but Single-Page-App ( read documention in ./src/scripts/router/
router.js)

- Wrote a very perfomant CSS-only parallax effect ( it took me too much time ) 

- Created a pure js music player

- Lazy loaded images and songs

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

****

##### Author: 
Faidon C. Kourounakis
##### Portofolio: 
[Website](www.faidon.kourounakis.com)

