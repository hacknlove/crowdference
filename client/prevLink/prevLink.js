import { Template } from 'meteor/templating'

Template.prevLink.events({
  'click a' (event) {
    event.preventDefault()
    Template.url.show(this.link)
  },
  'click .title' (event) {
    Template.url.show(this.link)
  }
})
