import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'

Template.search.show = function (search) {
  console.log(search)
  if (search.match(/^(https?:\/\/)?[\da-z-]+\.+[\da-z-.]+[/?#][^ ]*$/i)) {
    return Meteor.call('url', search, (e, r) => {
      console.log(e, r)
      if (e) {
        return ventanas.error(e)
      }
      Template.url.show(r)
    })
  }

  ventanas.cleanContainers()
  ventanas.insert({
    _id: 'search',
    _c: 'primary',
    search
  })
  ventanas.insert({
    _id: 'sponsors',
    _c: 'secondary'
  })
  ventanas.conf('path', `/search/${encodeURIComponent(search)}`)
}

Template.search.helpers({
    links: [
        {
            title: 'Lanzados con éxito los primeros 60 satélites Starlink de Space X que proporcionarán Internet de alta velocidad desde el espacio',
            url: ['https://www.businessinsider.es/starlink-space-x-realidad-lanzados-exito-60-satelites-426799'],
            image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/855x631/public/media/image/2019/05/illustration-spacexs-constellation-thousands-starlink-satellites-provide-global-high-speed-low-latency-internet.jpg?itok=Ic2AIHgM',
            description: 'El Space X de Elon Musk ha lanzado sus primeros satélites proveedores de Internet para su red Starlink que busca llevar Internet rápido a las zonas rurales.',
            bookmarks: 10
        },
        {
            title: 'PREPUBLICACIÓN | Las redes de poder en España',
            url: ['https://www.eldiario.es/politica/Prepublicacion-redes-poder-Espana_0_902210595.html'],
            image: 'https://www.eldiario.es/fotos/redes-poder-Espana_EDIIMA20190523_0884_5.jpg',
            description: '¿Qué redes de intereses unen entre sí a los que mandan en España ocupando puestos de poder en los ministerios, secretarías de Estado o direcciones generales? Grupos pequeños de altos funcionarios, personas vinculadas al poder real, sobre todo al económico, toman las decisiones y lo hacen sin responder ante los ciudadanos ni escucharleseldiario.es avanza la introducción al libro \'Las redes de poder en España\', que publica Roca Editorial',
            bookmarks: 10
        },        {
            title: 'Lanzados con éxito los primeros 60 satélites Starlink de Space X que proporcionarán Internet de alta velocidad desde el espacio',
            url: ['https://www.businessinsider.es/starlink-space-x-realidad-lanzados-exito-60-satelites-426799'],
            image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/855x631/public/media/image/2019/05/illustration-spacexs-constellation-thousands-starlink-satellites-provide-global-high-speed-low-latency-internet.jpg?itok=Ic2AIHgM',
            description: 'El Space X de Elon Musk ha lanzado sus primeros satélites proveedores de Internet para su red Starlink que busca llevar Internet rápido a las zonas rurales.',
            bookmarks: 10
        },
        {
            title: 'PREPUBLICACIÓN | Las redes de poder en España',
            url: ['https://www.eldiario.es/politica/Prepublicacion-redes-poder-Espana_0_902210595.html'],
            image: 'https://www.eldiario.es/fotos/redes-poder-Espana_EDIIMA20190523_0884_5.jpg',
            description: '¿Qué redes de intereses unen entre sí a los que mandan en España ocupando puestos de poder en los ministerios, secretarías de Estado o direcciones generales? Grupos pequeños de altos funcionarios, personas vinculadas al poder real, sobre todo al económico, toman las decisiones y lo hacen sin responder ante los ciudadanos ni escucharleseldiario.es avanza la introducción al libro \'Las redes de poder en España\', que publica Roca Editorial',
            bookmarks: 10
        },        {
            title: 'Lanzados con éxito los primeros 60 satélites Starlink de Space X que proporcionarán Internet de alta velocidad desde el espacio',
            url: ['https://www.businessinsider.es/starlink-space-x-realidad-lanzados-exito-60-satelites-426799'],
            image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/855x631/public/media/image/2019/05/illustration-spacexs-constellation-thousands-starlink-satellites-provide-global-high-speed-low-latency-internet.jpg?itok=Ic2AIHgM',
            description: 'El Space X de Elon Musk ha lanzado sus primeros satélites proveedores de Internet para su red Starlink que busca llevar Internet rápido a las zonas rurales.',
            bookmarks: 10
        },
        {
            title: 'PREPUBLICACIÓN | Las redes de poder en España',
            url: ['https://www.eldiario.es/politica/Prepublicacion-redes-poder-Espana_0_902210595.html'],
            image: 'https://www.eldiario.es/fotos/redes-poder-Espana_EDIIMA20190523_0884_5.jpg',
            description: '¿Qué redes de intereses unen entre sí a los que mandan en España ocupando puestos de poder en los ministerios, secretarías de Estado o direcciones generales? Grupos pequeños de altos funcionarios, personas vinculadas al poder real, sobre todo al económico, toman las decisiones y lo hacen sin responder ante los ciudadanos ni escucharleseldiario.es avanza la introducción al libro \'Las redes de poder en España\', que publica Roca Editorial',
            bookmarks: 10
        },        {
            title: 'Lanzados con éxito los primeros 60 satélites Starlink de Space X que proporcionarán Internet de alta velocidad desde el espacio',
            url: ['https://www.businessinsider.es/starlink-space-x-realidad-lanzados-exito-60-satelites-426799'],
            image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/855x631/public/media/image/2019/05/illustration-spacexs-constellation-thousands-starlink-satellites-provide-global-high-speed-low-latency-internet.jpg?itok=Ic2AIHgM',
            description: 'El Space X de Elon Musk ha lanzado sus primeros satélites proveedores de Internet para su red Starlink que busca llevar Internet rápido a las zonas rurales.',
            bookmarks: 10
        },
        {
            title: 'PREPUBLICACIÓN | Las redes de poder en España',
            url: ['https://www.eldiario.es/politica/Prepublicacion-redes-poder-Espana_0_902210595.html'],
            image: 'https://www.eldiario.es/fotos/redes-poder-Espana_EDIIMA20190523_0884_5.jpg',
            description: '¿Qué redes de intereses unen entre sí a los que mandan en España ocupando puestos de poder en los ministerios, secretarías de Estado o direcciones generales? Grupos pequeños de altos funcionarios, personas vinculadas al poder real, sobre todo al económico, toman las decisiones y lo hacen sin responder ante los ciudadanos ni escucharleseldiario.es avanza la introducción al libro \'Las redes de poder en España\', que publica Roca Editorial',
            bookmarks: 10
        },
    ]
})

Template.search.onCreated(function () {
  this.autorun(() => {
    const data = Template.currentData()
    Meteor.subscribe('search', data.search)
  })
})

Template.search.helpers({
  urls () {
    return urls.find({
      score: {
        $exists: 1
      }
    }, {
      sort: {
        score: -1
      }
    })
  }
})
