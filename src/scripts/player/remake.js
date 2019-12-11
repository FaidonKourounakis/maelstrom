class Amuse {

    constructor( src, id, meta, load ) {
        if ( !src && !id ) {
            this._currentMuseIndex = false
        } else {
            this.addMuse( src, id, meta, load)
            this._currentMuseIndex = 0
        }
    }

    /************************************
     * PUBLIC METHODS
     */

    load( id = this.currentMuse.id ) {
        if ( !this.getMuseById( id ) ) {
            throw new Error( 'No muse exists with the id passed to load()' )
        } else {
            let muse = this._muses.find( muse => muse.id === id )
            if ( !muse.audio ) {
                muse.audio = new Audio( muse.src ) 
                for ( event in this._audioEventListeners ) {
                    muse.audio.addEventListener( event, this._audioEventListeners[ event ] )
                }
                this._on( 'load' )
            }
        }
    }

    play() {
        // the user's event listener is called from this._audioEventListeners
        this.load()
        this.currentMuse.audio.play()
    }
    
    pause() {
        // the user's event listener is called from this._audioEventListeners
        this.load()
        this.currentMuse.audio.pause()
    }

    //stop() {}

    //next() {}

    //previous() {}

    //skipToId( id ) {}

    addMuse( src, id = false, meta = {}, load = true ) {

        if ( !id ) {
            throw new Error( 'No id given to Muse constructor' )
        } else if ( this.getMuseById( id ) ) {
            throw new Error( 'Used Id given to Muse constructor. Unique muse id is required.' )
        } else {
            this._muses.push( {
                src,
                id,
            } )
            if ( load ) {
                this.load( id )
            }
        }


    }
    
    //removeMuseById( id )  {}

    //removeMuseBySrc( src ) {}

    //addMetaData( id, meta = {} ) {}

    addSeekBar( inner, outer ) {
        if ( !inner || !outer ) throw new Error('No elements to the .addSeekBar() method')
        else this._elements.bar.push( { inner, outer } )
    }

    addElement( type, el ) {
        if ( ! this._elements[ type ] ) {
            throw new Error( 'This type of element is not supported. Choose from ' + Object.keys( this._elements ).join(' | ') )
        } else {
            this._elements[ type ].push( el )
        }
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

    //set currentSeconds( s ) {}

    //set currentPercentage( p ) {}

    //set volume( v ) {}


    /****************************************
     * PUBLIC GETTERS
     */

    //get playing() {}
    
    //get paused() {}

    //get duration() {}

    //get currentSeconds() {}

    //get currentPercentage() {}

    get currentMuse() {
        if ( this._currentMuseIndex === false ) throw new Error('No muse Exists yet')
        else return this._muses[ this._currentMuseIndex ]
    }


    /**********************************
     * PUBLIC PROPERTIES
     */

    autoSkip = false


    /************************************
     * PRIVATE
     */

    _muses = []

    _currentMuseIndex = 0
    
    _getMuseIndex = {
        byId( id ) {},
        bySrc( id ) {},
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
    
    _on( event ) { 
        this._eventListeners[ event ].forEach( fn => fn( this ) ) 
    }

    _elements = {
        currentTime: [],
        durationTime: [],
        completeTime: [],
        bar: []
    }

    get _museIds() {
        return this._muses.map( val => val.id )
    }

    get _audioEventListeners() {
        return {
            play: e => {
                this._on( 'play' )
            },
            pause: e => {
                this._on( 'pause' )
            },
            timeupdate: e => {},
            error: e => {},
        }
    }
    
}

export default Amuse