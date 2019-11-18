

import { state, dom } from '../../store'
import animation from './animation'

const toggleMenu = () => {
    state.showMenu = !state.showMenu
    animation.transformBurger()
    animation.slideMenu()
}

//to open/close menu with burger button
dom.burger.addEventListener('click', toggleMenu)

// //close the menu when clicking on a link
dom.linksList.addEventListener( 'click', toggleMenu )






