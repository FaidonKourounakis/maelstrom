

export let state = {
    hover: false,
    showMenu: false,
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
    onmousehold( el, callback, t = 100 ) { // ads an 'onmousehold fake event handler

        let pressed = false

        let fakeEvent = { clientX: 0, clientY: 0 }
        window.addEventListener( 'mousemove', e => {
            fakeEvent.clientX = e.clientX
            fakeEvent.clientY = e.clientY
        })

        window.addEventListener( 'mouseup', e => {
            pressed = false
        })

        el.addEventListener( 'mousedown', e => {
            
            if ( !pressed ) {
                
                pressed = true

                let id = setInterval( () => {

                    if ( !pressed ) {
                        clearInterval(id)
                    } 
                    
                    callback( fakeEvent )
                    
                }, t )
            }
        })
    }
}
