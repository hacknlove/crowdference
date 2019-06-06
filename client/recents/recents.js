import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'

Template.recents.show = function () {
  ventanas.cleanContainers()
  ventanas.insert({
    _id: 'recents',
    _c: 'primary'
  })
  ventanas.insert({
    _id: 'sponsors',
    _c: 'secondary'
  })
  ventanas.conf('path', '/recents')
  window.scrollTo(0, 0)
}

Template.recents.onCreated(function () {
  this.subscribe('recents')
})

Template.recents.helpers({
  urls () {
    return urls.find({}, {
      sort: {
        lastActivity: -1
      }
    })
  }
})
