import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { Mongo } from 'meteor/mongo'
import { urls } from '/common/baseDeDatos'

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
    return Template.bookmarks.collection.find()
  }
})

Template.bookmarks.collection = new Mongo.Collection(null)
/* eslint-disable-next-line */
new PersistentMinimongo2(Template.bookmarks.collection, 'bookmarks')

Template.bookmark.onCreated(function () {
  this.subscribe('urlId', this.data._id)
})
Template.bookmark.helpers({
  url () {
    return urls.findOne(this._id)
  }
})
