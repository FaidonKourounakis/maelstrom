
import template from './template.html'
import { state, dom, fn } from '../../store'
const id = 'home-page'
import footers from '../../layout/footer/footer'
import Muse from '../../player/amuse'

let data = {}

function setupPlayer() {
    footers()

    state.getMusicData().then( music => {

        music = music.music
        const songIds = Object.keys( music.songs )
        const randSongId = songIds[ Math.floor( Math.random() * songIds.length ) ]
        const song = music.songs[ randSongId ]

        
        data.player = new Muse( song.src, 'homePlayer' )
        

/********************************************************
 * the pause on the click event listener doesnt work
 * *****************************************************
 */

        dom.home.btn.addEventListener( 'click', event => {
            if ( data.player.paused ) {
                data.player.play()
            } else {
                data.player.pause()
            }
        } )


        data.player.addSeekBar( dom.home.outerBar, dom.home.innerBar )
        data.player.addElement( 'completeTime', dom.home.time)
        
        data.player.addEventListener( 'play', amuse => {
            fn.removeAllClassesOf( dom.home.player, 'paused' )
        })
        data.player.addEventListener( 'pause', amuse => {
            dom.home.player.classList.add( 'paused' )
        })

        dom.home.album.innerText = song.album
        dom.home.track.innerText = song.title
    
        
    })
}

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
    data.player.pause()
}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}