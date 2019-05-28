import { Meteor } from 'meteor/meteor'
import { urls } from '/common/baseDeDatos'

Meteor.publish('ranking', function (_id) {
  return urls.find({}, {
    sort: {
      bookmarks: -1
    },
    limit: 100
  })
})
