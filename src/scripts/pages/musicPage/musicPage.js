
import template from './template.html'
import { dom, fn } from '../../store'

const id = 'music-page'

function insert() {

}
function eject() {

}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}