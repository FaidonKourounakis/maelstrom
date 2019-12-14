

export let state = {

    hover: false,
    
    showMenu: false,

    musicDataLink: 'https://res.cloudinary.com/faidondev/raw/upload/v1575983000/Maelstrom%20Assets/data/music_ad2vm8.json',
    
    async getMusicData() {
        if ( !this.musicData ) {
            let response = await fetch( this.musicDataLink )
        
            let data = await response.json()
            
            this.musicData = data
        }
        
        return this.musicData
    }

}

export let dom = {
    burger: document.querySelector('.header__burger'),
    top: document.querySelector('.header__burger--top'),
    middle: document.querySelector('.header__burger--middle'),
    bottom: document.querySelector('.header__burger--bottom'),
    menu: document.querySelector('.menu'),
    linksList: document.querySelector( '.menu__list' ),
    routerView: document.getElementById( 'router-view' ),
    placeholderFooter: document . getElementById( 'placeholder--footer' ),
}

export let fn = {
    objFindValue( obj, callback ) {
        for ( let i in obj ) {
            if ( callback( obj[i] ) ) {
                return obj[i]
            }
        }
    },
    objFindKey( obj, callback ) {
        for ( let i in obj ) {
            if ( callback( obj[i] ) ) {
                return i
            }
        }
    },
    elementOfString( str ) {
        let el = document.createElement( 'div' )
        el.innerHTML = str
        return el
    },
    removeAllClassesOf( el, cla ) { // removes all instances of the .class of one element

        if ( el.classList.contains( cla ) ) { // checks if it has the class

            el.classList.remove( cla ) // then remove one instance of that class
            
            this.removeAllClassesOf( el, cla ) // repeat process till all instances are gone

        }
    },
    onmousehold( el, fn, t = 100 ) {

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
        }
        function ejectListeners() {
            window.removeEventListener( 'touchmove', updateTouch ) 
            window.removeEventListener( 'mousemove', updateMouse ) 
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
        el.addEventListener( 'mousemove', mousedown )
        window.addEventListener( 'touchend', stopUpdate ) 
        window.addEventListener( 'mouseup', stopUpdate )
    }
}
