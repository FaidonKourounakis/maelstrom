import homePage from '../pages/homePage/homePage'
import musicPage from '../pages/musicPage/musicPage'
import aboutPage from '../pages/aboutPage/aboutPage'
import comebackPage from '../pages/comebackPage/comebackPage'

const routes = [
    { 
        name: 'home',
        url: '/',
        link: document.getElementById( 'link--home' ),
        component: homePage,
    },
    { 
        name: 'music',
        url: '/music',
        link: document.getElementById( 'link--music' ),
        component: musicPage,
    },
    { 
        name: 'about',
        url: '/about',
        link: document.getElementById( 'link--about' ),
        component: aboutPage,
    },
    { 
        name: 'comeback',
        url: '/comeback',
        link: document.getElementById( 'link--comeback' ),
        component: comebackPage,
    },
]

export default routes