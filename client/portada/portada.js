import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { localUrls, urls }  from '/common/baseDeDatos'

const start = function () {
    ventanas.insert({
        _id: 'header',
        _c: 'top'
    })
    ventanas.insert({
        _id: 'footer',
        _c: 'bottom'
    })
}

Template.portada.show = function  () {
    ventanas.insert({
        _id: 'portada'
    })
    ventanas.cleanContainers()
    ventanas.remove({
        _id: 'header'
    })
    ventanas.remove({
        _id: 'footer'
    })
    ventanas.conf('path', '/')
}

Template.portada.events({
    'click p' () {
        start()
        Template.ranking.show()
        ventanas.remove('portada')
    },
    'submit form' (event, template) {
        event.preventDefault()
        const busqueda = template.$('input').val().trim()

        if (!busqueda.length) {
            return
        }

        if (!busqueda.match(/^http(s?):\/\/[-0-9a-z.]+\.[-0-9a-z.]/i)) {

            return Meteor.call('search', busqueda, (e, r) => {
                console.log(e, r)
                if (e) {
                    return ventanas.error(e)
                }
            })
        }

        var url = localUrls.findOne({
            url: busqueda
        }) || urls.findOne({
            url: busqueda
        })

        start()

        if (url) {
            Template.url.show(url)
            ventanas.remove('portada')
            return
        }

        Meteor.call('url', busqueda, (e, r) => {
            console.log(e, r)
            if (e) {
                return ventanas.error(e)
            }
            Template.url.show(r)
            ventanas.remove('portada')
            localUrls.insert(r)
            return
        })

        //     if (this.closeOther === 'busqueda') {
        //         ventanas.update('busqueda', {
        //             $set: {
        //                 busqueda: busqueda
        //             }
        //         })
        //     } else {
        //         ventanas.close(this.closeOther)
        //         ventanas.insert({
        //             _id: 'busqueda',
        //             busqueda: busqueda
        //         })
        //     return
        // ventanas.close(this.closeOther)

    },
    'click form div' (event, template) {
        template.$('form').submit()
    }
})
