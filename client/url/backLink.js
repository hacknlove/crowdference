import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'

Template.backLinks.helpers({
  links () {
    const toUrlId = ventanas.findOne('url').url._id
    return urls.find({
      toUrlId
    })
  }
})
