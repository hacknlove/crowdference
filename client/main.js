import { ventanas } from 'meteor/hacknlove:ventanas'
import { Mongo } from 'meteor/mongo'

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
