

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
}
