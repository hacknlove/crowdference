import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { bookmarks } from '/client/main'

Template.bookmarkActions.helpers({
  bookmarked () {
    return bookmarks.findOne({
      _id: this.url._id
    }) ? 'active' : 'inactive'
  }
})

Template.bookmarkActions.events({
  'click .active' () {
    bookmarks.remove(this.url._id)
    Meteor.call('bookmark', {
      _id: this.url._id,
      action: -1
    })
  },
  'click .inactive' () {
    bookmarks.insert({
      _id: this.url._id
    })
    Meteor.call('bookmark', {
      _id: this.url._id,
      action: 1
    })
  }
})
