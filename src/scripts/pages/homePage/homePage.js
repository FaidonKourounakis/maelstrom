import './style.scss'
import template from './template.html'
import { dom, fn } from '../../store'

const id = 'home-page'

function setup() {
    console.log( 'homepage setup')
}



export default {
    setup,
    template: fn.elementOfString( template ),
    id
}