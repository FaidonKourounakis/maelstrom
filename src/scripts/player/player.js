/***************************************
 * DOCUMENTATION
 * 
 * 1. to make a new muse : 
 *      var muse = new use( src1, src2,... ) 
 * 
 * 2. to add an event listener: 
 *      muse.addEventListener( 'event', callback )
 *      event can be 'play | pause | stop | seek | change | next | previous | playing'
 * 
 * 3. add elements : 
 *      muse.addElement( type, element) 
 *      and type can be: '
 *          | currentTimeStamp -> prints current time
 *          | durationTimeStamp -> prints duration
 *          | completeTimeStamp -> prints the aformentioned in one
 * 
 * 4. ohter Methods: 
 *      muse.play(), 
 *      muse.pause(), 
 *      muse.stop(),
 *      muse.seekToPercentage( 10 ),
 *      muse.seekToSeconds( 50 ),
 *      muse.next(),
 *      muse.previous(),
 *      
 * 5. properties: 
 *      muse.playing
 *      muse.paused
 *      muse.duration
 *      muse.currentSeconds
 *      muse.currentPercentage
 *      
 */



import {Howl, Howler} from 'howler';
import { dom, fn } from '../store'

class Muse {


    constructor( ...src ) {
        if (!src) {
            throw   'Error: no src given to Muse constructor' 
        } else {

            // Create the new Audio element
            this.srcIndex = 0
            this.audio = new Audio( src[ this.srcIndex ] )
            this.audio.addEventListener( 'timeupdate', e => this.ontimeupdate(),  )

            this.state = {
                playing: false
            }
        }
    }

    // private 
    ontimeupdate() {
        
        this.onplaying ? this.onplaying() : undefined 

        this.updateUI()

    }
    updateUI() {
        if ( this.bar ) {
            this.bar.inner.style.width = this.currentPercentage * 100 + '%'
        }

        let cur = {
            min: Math.floor(this.currentSeconds / 60 ),
            sec: Math.floor( this.currentSeconds % 60 )
        }
        let dur = {
            min: Math.floor( this.duration / 60 ),
            sec: Math.floor( this.duration % 60 )
        }
        if ( this.currentTimeStamp ) {
            this.currentTimeStamp.innerText = `${ cur.min }:${ cur.sec }`
        }
        if ( this.durationTimeStamp ) {
            this.durationTimeStamp.innerText = `${ dur.min }:${ dur.sec }`
        }
        
        if ( this.completeTimeStamp ) {
            this.completeTimeStamp.innerText = `${cur.min}:${cur.sec} / ${dur.min}:${dur.sec}`
        }
    }
    

    // public properties
    get duration() {
        return this.audio.duration
    }
    get currentSeconds() {
        
        return this.audio.currentTime
    }
    get currentPercentage() {
        return this.currentSeconds / this.audio.duration
    }
    get playing() {
        return this.state.playing
    }
    get paused() {
        return !this.state.playing
    }


    // public methods
    addEventListener( event, callback ) {
        this[ 'on' + event ] = callback 
    }
    addSeekBar( outer, inner ) {

        if ( outer && inner ) {// set the bar property
            this.bar = {
                outer,
                inner
            }
            fn.onmousehold( this.bar.outer , e => { //seek the bar when
                
                let barPositionX = this.bar.outer.getBoundingClientRect().left
                let barWidth = this.bar.outer.clientWidth

                let percentage = ( e.clientX - barPositionX ) / barWidth // calculate the percentage
                
                if ( percentage >= 0 && percentage <= 1 ) { // check if the mouse is insed the bar
                    
                    this.seekToPercentage( percentage ) 
                    
                    this.updateUI()

                }

            }, 50)
        } else {
            throw `incorrect arguments given to addSeekBar()`
        }
    }
    addElement( type, el ) {

        this[type] = el
    }
    play() { // when forced to play

        this.audio.play() // play the audio

        this.onplay ? this.onplay() : undefined

        this.state.playing = true
    }
    pause() {

        this.audio.pause() 

        this.onpause ? this.onpause() : undefined

        this.state.playing = false
    }
    seekToSeconds( time ) {
        if ( time >= 0 && time <= this.duration ) {
            this.audio.currentTime = time
            this.onseek ? this.onseek() : undefined

            this.state.playing ? this.play() : this.pause()
        } else {
            throw `incorrect time stamp passed to updateTime()`
        }
    }
    seekToPercentage( percentage ) {
        this.seekToSeconds( percentage * this.duration )
    }

    
    
}


export default Muse
