import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'

Template.portada.events({
    'click p' () {
        console.log('p')
        ventanas.insert({
            _id: 'header',
            _c: 'top'
        })
        ventanas.insert({
            _id: 'footer',
            _c: 'bottom'
        })
        ventanas.insert({
            _id: 'ranking',
            _c: 'primary'
        })
        ventanas.insert({
            _id: 'sponsors',
            _c: 'secondary'
        })
        ventanas.remove('portada')
    },
    'submit form' (event, template) {
        event.preventDefault()
        const busqueda = template.$('input').val().trim()

        if (!busqueda.length) {
            return
        }
        console.log(busqueda)
    },
    'click form div' () {
        template.$('form').sumbit()
    }

})
