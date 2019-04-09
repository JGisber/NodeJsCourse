
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter a Message</title></head>');
        res.write('<body><form action="/message" method="POST">First Name: <input type="text" name="firstName"><button type="submit" form="nameform" value="Submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            // using writefileSync will block code execution
            fs.writeFile('message.tex', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();
};

// Different way to export files or modules in Node.Js

module.exports = requestHandler;
/*
/ ---> export as object <--- /
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};

module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded Text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
*/



