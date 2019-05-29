import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { localUrls, urls } from '/common/baseDeDatos'
import { Meteor } from 'meteor/meteor'

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

Template.portada.show = function () {
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

    start()
    Template.search.show(busqueda)
    ventanas.remove('portada')
  },
  'click form div' (event, template) {
    template.$('form').submit()
  }
})
