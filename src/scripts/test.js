import Amuse from './player/amuse'
import {dom} from './store'

const amuse = new Amuse( 'https://res.cloudinary.com/faidondev/video/upload/v1575297486/Maelstrom%20low%20quality/05_Jeroen_Groen_l0cxed.mp3', 3, {}, false)

amuse.play()
setTimeout( () => {
    amuse.removeMuseById(3)
}, 500)