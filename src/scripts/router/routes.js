import homePage from '../pages/homePage/homePage'
import musicPage from '../pages/musicPage/musicPage'
import aboutPage from '../pages/aboutPage/aboutPage'
import comebackPage from '../pages/comebackPage/comebackPage'

/* 
    ************ROUTER DOCUMENTATION************

    !!!
    every component that is used should export default {
        template: (an element with the html. 
            You can use the fn.elementOfString from scripts/store 
            to turn html string into a usable document.element.),
        insert() { function that creates event listeners needed for the page's activity },
        eject() { function that disables music etc when leaving the page },
        id: (the id string of the component's container. e.g. id: 'home-page')
    }
    !!!
    every route should have a name, a url (the path), and the component described above
    !!!
    when creating a router link, the element should have an attribute route="url"
*/

const routes = [
    { 
        name: 'home',
        url: '/music',
        component: homePage,
    },
    { 
        name: 'music',
        url: '/',
        component: musicPage,
    },
    { 
        name: 'about',
        url: '/about',
        component: aboutPage,
    },
    { 
        name: 'comeback',
        url: '/comeback',
        component: comebackPage,
    },
]

export default routes