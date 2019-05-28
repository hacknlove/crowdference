import { Meteor } from 'meteor/meteor'
import { links, urls } from '/common/baseDeDatos'
import { salirValidacion, salir, validacionesComunes } from '/server/comun'

import Joi from 'joi'

const validaciones = {
  agregarlink: Joi.object().keys({
    fromUrlId: validacionesComunes._id.required(),
    toUrlId: validacionesComunes._id.required()
  }),
  voteLink: Joi.object().keys({
    linkId: validacionesComunes._id.required(),
    vote: Joi.number().valid([-1, 1])
  }),
  links: validacionesComunes._id
}

Meteor.methods({
  addLink (opciones) {
    salirValidacion({
      data: opciones,
      schema: validaciones.agregarlink
    })
    urls.find({
      _id: opciones.fromUrlId
    }).count() || salir(404, '"from" not found')
    urls.find({
      _id: opciones.toUrlId
    }).count() || salir(404, '"to" not found')

    var link = links.findOne({
      fromUrlId: opciones.fromUrlId,
      toUrlId: opciones.toUrlId
    }, {
      fields: {
        votos: 1
      }
    })

    if (!link) {
      link = links.insert({
        fromUrlId: opciones.fromUrlId,
        toUrlId: opciones.toUrlId,
        votos: 1
      })
      urls.update({
        _id: opciones.fromUrlId
      }, {
        $addToSet: {
          linkUrlId: opciones.toUrlId
        },
        $inc: {
          links: 1
        }
      })
      urls.update({
        _id: opciones.toUrlId
      }, {
        $addToSet: {
          linkUrlId: opciones.fromUrlId
        },
        $inc: {
          links: 1
        }
      })
      return
    }

    links.update(link._id, {
      $inc: {
        votos: 1
      }
    })
  },
  voteLink (opciones) {
    salirValidacion({
      data: opciones,
      schema: validaciones.voteLink
    })

    links.update(link._id, {
      $inc: {
        votes: opciones.vote
      }
    })
  }
})

Meteor.publish('liveLinksId', function (linkId) {
  salirValidacion({
    data: linkId,
    schema: validaciones.links
  })

  return [
    links.find({
      linkId
      }, {
      fields: {
        votos: 1
      },
      sort: {
        votos: -1
      }
    }),
    urls.find({
      linkUrlId: linkId
    })
  ]
})
