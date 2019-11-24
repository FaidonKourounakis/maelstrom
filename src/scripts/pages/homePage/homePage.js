
import template from './template.html'
import { dom, fn } from '../../store'

const id = 'home-page'

function insert() {
    console.log( 'homepage setup' )
}
function eject() {

}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}