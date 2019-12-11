import Amuse from '../scripts/player/remake'
import {dom} from './store'

const amuse = new Amuse( 'https://res.cloudinary.com/faidondev/video/upload/v1575297486/Maelstrom%20low%20quality/05_Jeroen_Groen_l0cxed.mp3', 3, {}, true)
amuse.addEventListener( 'play', e => console.log( 'from event listener'))
