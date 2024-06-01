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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));