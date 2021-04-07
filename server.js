const port = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const API_Key = "9a06310e-9a47-4799-8e9b-0bd3f36e8d4d";
let API_Token = "82ffa2b8-8a7f-4041-9387-777d43c9968eINTENTIONAL_ERROR";

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', null);
    res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json())

app.get('/job', (req, res) => {
    console.log("Job data requested");
    console.log("Retrieving job data from coredination");
    
    fetch('https://app.coredination.net/api/1/job', { 
    method: 'GET', 
    headers: { 
    //'API-Key': API_Key,
    'API-Token': API_Token 
    },
    })
    .then(res => res.text())
    .then(data => {
        const result = data;
        console.log("Response from coredination: ", data);
        console.log("Sending job data to client");
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});


app.get('/', (req, res) => {
    console.log("Request to get index file");
    res.sendFile(__dirname + "/index.html");
    console.log("Sending index file");
});

app.get('*', (req, res) => {
    console.log("Request to get file " + req.url);
    if (req.url.includes("..")) {
        console.error(req.url + " is outside of the designated folder");
        return;
    }

    res.sendFile(__dirname + "/" + req.url);
    console.log("Sending file " + req.url);
});

app.post('/token/:newToken', (req, res) => {
    console.log("NEW TOKEN");
    const {newToken} = req.params;
    API_Token = newToken;
    console.log(API_Token);
    res.json(API_Token);
});

const server = app.listen(port, () => {
    const {address, port} = server.address();
    console.log("Sever listening at http://" + address + ":" + port);
});