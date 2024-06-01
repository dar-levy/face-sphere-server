const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/getUsers', (req, res) => {
    res.send([{
        'name': 'Dar Levy',
        'city': 'Ramat Gan'
    }, {
        'name': 'Bill Gates',
        'company': 'Microsoft'
    }, {
        'name': 'Tim Cook',
        'company': 'Apple'
    },
    ])
});

app.listen(3000, () => console.log('Listening on port 3000...'));