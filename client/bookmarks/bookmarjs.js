import { Template } from 'meteor/templating'

Template.bookmarks.helpers({
    links: [
        {
            title: 'Atentado contra la división de poderes',
            description: 'La cobardía del Tribunal Supremo es inaudita. Escurrir el bulto, en lugar de dar la cara, es lo peor que puede hacer un órgano que quiera ser respetadoNo puede transferir su responsabilidad a nadie.También así se atenta contra la división de poderesLa decisión que ha adoptado el Tribunal Supremo no es una decisión jurisdiccional, sino una decisión política',
            url: ['https://www.eldiario.es/zonacritica/Atentado-division-poderes_6_902269797.html'],
            votes: 12,
            links: 14,
            uses: 15
        },
        {
            title: 'Esto es lo que pasa con Xiaomi, la competencia china de Huawei tras veto de Estados Unidos',
            description: 'Esta marca de móviles vende sus equipos a través de internet',
            url: ['https://diariocorreo.pe/miscelanea/esto-es-lo-que-pasa-con-xiaomi-la-competencia-china-de-huawei-tras-veto-de-estados-unidos-888528/?ref=list_pri_1'],
            votes: 12,
            links: 14,
            uses: 15
        },
        {
            title: 'El discurso del Día del Clima del año 2159',
            description: 'Philip Kitcher y Evelyn Fox Keller imaginan cómo podría ser el Día del Clima dentro de más de un siglo en ‘Y vimos cambiar las estaciones’ (Errata Naturae).',
            url: ['https://ethic.es/2019/05/relato-discurso-dia-del-clima-2159/'],
            votes: 12,
            links: 14,
            uses: 15
        },
        {
            title: 'Reglamento del Senado',
            description: '',
            url: ['http://www.senado.es/web/conocersenado/normas/reglamentootrasnormassenado/detallesreglamentosenado/index.html'],
            votes: 12,
            links: 14,
            uses: 15
        },
    ]
})

Template.bookmarks.events({
    'click h3.navigate' () {
        console.log('click')
        ventanas.remove({_c: 'primary'})
        ventanas.insert({_id: 'ranking', _c: 'secondary'})
        ventanas.update('bookmarks', {
            $set: {
                _c: 'primary'
            }
        })
        ventanas.updateUrl()

    }
})
