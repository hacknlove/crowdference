import { Meteor } from 'meteor/meteor'
import { urls } from '/common/baseDeDatos'
import { salirValidacion, validacionesComunes } from '/server/comun'

Meteor.publish('ranking', function (_id) {
  return urls.find({}, {
    sort: {
      bookmarks: -1
    },
    limit: 100
  })
})

Meteor.publish('recents', function () {
  return urls.find({}, {
    sort: {
      lastActivity: -1
    },
    limit: 100
  })
})

Meteor.publish('search', function (search) {
  console.log(search)
  salirValidacion({
    data: search,
    schema: validacionesComunes.texto
  })
  return urls.find({
    $text: {
      $search: search
    }
  }, {
    fields: {
      score: { $meta: 'textScore' }
    },
    sort: { score: { $meta: 'textScore' } },
    limit: 100
  })
})
