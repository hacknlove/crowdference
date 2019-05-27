import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'


const sponsors = [
    {
        src: '//static.fsf.org/fsforg/img/normal-image.png',
        href: 'http://www.fsf.org/associate/support_freedom/join_fsf?referrer=2442'
    },
    {
        src: '/letriosBanner.png',
        href: 'https://letrios.com'
    },
    {
        src: '/bannerHacknlove.png',
        href: 'https://hacknlove.org'
    },
    {
        src: '/bannerCalidad.png',
        href: 'https://leanpub.com/calidad-de-codigo-para-directivos'
    },
    {
        src: '/bannerPlaneta.png',
        href: 'https://el-planeta-de-las-caricias-invisibles.letrios.com/'
    },
    {
        src: '/bannerDakapp.png',
        href: 'https://dakapp.com/'
    },
    {
        src: '/bannerYoomers.png',
        href: 'https://yoomers.com/'
    }
]

const length = 3

Template.sponsors.helpers({
    sponsors () {
        const computation = Tracker.currentComputation

        computation && setTimeout(() => {
            computation.invalidate()
        }, 60 * 1000)

        const response = []

        while (response.length != length) {
            let indice
            do {
                indice = Math.floor(Math.random() * sponsors.length)
            } while (response.includes(indice))
            response.push(indice)
        }

        return response.map(indice => sponsors[indice])
    }
})
