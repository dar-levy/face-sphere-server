const Joi = require('joi');
const express = require("express");
const app = express();
const { validate } = require("./models/user");

app.use(express.json())

const users = [
    {
        "id": 7,
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
        "avatar": "https://reqres.in/img/faces/7-image.jpg",
        "page": 1
    },
    {
        "id": 8,
        "email": "lindsay.ferguson@reqres.in",
        "first_name": "Lindsay",
        "last_name": "Ferguson",
        "avatar": "https://reqres.in/img/faces/8-image.jpg",
        "page": 1
    },
    {
        "id": 9,
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
        "avatar": "https://reqres.in/img/faces/9-image.jpg",
        "page": 1
    },
    {
        "id": 10,
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
        "avatar": "https://reqres.in/img/faces/10-image.jpg",
        "page": 1
    },
    {
        "id": 11,
        "email": "george.edwards@reqres.in",
        "first_name": "George",
        "last_name": "Edwards",
        "avatar": "https://reqres.in/img/faces/11-image.jpg",
        "page": 2
    },
    {
        "id": 12,
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
        "avatar": "https://reqres.in/img/faces/12-image.jpg",
        "page": 2
    }
]

app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.page);
    if (!isNaN(page)) {
        const usersByPage = users.filter(user => user.page === page);
        if (usersByPage.length === 0) return res.status(404).send('Users with the given page were not found');
        return res.send(usersByPage);
    }
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).send('The user with the given ID was not found');
    res.send(user);
});

app.post('/api/users', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name,
        company: req.body.company,
        page: req.body.page
    };
    users.push(user);
    res.send(user);
});

app.put('/api/users/:id', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).send('The user with the given ID was not found');

    user.company = req.body.company
    res.send(user)
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).send('The user with the given ID was not found');
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));