import { ventanas } from 'meteor/hacknlove:ventanas'
import { urls } from '/common/baseDeDatos'
import { insertar, actualizar } from '/server/crawler'

const OG = function (sink, datos, ventanas) {
  sink.appendToHead(`
  <meta property="og:title" content="${datos.title}"/>
  <meta property="og:description" content="${datos.description}"/>
  <meta property="og:image" itemprop="image" content="${datos.image}"/>
  <meta property="og:image:secure_url" itemprop="image" content="${datos.image}"/>
  <meta property="og:site_name" content="crowdference"/>
  <meta property="og:type" content="website"/>
  ${datos.url ? `<meta property="og:url" content="${datos.url}"/>` : ''}
  ${datos.update ? `<meta property="og:updated_time" content="${datos.update}" />` : ''}
  `)
  if (ventanas) {
    sink.appendToHead(`
    <script type="text/javascript">
    __ventanas = ${JSON.stringify(ventanas)}
    </script>
    `)
  }
}

ventanas.use('/', function (sink, match, v) {
  OG(sink, {
    title: 'Yes, we Link',
    description: 'IA is great, buy WE ARE greater. There is no algorithm capable of understand what means to be human. This is our world, this is our home, this is our technology. Only we can fix the society of mess- information. The URLs are ours to link. Make internet human again!',
    image: `${process.env.ROOT_URL}logoletras.png`,
    url: process.env.ROOT_URL
  }, [
    {
      _id: 'portada'
    }
  ])
})

ventanas.use('/view/:url', function (sink, match, v) {
  var url = decodeURIComponent(match.url)

  url = urls.findOne({
    url
  }) || insertar(actualizar(url))

  OG(sink, {
    title: `yes, we link | "${url.title}"`,
    description: `Find related links made by people like you, and make more links yourself`,
    image: url.image,
    url: `${process.env.ROOT_URL}l/${url.url[0]}`
  }, [
    {
      _id: 'header',
      _c: 'top'
    },
    {
      _id: 'footer',
      _c: 'bottom'
    },
    {
      _id: 'url',
      _c: 'primary',
      url
    },
    {
      _id: 'backLinks',
      _c: 'secondary'
    },
    {
      _id: 'sponsors',
      _c: 'secondary'
    }
  ])
})

ventanas.use('/ranking', function (sink, match, v) {
  OG(sink, {
    title: 'Crowdference - Ranking',
    description: 'See the most bokmarked links',
    image: `${process.env.ROOT_URL}/logoletras.png`,
    url: `${process.env.ROOT_URL}r`
  }, [
    {
      _id: 'header',
      _c: 'top'
    },
    {
      _id: 'footer',
      _c: 'bottom'
    },
    {
      _id: 'ranking',
      _c: 'primary'
    },
    {
      _id: 'sponsors',
      _c: 'secondary'
    }
  ])
})

// ventanas.use('/f', function (sink, match, v) {
//   OG(sink, {
//     title: 'Crowdference - favorites',
//     description: 'Here you keep your favorite links',
//     image: `${process.env.ROOT_URL}logoletras.png`,
//     url: `${process.env.ROOT_URL}f`
//   }, [
//     {
//       _id: 'favoritos'
//     }
//   ])
// })
// ventanas.use('/s/:busqueda', function (sink, match, v) {
//   OG(sink, {
//     title: 'Crowdference - Search',
//     description: `search "decodeURIComponent(match.busqueda)" in link`,
//     image: `${process.env.ROOT_URL}logoletras.png`,
//     url: `${process.env.ROOT_URL}s/${match.busqueda}`
//   }, [
//     {
//       _id: 'busqueda',
//       busqueda: decodeURIComponent(match.busqueda)
//     }
//   ])
// })


// ventanas.useRegex(/(?:)/, [], function (sink) {
//   OG(sink, {
//     title: 'Crowdference - Not found',
//     description: 'Check the url and try again',
//     image: `${process.env.ROOT_URL}/logoletras.png`
//   }, [
//     {
//       _id: 'portada'
//     },
//     {
//       template: 'alerta',
//       titulo: 'Not found',
//       clase: 'error',
//       contenido: 'Check the url and try again'
//     }
//   ])
// })
