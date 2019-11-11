import { dom, fn } from '../store'
import routes from './routes'


window.addEventListener( 'onload', e => {
    let path = window.location.pathname
    router( {url: path} ) 
})

const router = route => {
    //sets the current route
    let currentRoute
    if ( route.name && routes.find( currRoute => currRoute.name == route.name ) ) { //checks if the name is given and if it exists
        currentRoute = routes.find( currRoute => currRoute.name == route.name )
    } else if ( route.url && routes.find( currRoute => currRoute.url == route.url ) ) {
        currentRoute = routes.find( currRoute => currRoute.url == route.url )
    } 

    //adds the routes url to the history
    window.history.pushState( 
        {}, //state object in order to be able to retrieve the route
        `visited the ${currentRoute.name} section`, // the message | idk where this is used but i added it
        window.location.origin + currentRoute.url // and finally the url is given
    )

    // changes the router view
    dom.routerView.innerHTML = currentRoute.component
}
export default router

//set up links and set the landing page to home:
for ( let route of routes ) {
    route.link.addEventListener( 'click', () => router( route ) );
}
router( { name: 'home' } )
console.log(window)
window.addEventListener('popstate', ()=>console.log('popstate'))
window.addEventListener('onload', ()=>console.log('popstate'))