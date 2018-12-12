const memwatch = require('memwatch-next');
const memwatch2 = require('@airbnb/node-memwatch');
const heapdump = require('heapdump');
const http = require('http');
const _ = require('lodash');
x = [];

//memwatch.on('stats', (stats)=>{ console.log('memwatch-next; stats', stats);});
memwatch2.on('stats', (stats)=>{ console.log('@airbnb/node-memwatch; stats=', stats);});

memwatch.on('leak', (info) => {
  console.error('-----------------------------');
  console.error('Memory leak detected:\n', info);
  /*heapdump.writeSnapshot((err, filename) => {
    if(err) console.error(err);
    else console.log('Write Snapshot: ' + filename);
  });*/
});


let server = http.createServer((req, res) => {
  x.push(new Array(1000).join('x'));
  console.log(global.x);
  console.error('-----------------------------\n');
  for (let i=0; i<1000; i++) {
    server.on('request',  function leakyFunc(){});
  }
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
server.setMaxListeners(0);

console.log('Server running at http://127.0.0.1:1337/. Process PID: ', process.pid);
// node --expose-gc --inspect testMemoryLeak.js
// autocannon -c 1 -d 60 http://localhost:1337
