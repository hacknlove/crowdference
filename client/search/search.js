import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'
import { testUrl } from '/common/regex'

Template.search.show = function (search) {
  if (search.match(testUrl)) {
    return Meteor.call('url', search, (e, r) => {
      console.log(e, r)
      if (e) {
        return ventanas.error(e)
      }
      Template.url.show(r)
    })
  }

  ventanas.cleanContainers()
  ventanas.insert({
    _id: 'search',
    _c: 'primary',
    search
  })
  ventanas.insert({
    _id: 'sponsors',
    _c: 'secondary'
  })
  ventanas.conf('path', `/search/${encodeURIComponent(search)}`)
  window.scrollTo(0, 0)
}

Template.search.onCreated(function () {
  this.autorun(() => {
    const data = Template.currentData()
    Meteor.subscribe('search', data.search)
  })
})

Template.search.helpers({
  urls () {
    return urls.find({
      score: {
        $exists: 1
      }
    }, {
      sort: {
        score: -1
      }
    })
  }
})
