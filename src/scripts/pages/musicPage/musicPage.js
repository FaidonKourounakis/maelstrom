
import template from './template.html'
import { dom, fn, state } from '../../store'
import footers from '../../layout/footer/footer'
import Amuse from '../../player/amuse'

const id = 'music-page'

let data = {
    songs: [],
    currentSong: {},
    songTemplate: `
        <div id="{{songId}}" class="music__song">

            <span class="music__song__icon">

                <div class="music__song__icon--paused">
                    <i class="fas fa-music"></i>
                </div>

                <div class="music__song__icon--playing">
                    <div class="dancing-bar dancing-bar--1"></div>
                    <div class="dancing-bar dancing-bar--2"></div>
                    <div class="dancing-bar dancing-bar--3"></div>
                </div>

            </span>

            <span class="music__song__info">
                <span class="music__song__info--title">
                    {{title}}
                </span>
                <span class="music__song__info--album">
                    {{album}}
                </span>
            </span>

            <span id="{{downloadId}}" class="music__song__download">
                <i class="fad fa-arrow-to-bottom"></i>
            </span>

        </div>
    `,
}

function insert() {
    footers()

    dom.music = {
        player: document.getElementById( 'music-player' ),
        playerBG: document.getElementById( 'music-player-background'),
        albumImg: document.getElementById( 'album-img' ),
        title: document.getElementById( 'music-title' ),
        album: document.getElementById( 'music-album' ),
        currentTime: document.getElementById( 'music-current-time' ),
        durationTime: document.getElementById( 'music-duration-time' ),
        outerBar: document.getElementById( 'music-bar-outer' ),
        innerBar: document.getElementById( 'music-bar-inner'),
        mainBtn: document.getElementById( 'music-main-btn' ),
        nextBtn: document.getElementById( 'music-next' ),
        previousBtn: document.getElementById( 'music-previous' ),
        songsList : document.getElementById( 'music-list' ),
    }

    /*
    set the background-image of #album-img and #music-player-background
    add the .paused class to mainBtn
    */
    state.getMusicData().then( ({ music }) => {

        // create an array with all the song data
        let songArray = []
        for ( let song in music.songs ) {
            data.songs.push( { ...music.songs[ song ], id: song  })
        }

        // sort the array
        data.songs = data.songs.sort( ( a, b ) => {
            const aName = a.title.toUpperCase()
            const bName = b.title.toUpperCase()
            if ( aName < bName ) return -1
            else return 1
        })

        // add all of them to an Amuse instance
        let amuse = new Amuse() 
        data.songs.forEach( song => amuse.addMuse( 
            song.src, 
            song.id, 
            { title: song.title, album: song.album, }, 
            false
        ) )

        // add functionality to the player 
        amuse.addSeekBar( dom.music.outerBar, dom.music.innerBar, 10 )// add seek bar
        amuse.addElement( 'currentTime', dom.music.currentTime )// add time stamps
        amuse.addElement( 'durationTime', dom.music.durationTime )

        //add play btn
        dom.music.mainBtn.addEventListener( 'click', e => {
            if ( amuse.paused ) amuse.play()
            else amuse.pause()
        } )
        amuse.addEventListener( 'play', muse => fn.removeAllClassesOf( dom.music.mainBtn, 'paused' ) )
        amuse.addEventListener( 'pause', muse => dom.music.mainBtn.classList.add( 'paused' ) )

        //add next and previous btn
        dom.music.nextBtn.addEventListener( 'click', e => amuse.next() )
        dom.music.previousBtn.addEventListener( 'click', e => amuse.previous() )


        // add the song elements:
        data.songs.forEach( song => {

            // replace the placeholders with data
            let html = data.songTemplate
            html = html
                .replace( '{{title}}', song.title )
                .replace( '{{title}}', song.title )
                .replace( '{{album}}', song.album )
                .replace( '{{songId}}', song.id )
                .replace( '{{downloadId}}', 'download' + song.id )
            
            // add them to the songs-list:
            dom.music.songsList.innerHTML += html
        } )

        // add functionality to the list: 
        data.songs.forEach( song => {
            document.getElementById( song.id ).addEventListener( 'click', e => {
                amuse.skipToId( song.id )
            } )
        } )
         
        let previousImg = ''
        let previousId = amuse.currentMuse.id
        function updateUI( muse ) { 

            // change title
            dom.music.title.innerText = muse.meta.title

            // change album
            dom.music.album.innerText = muse.meta.album


            // add selected class to the song
            fn.removeAllClassesOf( document.getElementById( previousId ), 'selected' )
            document.getElementById( muse.id ).classList.add( 'selected' )
            previousId = muse.id
            
            // change album image if needed
            let img = music.albums[ muse.meta.album ].img
            
            // fade out and in
            const player = dom.music.player
            //fade out
            
            function changeAlbum() {
                // change album image
                if ( previousImg != img ) {
                    previousImg = img
                    dom.music.playerBG.src = img
                    dom.music.albumImg.src = img
                }
            }
            async function fadeOut() {
                let opacity = 1
                let i1 = setInterval( () => {
                    opacity -= .01
                    console.log( opacity)
                    if ( opacity <= 0 ) {
                        clearInterval( i1 )
                        return true
                    }
                    player.style.opacity = opacity
                }, 1 )
            }
            async function fadeIn() {
                let opacity = 0
                let i2 = setInterval( () => {
                    opacity += .01
                    player.style.opacity = opacity
                    console.log( opacity)
                    if ( opacity >= 0 ) {
                        clearInterval( i2 )
                        return true
                    }
                }, 1 )
            }
            async function animation() {
                let a = await fadeOut()
                let b = await changeAlbum()
                let c = await fadeIn()
            }
            changeAlbum()
            
        }

        amuse.addEventListener( 'skip', updateUI )

        ////////////////////////////////////////////////////////
        // BEGIN the player
        amuse.skipToIndex( 0 )

    } )
}
function eject() {

}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}