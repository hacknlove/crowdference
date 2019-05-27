import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'

Template.link.onDestroyed(function () {
    ventanas.remove('backClip')
})

Template.link.helpers({
    link: {
        title: 'May abandona su nuevo plan para el Brexit y prepara su dimisión',
        description: 'La primera ministra británica, Theresa May, se ve sometida a una intensa presión para fijar una fecha para su salida del cargo después de que fracasara su última maniobra para el Brexit, eclipsando...',
        url: ['https://www.lavanguardia.com/internacional/20190523/462421278706/theresa-may-brexit-elecciones-europeas-dimision.html'],
        image: 'https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/05/23/Recortada/_20190523125422661-kfxH-U462421278706O0C-992x558@LaVanguardia-Web.jpg'
    },
    links: [
        {
            title: 'Lanzados con éxito los primeros 60 satélites Starlink de Space X que proporcionarán Internet de alta velocidad desde el espacio',
            url: ['https://www.businessinsider.es/starlink-space-x-realidad-lanzados-exito-60-satelites-426799'],
            image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/855x631/public/media/image/2019/05/illustration-spacexs-constellation-thousands-starlink-satellites-provide-global-high-speed-low-latency-internet.jpg?itok=Ic2AIHgM',
            description: 'El Space X de Elon Musk ha lanzado sus primeros satélites proveedores de Internet para su red Starlink que busca llevar Internet rápido a las zonas rurales.',
            votes: 10,
            links: 11,
            uses: 12
        },
        {
            title: 'PREPUBLICACIÓN | Las redes de poder en España',
            url: ['https://www.eldiario.es/politica/Prepublicacion-redes-poder-Espana_0_902210595.html'],
            image: 'https://www.eldiario.es/fotos/redes-poder-Espana_EDIIMA20190523_0884_5.jpg',
            description: '¿Qué redes de intereses unen entre sí a los que mandan en España ocupando puestos de poder en los ministerios, secretarías de Estado o direcciones generales? Grupos pequeños de altos funcionarios, personas vinculadas al poder real, sobre todo al económico, toman las decisiones y lo hacen sin responder ante los ciudadanos ni escucharleseldiario.es avanza la introducción al libro \'Las redes de poder en España\', que publica Roca Editorial',
            votes: 10,
            links: 11,
            uses: 12
        }, {
            title: 'Lanzados con éxito los primeros 60 satélites Starlink de Space X que proporcionarán Internet de alta velocidad desde el espacio',
            url: ['https://www.businessinsider.es/starlink-space-x-realidad-lanzados-exito-60-satelites-426799'],
            image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/855x631/public/media/image/2019/05/illustration-spacexs-constellation-thousands-starlink-satellites-provide-global-high-speed-low-latency-internet.jpg?itok=Ic2AIHgM',
            description: 'El Space X de Elon Musk ha lanzado sus primeros satélites proveedores de Internet para su red Starlink que busca llevar Internet rápido a las zonas rurales.',
            votes: 10,
            links: 11,
            uses: 12
        }
    ]
})
