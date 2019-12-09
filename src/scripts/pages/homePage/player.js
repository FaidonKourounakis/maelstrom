
import {Howl, Howler} from 'howler';
import { state, dom, fn } from '../../store'
import Muse from '../../player/amuse'

import path from 'path'

function setupPlayer() {
    // DOM MANIPULATION (to-do)
    // 1. add the .paused class to dom.player
    // add the seeking class to dom.home.player when we are dragging
    // 2. dom.bar <- set the width from 0 to 100%
    // 3. dom.track for the song title
    // 4. dom.album for the album title
    // somehow grap the right 

    state.getMusicData().then( data => {

        const albumNames = Object.keys( data.albums )
        const album = albumNames[ Math.floor( Math.random() * albumNames.length ) ]
        
        const songIds = Object.keys( data.albums[ album ] )
        const song = data.albums[ album ][ songIds[ Math.floor( Math.random() * songIds.length ) ] ]

        
        let homePlayer = new Muse( song.src )

        dom.home.btn.addEventListener( 'click', onclick )
        function onclick() {
            if ( homePlayer.paused ) {
                homePlayer.play()
            } else {

                homePlayer.pause()

            }
        } 

        homePlayer.addSeekBar( dom.home.outerBar, dom.home.innerBar )
        homePlayer.addElement( 'completeTimeStamp', dom.home.time)

        homePlayer.addEventListener( 'play', () => {
            fn.removeAllClassesOf( dom.home.player, 'paused' )
        })
        homePlayer.addEventListener( 'pause', () => {
            dom.home.player.classList.add( 'paused' )
        })

        dom.home.album.innerText = album
        dom.home.track.innerText = song.title
        })
}


export { setupPlayer }
