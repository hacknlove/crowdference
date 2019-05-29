import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'
import { bookmarks } from '/client/main'

Template.bookmarks.show = function () {
  ventanas.cleanContainers()
  ventanas.insert({
    _id: 'bookmarks',
    _c: 'primary'
  })
  ventanas.insert({
    _id: 'sponsors',
    _c: 'secondary'
  })
  ventanas.conf('path', '/bookmarks')
}

Template.bookmarks.helpers({
  bookmarks () {
    return bookmarks.find()
  }
})

Template.bookmark.onCreated(function () {
  this.subscribe('urlId', this.data._id)
})
Template.bookmark.helpers({
  url () {
    return urls.findOne(this._id)
  }
})
