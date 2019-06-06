/* global db*/

db.urls.find().forEach(element => {
  element.url = element.url.map(url => {
    return url.replace(/^http(s?):\/\//, '')
  })

  db.urls.update({
    _id: element._id
  }, {
    $set: {
      url: Array.from(new Set(element.url))
    }
  })
})
