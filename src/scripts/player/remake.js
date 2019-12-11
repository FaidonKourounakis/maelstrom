class Amuse {

    constructor( src, id, meta, load ) {

        this.addMuse( src, id, meta, load )

    }

    /************************************
     * PUBLIC METHODS
     */
    //play() {}
    
    //pause() {}

    //stop() {}

    //next() {}

    //previous() {}

    //skipToId( id ) {}

    addMuse( src, id = false, meta = {}, load = true ) {

        if ( !id ) {
            throw new Error( 'No id given to Muse constructor' )
        } else if ( this._museExists( id ) ) {
            throw new Error( 'Used Id given to Muse constructor. Unique muse id is required.' )
        } else {

            this._muses.push( {
                src,
                id,
                meta,
                load,
                audio: load ? new Audio( src ) : undefined
            } )

        }


    }
    
    //removeMuseById( id )  {}

    //removeMuseBySrc( src ) {}

    //addMetaData( id, meta = {} ) {}

    //addSeekBar( inner, outer ) {}

    //addElement( type, el ) {}

    //addEventListener( type, callback ) {}


    /***********************************
     * PUBLIC SETTERS
     */

    //set currentSeconds( s ) {}

    //set currentPercentage( p ) {}


    /****************************************
     * PUBLIC GETTERS
     */

    //get playing() {}
    
    //get paused() {}

    //get duration() {}

    //get currentSeconds() {}

    //get currentPercentage() {}

    //get currentMuse() {}


    /**********************************
     * PUBLIC PROPERTIES
     */

    playOnLoad = true

    autoSkip = false


    /************************************
     * PRIVATE
     */

    _muses = [{id: 1},{id:2}]

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
        error: [],
    }

    _elements = {
        currentTime: [],
        durationTime: [],
        completeTime: [],
        outerBar: [],
        innerBar: [],
    }

    get _museIds() {
        return this._muses.map( val => val.id )
    }

    _museExists( id ) {
        return this._museIds.find( val => val == id ) ? true : false
    }
}

export default Amuse