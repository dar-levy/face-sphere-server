const express = require("express");
const {User, validate} = require("../models/user");
const router = express.Router();

const users = [
    {
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
        "avatar": "https://reqres.in/img/faces/7-image.jpg",
    },
    {
        "email": "lindsay.ferguson@reqres.in",
        "first_name": "Lindsay",
        "last_name": "Ferguson",
        "avatar": "https://reqres.in/img/faces/8-image.jpg",
    },
    {
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
        "avatar": "https://reqres.in/img/faces/9-image.jpg",
    },
    {
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
        "avatar": "https://reqres.in/img/faces/10-image.jpg",
    },
    {
        "id": 11,
        "email": "george.edwards@reqres.in",
        "first_name": "George",
        "last_name": "Edwards",
        "avatar": "https://reqres.in/img/faces/11-image.jpg",
    },
    {
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
        "avatar": "https://reqres.in/img/faces/12-image.jpg",
    }
]

async function getUsersByPage(pageNumber, pageSize) {
    return await User
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
}

router.get('/', async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    if (!(isNaN(pageNumber) || isNaN(pageSize))) {
        const usersByPage = await getUsersByPage(pageNumber, pageSize);
        if (usersByPage.length === 0) return res.status(404).send('Users with the given page were not found');
        return res.send(usersByPage);
    }
    res.send(users);
});

router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).send('The user with the given ID was not found');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar
    });
    user = await user.save();

    res.send(user);
});

router.put('/:id', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).send('The user with the given ID was not found');

    user.company = req.body.company
    res.send(user)
});

router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).send('The user with the given ID was not found');
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});

module.exports = router;
