
import {Howl, Howler} from 'howler';
import { dom, fn } from '../../store'
import Muse from '../../player/player'

import path from 'path'

function setupPlayer() {
    // DOM MANIPULATION (to-do)
    // 1. add the .paused class to dom.player
    // add the seeking class to dom.home.player when we are dragging
    // 2. dom.bar <- set the width from 0 to 100%
    // 3. dom.track for the song title
    // 4. dom.album for the album title
    // somehow grap the right 

    let homePlayer = new Muse( 'https://res.cloudinary.com/faidondev/video/upload/v1575297829/Maelstrom%20low%20quality/flamboyant%20gevoelsfestijn/01_Intro_jwzpsv.mp3' )

    dom.home.btn.addEventListener( 'click', () => {
        if ( homePlayer.paused ) {
            homePlayer.play()
        } else {

            homePlayer.pause()
            dom.home.player.classList.add( 'paused' )

        }
    } )

    homePlayer.addSeekBar( dom.home.outerBar, dom.home.innerBar )
    homePlayer.addElement( 'completeTimeStamp', dom.home.time)

    homePlayer.addEventListener( 'play', () => {
        fn.removeAllClassesOf( dom.home.player, 'paused' )
    })
    homePlayer.addEventListener( 'pause', () => {
        dom.home.player.classList.add( 'pause' )
    })
}


export { setupPlayer }
