import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const urls = new Mongo.Collection('urls')

if (Meteor.isDevelopment) {
  global.urls = urls
}
