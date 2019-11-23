import { dom, fn } from '../store' // the store
import routes from './routes' // import routes


// the function that inserts a page
function insert( route ) {
    if ( route.alive ) {
        
        //(if alive) = (if this route has already been used) then just turn the display from 'none' > 'block'
        document.getElementById( route.component.id ).style.display = 'block'

    } else { //if the component hasn't been used: 
        route.alive = true

        // insert the component's html into the router-view
        document.getElementById( 'router-view' ).append( route.component.template )

        // run the component's setup (set up event listeners and stuff)
        route.component.insert()
    }
}

// function that ejects a page from the router-view and doesn't kill it
function eject( route ) {
    // just sets the display to none
    document.getElementById( route.component.id ).style.display = 'none'

    // run the component's eject function that disables features when leaving the router-view
    route.component.eject()
}


let oldRoute 
function router( url ) { // the function that changes the route

    if ( routes.find( currRoute => currRoute.url == url ) ) { //checks if the route exist
    
        let newRoute = routes.find( currRoute => currRoute.url == url ) // finds the requested route object


        //adds the routes url to the history
        window.history.pushState( 
            {url: url}, //state object in order to be able to retrieve the route
            newRoute.name, // the message | idk where this is used but i added it
            url // and finally the url is given
        )

        // changes the router view
        if ( oldRoute && oldRoute.name != newRoute.name ) { // if the route is different eject old one and insert new one
            eject( oldRoute ) 
            insert( newRoute )
            oldRoute = newRoute
        } else if ( oldRoute && oldRoute.name == newRoute.name ) { // if the route remaines the same don't do anything
            return
        } else if ( !oldRoute ) {
            insert( newRoute ) 
            oldRoute = newRoute
        }

    } else {
        alert( 'Invalid path. Redirected to home page' ) 
        router( '/' )
    }
}


// sets up the homepage when first loading website
router( window.location.pathname )


// changes route when back button is clicked (onpopstate)
window.addEventListener( 'popstate', e => {
    let path = window.location.pathname
    let url = e.state.url
    router( url ) 
})


// sets up router links
let routerLinks = Array.from(   
    document.querySelectorAll( '[route]' )
)
routerLinks.forEach( el => {
    el.addEventListener( 'click', e => {
        router( el.attributes.route.value )
    } )
} )


export default router