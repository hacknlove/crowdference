/* global db */

db.urls.createIndex({
  title: 'text',
  description: 'text',
  url: 'text'
})

db.urls.createIndex({
  ids: 1
})

db.urls.createIndex({
  urlToId: 1
})
db.urls.createIndex({
  urlFromId: 1
})

db.urls.createIndex({
  lastActivity: 1
})

db.urls.createIndex({
  votesFrom: 1
})
db.urls.createIndex({
  votesTo: 1
})
