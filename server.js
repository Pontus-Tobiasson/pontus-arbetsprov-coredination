const port = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const API_Key = "9a06310e-9a47-4799-8e9b-0bd3f36e8d4d";
const Token = "d314f993-7159-4676-93c6-7ce07fd63652";

console.log("start1")

/*
fetch('https://app.coredination.net/api/1/job', { 
    method: 'POST', 
    headers: {
        //'API-Key': API_Key,
        'API-Token': Token,
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ 
        'title': "Clean garage floor",
        'description': "Use mop" 
    }),
})
.then((data) => {
    console.log(data);
})
.catch(function(error) {
    console.log(error)
});
/*
console.log( {
    'title': "Clean garage floor",
    'description': "Use mop" 
}
);
*/
/*
fetch('https://app.coredination.net/api/1/job', { 
    method: 'GET', 
    headers: {
    //'API-Key': API_Key,
    'API-Token': Token
    },
})
.then((data) => {
    console.log(data);
})
.catch(function(error) {
    console.log(error)
});
*/


//fetch("https://app.coredination.net/api/1/job?api_key="+API_Key, { method: 'GET' })
//fetch('https://app.coredination.net/api/1/job', { method: 'GET', 'API-Key': API_Key })
//requests.get('https://app.coredination.net/api/1/job', headers={ 'API-Key': '{my-api-key}'})
//fetch("https://app.coredination.net/api/1/version?api_key="+API_Key, { method: 'GET' })
//.then((response) => response.json())

//https://app.coredination.net/api/1

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
    'API-Token': Token 
    },
    })
    /*
    //fetch('https://app.coredination.net/api/1/job?api_token=d314f993-7159-4676-93c6-7ce07fd63652')
    fetch('https://app.coredination.net/api/1/version?api_key=9a06310e-9a47-4799-8e9b-0bd3f36e8d4d', 
    { 
    method: 'GET',
    headers: {
        //'API-Key': API_Key,
        encoding: null
    },
    })
    */
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

const server = app.listen(port, () => {
    const {address, port} = server.address();
    console.log("Sever listening at http://" + address + ":" + port);
});