import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'

Template.ranking.show = function () {
  ventanas.cleanContainers()
  ventanas.insert({
    _id: 'ranking',
    _c: 'primary'
  })
  ventanas.insert({
    _id: 'sponsors',
    _c: 'secondary'
  })
  ventanas.conf('path', '/ranking')
  window.scrollTo(0, 0)
}

Template.ranking.onCreated(function () {
  this.subscribe('ranking')
})

Template.ranking.helpers({
  urls () {
    return urls.find({}, {
      sort: {
        bookmarks: -1
      }
    })
  }
})
