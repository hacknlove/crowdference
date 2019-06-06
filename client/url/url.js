import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'
import { Meteor } from 'meteor/meteor'
import { votes } from '/client/main'
import { testUrl } from '/common/regex'

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
  window.scrollTo(0, 0)
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
        [`votesFrom.${this.url._id}`]: -1,
        bookmarks: -1,
        lastActivity: -1
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

    if (!input.match(testUrl)) {
      return
    }

    Meteor.call('url', input, (e, r) => {
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
  }
})

Template.newLinkActions.events({
  'click .acceptNewLink' (event, template) {
    const url = ventanas.findOne('url')
    Meteor.call('addLink', {
      fromUrlId: url.url._id,
      toUrlId: url.newLink._id
    }, (e, r) => {
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

Template.votesActions.helpers({
  votes () {
    return this.url.votesFrom[this.fromUrlId]
  },
  vote () {
    const vote = votes.findOne({
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id
    })

    if (!vote) {
      return 'vote'
    }
    if (vote.vote === 1) {
      return 'unUpVote active'
    }
    return 'unDownVote active'
  }
})

Template.votesActions.events({
  'click .vote>.upVote' () {
    votes.insert({
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id,
      vote: 1
    })
    Meteor.call('voteLink', {
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id,
      vote: 1
    })
  },
  'click .vote>.downVote' () {
    votes.insert({
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id,
      vote: -1
    })
    Meteor.call('voteLink', {
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id,
      vote: -1
    })
  },
  'click .unUpVote' () {
    votes.remove({
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id
    })
    Meteor.call('voteLink', {
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id,
      vote: -1
    })
  },
  'click .unDownVote' () {
    votes.remove({
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id
    })
    Meteor.call('voteLink', {
      fromUrlId: this.fromUrlId,
      toUrlId: this.url._id,
      vote: 1
    })
  }
})
