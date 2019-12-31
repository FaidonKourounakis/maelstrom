
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

            <a href="{{download}}" download="{{fileName}}" target="_blank" id="{{downloadId}}" class="music__song__download">
                <i class="fad fa-arrow-to-bottom"></i>
            </a>

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
        data.amuse = new Amuse() 
        data.songs.forEach( song => data.amuse.addMuse( 
            song.src, 
            song.id, 
            { title: song.title, album: song.album, }, 
            false
        ) )
        data.amuse.rememberTime = false

        // add functionality to the player 
        data.amuse.addSeekBar( dom.music.outerBar, dom.music.innerBar, 10 )// add seek bar
        data.amuse.addElement( 'currentTime', dom.music.currentTime )// add time stamps
        data.amuse.addElement( 'durationTime', dom.music.durationTime )

        //add play btn
        dom.music.mainBtn.addEventListener( 'click', e => {
            if ( data.amuse.paused ) data.amuse.play()
            else data.amuse.pause()
        } )
        data.amuse.addEventListener( 'play', muse => fn.removeAllClassesOf( dom.music.mainBtn, 'paused' ) )
        data.amuse.addEventListener( 'pause', muse => dom.music.mainBtn.classList.add( 'paused' ) )

        //add next and previous btn
        dom.music.nextBtn.addEventListener( 'click', e => data.amuse.next() )
        dom.music.previousBtn.addEventListener( 'click', e => data.amuse.previous() )


        // add the song elements:
        data.songs.forEach( song => {

            // replace the placeholders with data
            let html = data.songTemplate
            html = html
                .replace( '{{title}}', song.title )
                .replace( '{{title}}', song.title )
                .replace( '{{album}}', song.album )
                .replace( '{{songId}}', song.id )
                .replace( '{{download}}' , song.download )
                .replace( '{{fileName}}', `${song.title} - Maelstrom (${song.album})`)
                .replace( '{{downloadId}}', 'download' + song.id )
            
            // add them to the songs-list:
            dom.music.songsList.innerHTML += html

        } )
        data.songs.forEach( song => {
            // add functionality to the list: 
            document.getElementById( song.id ).addEventListener( 'click', e => {
                data.amuse.skipToId( song.id )
            } )
            document.getElementById( 'download' + song.id ).setAttribute( 'download', song.download )
            document.getElementById( 'download' + song.id ).addEventListener( 'click', e => {
                e.stopPropagation()
            } ) 
        } )

         
        let previousAlbum = ''
        let previousId = data.amuse.currentMuse.id
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
            if ( muse.meta.album != previousAlbum ) {
                previousAlbum = muse.meta.album
                let src = music.albums[ previousAlbum ].img
                dom.music.playerBG.src = src
                dom.music.albumImg.src = src
            }
        }

        data.amuse.addEventListener( 'skip', updateUI )

        ////////////////////////////////////////////////////////
        // BEGIN the player
        data.amuse.skipToIndex( 0 )

    } )
}
function eject() {
    data.amuse.pause()
}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}