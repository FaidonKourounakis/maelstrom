// IMPORT THE SASS WITH WEBPACK
// !!! it is needed in order to load the styles !!!
import "../sass/main.scss"

// initialise router to the homepage
import router from './router/router'
router( '/' )

// IMPORT JAVASCRIPT MODULES/ COMPONENTS so that their code is run
import header from './layout/header/header';

//testing: 
import './test'




