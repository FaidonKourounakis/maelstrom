
function onmousehold( el, fn, t = 100 ) {

    let eventCopy, holdX, holdY, pressed = false

    function updateMouse( e ) {
        eventCopy = e
        holdX = e.clientX
        holdY = e.clientY
    }
    function updateTouch( e ) {
        eventCopy = e
        holdX = e.touches[0].clientX
        holdY = e.touches[0].clientY
    }
    function insertListeners() {
        window.addEventListener( 'touchmove', updateTouch )
        window.addEventListener( 'mousemove', updateMouse )
        window.addEventListener( 'touchend', stopUpdate )
        window.addEventListener( 'mouseup', stopUpdate )
    }
    function ejectListeners() {
        window.removeEventListener( 'touchmove', updateTouch ) 
        window.removeEventListener( 'mousemove', updateMouse )
        window.removeEventListener( 'touchend', stopUpdate ) 
        window.removeEventListener( 'mouseup', stopUpdate ) 
    }
    function startUpdate() {
        insertListeners()
        let i = setInterval( () => {
            fn( eventCopy, holdX, holdY )
            if ( !pressed ) {
                ejectListeners() 
                clearInterval( i )
            }
        }, t )
    }
    function stopUpdate() {
        pressed = false
    }
    function mousedown( e ) {
        // console.log('mousedown')
        pressed = true
        updateMouse( e )
        startUpdate()
    }
    function touchstart( e ) {
        pressed = true
        updateTouch( e )
        startUpdate()
    }
    el.addEventListener( 'touchstart', touchstart ) 
    el.addEventListener( 'mousedown', mousedown )

}

class Amuse {

    constructor( src, id, meta, load ) {
        if ( src && id ) {
            this.addMuse( src, id, meta, load)
        }
    }
    /************************************
     * PUBLIC METHODS
     */

    async load( id ) {
        if ( id == undefined ) {
            if ( this.currentMuse ) id = this.currentMuse.id 
            else id = this._muses[ 0 ].id
        }
        if ( !this.getMuseById( id ) ) {
            throw new Error( 'No muse exists with the id passed to load()' )
        } else {

            let muse = this._muses.find( muse => muse.id === id )
            if ( !muse.audio ) {

                muse.audio = new Audio( muse.src ) 

                for ( event in this._audioEventListeners ) {
                    muse.audio.addEventListener( event, this._audioEventListeners[ event ] )
                }

                let int = setInterval( () => {

                    if ( muse.audio.readyState >= 1 ) {
                        this._on( 'load' )
                        this._updateElements()
                        clearInterval( int )
                        return true
                    }

                }, 5 )
            } else return true

        }
    }

    async play() {
        // the user's event listener is called from this._audioEventListeners
        this.load().then( () => {
            this.currentMuse.audio.play()
            this._updateElements()
            return true
        })
    }
    
    async pause() {
        // the user's event listener is called from this._audioEventListeners
        this.load().then( () => {
            this.currentMuse.audio.pause()
            this._updateElements() 
            return true
        })
    }

    async stop() {
        this.pause().then( () => {
            this.currentSeconds = 0
            this._on( 'stop' )
            this._updateElements()
            return true
        })
    }

    async next() {
        //if this is the last one return false
        if ( this._currentMuseIndex + 1 >= this._muses.length ) {
            return false
        } else {
            const after = async () => {
                this._currentMuseIndex ++ 
                this.play().then( () => {
                    this._on( 'next' )
                    this._on( 'skip' )
                    return true
                })
            }

            if ( this.rememberTime ) this.pause().then( after )
            else this.stop().then( after )
        }
    }

    async previous() {
        if ( this._currentMuseIndex === 0 ) {
            return false
        } else {
            const after = async () => {
                this._currentMuseIndex --
                this.play().then( () => {
                    this._on( 'previous' )
                    this._on( 'skip' )
                    return true
                })
            }

            if ( this.rememberTime ) this.pause().then( after )
            else this.stop().then( after )
        }
    }

    async skipToId( id ) {
        if ( ! this._getMuseIndexById( id ) ) return false
        else return await this.skipToIndex( this._getMuseIndexById( id ) )
    }

    async skipToIndex( i ) {
        if ( i >= 0 && i < this._muses.length ) {
            if ( this.rememberTime ) await this.pause()
            else await this.stop()
            this._currentMuseIndex = i
            await this.play()
            this._on( 'skip' )
            return true
        } else return false
    }

    addMuse( src, id = false, meta = {}, load = true ) {
        if ( !id ) {
            throw new Error( 'No id given to Muse constructor' )
        } else if ( this.getMuseById( id ) ) {
            throw new Error( 'Used Id given to Muse constructor. Unique muse id is required.' )
        } else if ( typeof src == 'string' ) {
            this._muses.push( {
                src,
                id,
                meta
            } )
            if ( load ) {
                this.load( id ).then( this._updateElements )
            } else this._updateElements()
        }
    }
    
    async removeMuseById( id )  {
        const museIndexToRemove = this._getMuseIndexById( id )
        if ( museIndexToRemove === undefined ) throw new Error('Muse id doesnt exist, cannot remove the muse')
        function remove( amuse ) {
            amuse._muses.splice( museIndexToRemove, 1 )
        }
        if ( museIndexToRemove === this._currentMuseIndex ) {

            console.log( '1 ')

            await this.stop()

            if( await this.next() ) {
                remove(this)
                this._currentMuseIndex --
            } else {
                await this.previous()
                remove(this)
            }
        } else if ( museIndexToRemove > this._currentMuseIndex ) {
            remove(this)
        } else if ( museIndexToRemove < this._currentMuseIndex) {
            remove(this)
            this._currentMuseIndex --
        }
    }

    async empty() {
        await this.stop()
        this._currentMuseIndex = 0
        this._muses = []
        this._updateElements()
    }

    async reset() {
        await this.empty()
        this.autoPlay = false
        this.rememberTime = true
        this._eventListeners.forEach( val => val = [] )
        this._elements.forEach( val => val = [] )
    }

    addSeekBar( outer, inner, t = 50 ) {
        
        if ( !inner || !outer ) throw new Error('No elements to the .addSeekBar() method')
        else {
            this._elements.bar.push( { inner, outer } )
            onmousehold( outer , ( e, x, y ) => { //seek the bar when you hold it
                let barX = outer.getBoundingClientRect().left
                let barWidth = outer.clientWidth
                let percentage = ( x - barX ) / barWidth // calculate the percentage
                
                if ( percentage >= 0 && percentage <= 1 ) { // check if the mouse is insed the bar
                    this.currentPercentage  = percentage
                    this._updateElements()
                }

                this._on( 'seek' )
            }, t )
        }
    }

    addElement( type, el ) {
        if ( ! this._elements[ type ] ) {
            throw new Error( 'This type of element is not supported. Choose from ' + Object.keys( this._elements ).join(' | ') )
        } else {
            this._elements[ type ].push( el )
        }
        this._updateElements()
    }

    addEventListener( type, callback ) {
        if ( ! this._eventListeners[ type ] ) {
            throw new Error( 'This type of event listener is not supported. Choose from ' + Object.keys( this._eventListeners ).join(' | ') )
        } else if ( typeof callback != 'function' ) {
            throw new Error( 'No callback function passed to Amuse.addEventistener()')
        } else {
            this._eventListeners[ type ].push( callback )
        }
    }

    getMuseById( id ) {
        let muse = this._muses.find( muse => muse.id === id )
        if ( muse ) return muse
        else return false
    }

    /***********************************
     * PUBLIC SETTERS
     */

    set currentSeconds( s ) {
        if ( s > this.duration || s < 0 ) throw new Error( 'Can\'t seek to time out of the muse\'s range.' )
        else {
            this.load().then( () => {
                this.currentMuse.audio.currentTime = s
            })
        }
    }

    set currentPercentage( p ) {
        this.currentSeconds = p * this.duration
    }

    //set volume( v ) {}


    /****************************************
     * PUBLIC GETTERS
     */

    get loaded() {
        return this.currentMuse 
            ? this.currentMuse.audio 
                ? true 
                : false
            :false
    }

    get playing() {
        if ( this.loaded && ! this.currentMuse.audio.paused ) {
            return true
        } else return false
    }
    
    get paused() {
        return ! this.playing
    }

    get duration() {
        if ( this.loaded ) {
            
            let dur = this.currentMuse.audio.duration
            return !isNaN( dur ) ? dur : 0
        } else return 0
    }

    get currentSeconds() {
        return this.loaded ? this.currentMuse.audio.currentTime : 0
    }

    get currentPercentage() {
        return this.currentSeconds / this.duration 
    }

    get currentMuse() { 
        if ( this._muses.length === 0 ) return false
        else {
            return this._muses[ this._currentMuseIndex ]
        }
    }


    /**********************************
     * PUBLIC PROPERTIES
     */

    autoPlay = false

    rememberTime = true

    /************************************
     * PRIVATE
     */

    _muses = []

    _currentMuseIndex = 0
    
    _getMuseIndexById( id ) {
        return this._muses.findIndex( muse => muse.id === id )
    }

    _eventListeners = {
        play: [],
        pause: [],
        stop: [],
        seek: [],
        next: [],
        previous: [],
        skip: [],
        playing: [],
        load: [],
        error: [],
    }
    
    _on( event, ...args ) { 
        this._eventListeners[ event ].forEach( 
            fn => fn( this.currentMuse, ...args ) 
        ) 
    }

    _elements = {
        currentTime: [],
        durationTime: [],
        completeTime: [],
        bar: [],
        // to implement:
        title: [],
        nextBtn: [],
        previousBtn: [],
        playBtn: [],
        album: [],
        title: [],
    }

    get _museIds() {
        return this._muses.map( val => val.id )
    }

    get _audioEventListeners() {
        return {
            play: e => {
                this._on( 'play' )
                this._updateElements()
            },
            pause: e => {
                this._on( 'pause' )
                this._updateElements()
            },
            timeupdate: e => {
                this._on( 'playing' )
                this._updateElements()
            },
            error: e => {
                this._on( 'error' , this)
            },
            ended: e => {
                if ( this.autoPlay ) {
                    if ( ! this.next() ) {
                        this.skipToIndex( 0 )
                    }
                } else {
                    this.pause()
                }
            }
        }
    }

    _updateElements() {
        //update seekbar: 
        this._elements.bar.forEach( bar => {
            bar.inner.style.width = this.currentPercentage * 100 + '%'
        })
        let cur = {
            min: Math.floor(this.currentSeconds / 60 ),
            sec: Math.floor( this.currentSeconds % 60 )
        }
        cur.sec < 10 ? cur.sec = '0' + cur.sec : undefined
        let dur = {
            min: this.loaded && this.duration ? Math.floor( this.duration / 60 ) : '--',
            sec: this.loaded && this.duration ? Math.floor( this.duration % 60 ) : '--'
        }
        dur.sec < 10 ? dur.sec = '0' + dur.sec : undefined
        this._elements.currentTime.forEach( el => {
            el.innerText = `${ cur.min }:${ cur.sec }`
        })
        this._elements.durationTime.forEach( el => {
            el.innerText = `${ dur.min }:${ dur.sec }`
        })
        this._elements.completeTime.forEach( el => {
            el.innerText = `${cur.min}:${cur.sec} / ${dur.min}:${dur.sec}`
        })
        
    }
    
}

export default Amuse