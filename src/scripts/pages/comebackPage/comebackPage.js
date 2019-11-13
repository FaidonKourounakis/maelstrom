import './style.scss'
import template from './template.html'
import { dom, fn } from '../../store'

const id = 'comeback-page'

function setup() {

}



export default {
    setup,
    template: fn.elementOfString( template ),
    id
}