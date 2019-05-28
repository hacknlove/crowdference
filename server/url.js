import { Meteor } from 'meteor/meteor'
import { urls } from '/common/baseDeDatos'
import { salirValidacion, validacionesComunes, salir } from '/server/comun'

import Joi from 'joi'

const validaciones = {
  agregarlink: Joi.object().keys({
    fromUrlId: validacionesComunes._id.required(),
    toUrlId: validacionesComunes._id.required()
  }),
  voteLink: Joi.object().keys({
    fromUrlId: validacionesComunes._id.required(),
    toUrlId: validacionesComunes._id.required(),
    vote: Joi.number().valid([-1, 1]).required()
  }),
  bookmark: Joi.object().keys({
    _id: validacionesComunes._id.required(),
    action: Joi.number().valid([-1, 1]).required()
  })
}

Meteor.methods({
  addLink (opciones) {
    salirValidacion({
      data: opciones,
      schema: validaciones.agregarlink
    })

    urls.find({
      _id: opciones.toUrlId
    }).count() || salir(404, '"to" not found')

    const from = urls.findOne({
      _id: opciones.fromUrlId
    }, {
      fields: {
        toUrlId: 1
      }
    }) || salir(404, '"from" not found')

    if (from.toUrlId.includes[opciones.toUrlId]) {
      return
    }

    urls.update(opciones.fromUrlId, {
      $push: {
        toUrlId: opciones.toUrlId
      },
      $addToSet: {
        ids: opciones.toUrlId
      },
      $inc: {
        totalLinks: 1
      }
    })

    urls.update(opciones.toUrlId, {
      $push: {
        fromUrlId: opciones.fromUrlId
      },
      $addToSet: {
        ids: opciones.fromUrlId
      },
      $inc: {
        totalBackLinks: 1
      },
      $set: {
        [`votes.${opciones.fromUrlId}`]: 0
      }
    })
  },
  voteLink (opciones) {
    salirValidacion({
      data: opciones,
      schema: validaciones.voteLink
    })

    urls.findOne({
      _id: opciones.fromUrlId,
      [`links.${opciones.fromUrlId}`]: {
        $exists: 1
      }
    }) || salir(404, '"from" not found')

    urls.update(opciones.fromUrlId, {
      $inc: {
        [`links.${opciones.fromUrlId}`]: opciones.vote
      }
    })
  },
  bookmark (opciones) {
    salirValidacion({
      data: opciones,
      schema: validaciones.bookmark
    })

    urls.update(opciones._id, {
      $inc: {
        bookmarks: opciones.action
      }
    })
  }
})

Meteor.publish('viewUrl', function (_id) {
  salirValidacion({
    data: _id,
    schema: validacionesComunes._id
  })

  return urls.find({
    ids: _id
  })
})

Meteor.publish('urlId', function (_id) {
  salirValidacion({
    data: _id,
    schema: validacionesComunes._id
  })
  return urls.find({
    _id
  })
})
