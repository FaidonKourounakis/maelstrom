//import styles
import './_header.scss' 
import './_menu.scss' 

import { state, dom } from '../store'
import animation from './animation'

import router from '../router/router'
import routes from '../router/routes'

const toggleMenu = () => {
    state.showMenu = !state.showMenu
    animation.transformBurger()
    animation.slideMenu()
}

//to open/close menu with burger button
dom.burger.addEventListener('click', toggleMenu)

// //close the menu when clicking on a link
dom.linksList.addEventListener( 'click', toggleMenu )






