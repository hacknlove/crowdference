import { Template } from 'meteor/templating'

Template.cardUrl.events({
  'click a' (event) {
    event.preventDefault()
    Template.url.show(this.url)
  },
  'click h3' (event) {
    Template.url.show(this.url)
  }
})
