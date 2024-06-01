const express = require("express");
const app = express();

const users = [{
    id: 1,
    name: 'Dar Levy',
    city: 'Ramat Gan',
    page: 1
}, {
    id: 2,
    name: 'Bill Gates',
    company: 'Microsoft',
    page: 1
}, {
    id: 3,
    name: 'Tim Cook',
    company: 'Apple',
    page: 2
},
]

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/users/:id', (req, res) => {
    userId = parseInt(req.params.id)
    user = users.find(user => user.id === userId);
    if (!user) res.status(404).send('The user with the given ID was not found');
    else res.send(user);
});

app.get('/api/users/page/:page', (req, res) => {
    const page = parseInt(req.params.page);
    const usersByPage = users.filter(user => user.page === page);
    if (usersByPage.length === 0) res.status(404).send('Users with the given page were not found');
    else res.send(usersByPage);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));