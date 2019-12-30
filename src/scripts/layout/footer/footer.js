
import template from './footer.html' 

import { state, dom } from '../../store'

export default function() {
    dom.footers().forEach( e => e.innerHTML = template )
}

