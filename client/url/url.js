import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'
import { Meteor } from 'meteor/meteor'

Template.url.show = function (url) {
  ventanas.cleanContainers()
  ventanas.insert({
    _id: 'url',
    _c: 'primary',
    url
  })
  ventanas.insert({
    _id: 'backLinks',
    _c: 'secondary',
    urlId: url._id
  })
  ventanas.conf('path', `/view/${encodeURIComponent(url.url[0])}`)
}

Template.url.onCreated(function () {
  this.subscribe('viewUrl', this.data.url._id)
})

Template.url.helpers({
  url () {
    return urls.findOne({
      _id: this.url._id
    }) || this.url
  },
  fromUrlId () {
    return urls.find({
      fromUrlId: this.url._id
    }, {
      sort: {
        [`votes.${this.url._id}`]: -1
      }
    })
  }
})

Template.url.events({
  'submit form' (event, template) {
    event.preventDefault()

    const input = template.$('input').val().trim()

    if (!input.length) {
      return
    }

    if (!input.match(/^http(s?):\/\/[-0-9a-z.]+\.[-0-9a-z.]/i)) {
      return
    }

    Meteor.call('url', input, (e, r) => {
      console.log(e, r)
      if (e) {
        return ventanas.error(e)
      }
      ventanas.update('url', {
        $set: {
          newLink: r
        }
      })
    })
  },
  'click form svg' (event, template) {
    template.$('form').submit()
  },
  'click .acceptNewLink' (event, template) {
    Meteor.call('addLink', {
      fromUrlId: template.data.url._id,
      toUrlId: this.url._id
    }, (e, r) => {
      console.log(e, r)
      ventanas.update('url', {
        $unset: {
          newLink: 1
        }
      })
    })
  },
  'click .rejectNewLink' () {
    ventanas.update('url', {
      $unset: {
        newLink: 1
      }
    })
  }
})
