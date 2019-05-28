import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

Template.bookmarkActions.helpers({
  bookmarked () {
    return Template.bookmarks.collection.findOne({
      _id: this.url._id
    }) ? 'active' : 'inactive'
  }
})

Template.bookmarkActions.events({
  'click .active' () {
    Template.bookmarks.collection.remove(this.url._id)
    Meteor.call('bookmark', {
      _id: this.url._id,
      action: -1
    })
  },
  'click .inactive' () {
    Template.bookmarks.collection.insert({
      _id: this.url._id
    })
    Meteor.call('bookmark', {
      _id: this.url._id,
      action: 1
    })
  }
})
