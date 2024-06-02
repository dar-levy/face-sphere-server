const express = require("express");
const {User, validate} = require("../models/user");
const router = express.Router();


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
    const user = User.find({})
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
