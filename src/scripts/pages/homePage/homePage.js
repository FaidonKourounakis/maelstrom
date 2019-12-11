
import template from './template.html'
import { state, dom, fn } from '../../store'
const id = 'home-page'
import Muse from '../../player/amuse'

let data = {}

function setupPlayer() {

    state.getMusicData().then( music => {

        const albumNames = Object.keys( music.albums )
        const album = albumNames[ Math.floor( Math.random() * albumNames.length ) ]
        
        const songIds = Object.keys( music.albums[ album ] )
        const song = music.albums[ album ][ songIds[ Math.floor( Math.random() * songIds.length ) ] ]

        
        data.player = new Muse( song.src, 'homePlayer' )
        
        dom.home.btn.addEventListener( 'click', onclick )
        function onclick() {
            if ( data.player.paused ) {
                data.player.play()
            } else {
                data.player.pause()
            }
        } 

        data.player.addSeekBar( dom.home.outerBar, dom.home.innerBar )
        data.player.addElement( 'completeTimeStamp', dom.home.time)

        data.player.addEventListener( 'play', () => {
            fn.removeAllClassesOf( dom.home.player, 'paused' )
        })
        data.player.addEventListener( 'pause', () => {
            dom.home.player.classList.add( 'paused' )
        })

        dom.home.album.innerText = album
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
    console.log(data.player)
    data.player.pause()
}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}