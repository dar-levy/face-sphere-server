const express = require("express");
const {Profile, validate} = require("../models/profile");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {User} = require("../models/user");
const router = express.Router();


async function getProfilesByPage(pageNumber, pageSize) {
    return await Profile
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
}

router.get('/', async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    if (!(isNaN(pageNumber) || isNaN(pageSize))) {
        const profilesByPage = await getProfilesByPage(pageNumber, pageSize);
        if (profilesByPage.length === 0) return res.status(404).send('Profiles with the given page were not found');
        return res.send(profilesByPage);
    }

    res.status(400).send('Page number and page size must be configured');
});

router.get('/:id', async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send('The profile with the given ID was not found');
    res.send(profile);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let profile = new Profile({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar
    });
    profile = await profile.save();

    res.send(profile);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const profile = await Profile.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar
    })

    if (!profile) return res.status(404).send('The profile with the given ID was not found');
    res.send(profile)
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const profile = await Profile.findByIdAndRemove(req.params.id);
    if (!profile) return res.status(404).send('The profile with the given ID was not found');
    res.send(profile);
});

module.exports = router;
