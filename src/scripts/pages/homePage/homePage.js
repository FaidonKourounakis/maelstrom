
import template from './template.html'
import { dom, fn } from '../../store'
const id = 'home-page'
import { setupPlayer } from './player'

function insert() {
    
    dom.home = {
        track: document.getElementById( 'home-track' ),
        album: document.getElementById( 'home-album' ),
        player: document.getElementById( 'home-player' ),
        time: document.getElementById( 'home-time' ),
        innerBar: document.getElementById( 'home-inner-bar' ),
        outerBar: document.getElementById( 'home-bar' ),
        slider: document.getElementById( 'home-slider' ),
        btn: document.getElementById( 'home-btn' ),
    }

    setupPlayer()
        

}
function eject() {

}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}