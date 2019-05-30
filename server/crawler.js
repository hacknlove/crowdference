import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'
import { urls } from '/common/baseDeDatos'
import { salirValidacion, validacionesComunes } from '/server/comun'
import { Random } from 'meteor/random'

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
  var opciones

  if (url.match(/https:\/\/www.facebook/)) {
    opciones = {
      html: HTTP.get(url, {
        headers: {
          'User-Agent': 'FeedFetcher-Google; (+http://www.google.com/feedfetcher.html)',
          'Accept-Language': 'en-US'
        }
      }).content
    }
  } else {
    opciones = {
      url,
      headers: {
        'User-Agent': 'FeedFetcher-Google; (+http://www.google.com/feedfetcher.html)',
        'Accept-Language': 'en-US, en'
      }
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
    url = Array.from(new Set([response.data.ogUrl, url]))
  } else {
    url = [url]
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
    urls.update(l._id, {
      $addToSet: {
        url: {
          $each: url.url
        }
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
  url.votes = {}
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
