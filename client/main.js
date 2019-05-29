import { ventanas } from 'meteor/hacknlove:ventanas'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

ventanas.cleanContainers = function cleanContainers () {
  ventanas.remove({
    _c: {
      $in: ['primary', 'secondary']
    }
  })
}

export const bookmarks = new Mongo.Collection(null)
/* eslint-disable-next-line */
new PersistentMinimongo2(bookmarks, 'bookmarks')

export const votes = new Mongo.Collection(null)
/* eslint-disable-next-line */
new PersistentMinimongo2(votes, 'votes')

if (Meteor.isDevelopment) {
  global.bookmarks = bookmarks
  global.votes = votes
}
