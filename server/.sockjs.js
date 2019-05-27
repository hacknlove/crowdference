import { webapp } from 'meteor/webapp'

import { ventanas } from 'meteor/hacknlove:ventanas'

ventanas.use('/sockjs/:link*', function (sink, match, v) {
    console.log('ok')
})

WebApp.connectHandlers.use('/sockjs', (req, res, next) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"websocket":false,"origins":["*:*"],"cookie_needed":false,"entropy":0}');
});
