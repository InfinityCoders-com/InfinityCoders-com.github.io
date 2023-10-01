const http = require('http')
const localtunnel = require('localtunnel');
const http2 = require('node:http2')

const host = 'localhost'
const port = 8000

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) {
      console.log("My public IP address is: " + ip);
    });
})

async function callTunnel() {
  const tunnel = await localtunnel({ port: 8000 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  console.log(tunnel.url, 'tunnel.url')
  tunnel.on('close', () => {
    // tunnels are closed
  });
}


const requestListener = function (req, res) {
    console.log(Object.keys(req).filter(o => o.indexOf('_') < 0), Object.keys(res).filter(o => o.indexOf('_') < 0))
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message": "This is a JSON response"}`);
}
const server = http.createServer(requestListener)

server.listen(port, host, () => {
    callTunnel()
    // http.request({ hostname: 'https://ipv4.icanhazip.com', method: 'GET' }, (res) => {
    //     console.log(`My Public ip is: ${res.toString()}`)
    // })
    console.log(`Server is running on http://${host}:${port}`)
})