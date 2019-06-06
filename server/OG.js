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
    description: 'AI is great, buy WE ARE greater. There is no algorithm capable of understand what means to be human. This is our world, this is our home, this is our technology. Only we can fix the society of mess- information. The URLs are ours to link. Make internet human again!',
    image: `${process.env.ROOT_URL}logoletras.png`,
    url: process.env.ROOT_URL
  }, [
    {
      _id: 'portada'
    }
  ])
})

ventanas.use('/view/(:url*)', function (sink, match, v) {
  console.log(sink)
  var url = sink.request.url.href.substr('/view/'.length)

  console.log("////////////////////////////////")
  console.log(url)

  url = urls.findOne({
    url
  }) || insertar(actualizar(url))

  OG(sink, {
    title: `yes, we link | "${url.title}"`,
    description: `Find related links made by people like you, and make more links yourself`,
    image: url.image,
    url: `${process.env.ROOT_URL}view/${url.url[0]}`
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
    url: `${process.env.ROOT_URL}ranking`
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

ventanas.use('/recents', function (sink, match, v) {
  OG(sink, {
    title: 'Crowdference - Recent Activity',
    description: 'Watch the last additions and changes',
    image: `${process.env.ROOT_URL}logoletras.png`,
    url: `${process.env.ROOT_URL}recents`
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
      _id: 'recents',
      _c: 'primary'
    },
    {
      _id: 'sponsors',
      _c: 'secondary'
    }
  ])
})
ventanas.use('/bookmarks', function (sink, match, v) {
  OG(sink, {
    title: 'Crowdference - bookmarks',
    description: 'Here you keep your favorite links',
    image: `${process.env.ROOT_URL}logoletras.png`,
    url: `${process.env.ROOT_URL}bookmarks`
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
      _id: 'bookmarks',
      _c: 'primary'
    },
    {
      _id: 'sponsors',
      _c: 'secondary'
    }
  ])
})

ventanas.use('/search/:search', function (sink, match, v) {
  OG(sink, {
    title: 'Crowdference - Search',
    description: `search "decodeURIComponent(match.search)" in link`,
    image: `${process.env.ROOT_URL}logoletras.png`,
    url: `${process.env.ROOT_URL}search/${match.search}`
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
      _id: 'search',
      _c: 'primary',
      search: decodeURIComponent(match.search)
    },
    {
      _id: 'sponsors',
      _c: 'secondary'
    }
  ])
})

ventanas.useRegex(/(?:)/, [], function (sink) {
  OG(sink, {
    title: 'Crowdference - Not found',
    description: 'Check the url and try again',
    image: `${process.env.ROOT_URL}/logoletras.png`
  }, [
    {
      _id: 'portada'
    },
    {
      template: 'alerta',
      titulo: 'Not found',
      clase: 'error',
      contenido: 'Check the url and try again'
    }
  ])
})
