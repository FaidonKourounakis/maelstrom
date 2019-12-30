
import template from './template.html'
import { dom, fn } from '../../store'
import footers from '../../layout/footer/footer'

const id = 'about-page'

function insert() {
    footers()
}
function eject() {

}



export default {
    insert,
    eject,
    template: fn.elementOfString( template ),
    id
}