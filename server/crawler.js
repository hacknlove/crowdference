import { Meteor } from 'meteor/meteor'
import { urls } from '/common/baseDeDatos'
import { salirValidacion, validacionesComunes } from '/server/comun'
import { Random } from 'meteor/random'
import { removeProtocol } from '/common/helpers'
import ogs from 'open-graph-scraper'

const meteorOGS = Meteor.wrapAsync(function (opciones, callback) {
  ogs(opciones, function (e, r) {
    if (e) {
      return callback(null, [])
    }
    callback(null, r)
  })
})

const rrss = {
  Instagram (response) {
    response.description = response.title.replace(/^.*?on Instagram: /, '')
    response.title = response.title.replace(/on Instagram:.*$/, '')
    return response
  },
  Twitter (response) {
    response.title = response.title.replace(/on Twitter$/, '')
    return response
  },
  reddit (response) {
    response.description = response.title.replace(/^.*?- /, '')
    response.title = response.title.replace(/ - .*$/, '')
    return response
  }
}

export const actualizar = function actualizar (url) {
  var response
  var opciones = {
    url,
    headers: {
      'User-Agent': 'FeedFetcher-Google; (+http://www.google.com/feedfetcher.html)',
      'Accept-Language': 'en-US, en'
    }
  }

  response = meteorOGS(opciones)

  if (!response) {
    return
  }

  if (!response.data) {
    return
  }

  if (response.data.ogUrl) {
    url = Array.from(new Set([
      removeProtocol(response.data.ogUrl),
      removeProtocol(url)
    ]))
  } else {
    url = [removeProtocol(url)]
  }

  var siteName = response.data.ogSiteName || response.data.twitterSite
  var image = (response.data.ogImage || {})
  response = {
    description: response.data.ogDescription,
    title: response.data.ogTitle,
    image: image.secure_url || image.url || undefined,
    url: url
  }

  if (rrss[siteName]) {
    return rrss[siteName](response)
  }
  return response
}

export const insertar = function insertar (url) {
  if (!url) {
    return
  }
  const l = urls.findOne({
    url: {
      $in: url.url
    }
  })

  if (l) {
    l.url.splice(3)
    l.url.push(url.url)

    urls.update(l._id, {
      $set: {
        url: l.url
      }
    })
    return l
  }
  url._id = Random.insecure.id()
  url.contentUpdated = new Date()
  url.lastActivity = new Date()
  url.bookmarks = 0
  url.totalLinks = 0
  url.totalBackLinks = 0
  url.toUrlId = []
  url.fromUrlId = []
  url.votesFrom = {}
  url.votesTo = {}
  url.ids = [url._id]

  urls.insert(url)
  return url
}

Meteor.methods({
  url (url) {
    salirValidacion({
      data: url,
      schema: validacionesComunes.href
    })

    return urls.findOne({
      url
    }) || insertar(actualizar(url))
  }
})
