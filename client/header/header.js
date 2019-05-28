import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { idiomas } from '/common/traducciones'

Template.header.events({
  'click #main' () {
    Template.portada.show()
  },
  'click .bookmarks' () {
    Template.bookmarks.show()
  },
  'click .ranking' () {
    Template.ranking.show()
  },
  'click .recents' () {
    Template.recents.show()
  },
  'click .language' (event, template) {
    template.$('.menu').toggleClass('show')
  },
  'click .changeLanguage' (event, template) {
    localStorage.lang = event.currentTarget.dataset.lang
    ventanas.conf('lang', event.currentTarget.dataset.lang)
    setTimeout(() => {
      template.$('.menu').removeClass('show')
    }, 200)
  }
})

Template.header.helpers({
  languages: Object.keys(idiomas),
  idiomaActivo (idioma) {
    const l = ventanas.conf('lang')
    if (!idiomas[l] && idioma === 'es') {
      return 'activo'
    }
    return idioma === l && 'activo'
  }
})
