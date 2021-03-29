const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
// const { parse } = require('querystring');

const db = require('./db');
const User = db.user;


http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    console.log(`req: ${req.url}`);
    if (req.method === 'GET') {
        console.log('required method GET');
    }
    else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body); // all params
            let params = JSON.parse(body);
            if (params.input0 && params.input1 && params.input2 && params.input3) {
                console.log(params);
                User.create({
                    image_name: params.input1,
                    file_name: params.input2,
                    user_name: params.input3,
                })
                    .then(result => {
                        console.log(result);
                        res.end(JSON.stringify(result))
                    })
                    .catch(err => {
                        console.log(err);
                        res.end('error');
                    })
            }
        });
    }

}).listen(3005);
