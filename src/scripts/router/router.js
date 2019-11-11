import { dom, fn } from '../store'
import routes from './routes'


const router = url => {

    if ( routes.find( currRoute => currRoute.url == url ) ) { //checks if the route exist
        
        let currentRoute = routes.find( currRoute => currRoute.url == url ) // finds the requested route object

        //adds the routes url to the history
        window.history.pushState( 
            {url: url}, //state object in order to be able to retrieve the route
            currentRoute.name, // the message | idk where this is used but i added it
            url // and finally the url is given
        )

        // changes the router view
        dom.routerView.innerHTML = currentRoute.component
    } else {
        alert( 'Invalid path. Redirected to home page' ) 
        router( '/' )
    }
}
export default router


// sets up the homepage when first loading website
window.addEventListener( 'load', e => {
    router( '/' ) 
})
// changes route when back button is clicked (onpopstate)
window.addEventListener( 'popstate', e => {
    let path = window.location.pathname
    let url = e.state.url
    router( url ) 
})


let routerLinks = Array.from(
    document.querySelectorAll( '[route]' )
)
// console.log(routerLinks[0].attributes)
routerLinks.forEach( el => {
    el.addEventListener( 'click', e => {
        router( el.attributes.route.value )
    } )
} )
