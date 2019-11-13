import { state, dom } from '../../store'


export default {

    transformBurger() {
        dom.top.classList.toggle('cross')
        dom.middle.classList.toggle('cross')
        dom.bottom.classList.toggle('cross')
    },
    
    slideMenu() {
        dom.menu.classList.toggle('menu--show')
    }
}

