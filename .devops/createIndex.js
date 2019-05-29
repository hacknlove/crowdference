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
  lastActivity: 1
})
