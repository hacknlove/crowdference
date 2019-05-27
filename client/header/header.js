import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { idiomas } from '/common/traducciones'

Template.header.events({
    'click .bookmarks' () {
        ventanas.remove({
            _c: 'primary'
        })
        ventanas.insert({
            _id: 'bookmarks',
            _c: 'primary'
        })
        ventanas.updateUrl()
    },
    'click .ranking' () {
        ventanas.remove({
            _c: 'primary'
        })
        ventanas.insert({
            _id: 'ranking',
            _c: 'primary'
        })
        ventanas.updateUrl()
    },
    'click .recents' () {
        ventanas.remove({
            _c: 'primary'
        })
        ventanas.insert({
            _id: 'recents',
            _c: 'primary'
        })
        ventanas.updateUrl()
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
