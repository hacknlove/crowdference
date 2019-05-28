import { ventanas } from 'meteor/hacknlove:ventanas'

ventanas.cleanContainers = function cleanContainers () {
    ventanas.remove({
        _c: {
            $in: ['primary', 'secondary']
        }
    })
}
