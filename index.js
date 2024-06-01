const express = require("express");
const app = express();

const users = [{
    id: 1,
    name: 'Dar Levy',
    city: 'Ramat Gan',
}, {
    id: 2,
    name: 'Bill Gates',
    company: 'Microsoft'
}, {
    id: 3,
    name: 'Tim Cook',
    company: 'Apple'
},
]

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/getUsers/:id', (req, res) => {
    user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given ID was not found');
    res.send(user);
});

app.get('/getUsers/:page', (req, res) => {
    res.send(users)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));