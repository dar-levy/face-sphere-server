const express = require("express");
const { Profile, validate } = require("../models/profile");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

async function getProfilesByPage(pageNumber, pageSize) {
    return await Profile
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - email
 *         - first_name
 *         - last_name
 *         - avatar
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the profile
 *         email:
 *           type: string
 *           description: The email of the profile
 *         first_name:
 *           type: string
 *           description: The first name of the profile
 *         last_name:
 *           type: string
 *           description: The last name of the profile
 *         avatar:
 *           type: string
 *           description: The avatar URL of the profile
 *       example:
 *         id: d5fE_asz
 *         email: steve.jobs@reqres.in
 *         first_name: Steve
 *         last_name: Jobs
 *         avatar: https://pbs.twimg.com/profile_images/1155917668697985025/w4N0eB1E_400x400.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: The profiles managing API
 */

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Returns the list of all the profiles
 *     tags: [Profiles]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number (optional)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of items per page (optional)
 *     responses:
 *       200:
 *         description: The list of the profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       404:
 *         description: No profiles found
 *       400:
 *         description: Bad request
 */

// Express route handler for /profiles
router.get("/", async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);

    if (!isNaN(pageNumber) && !isNaN(pageSize)) {
        const profilesByPage = await getProfilesByPage(pageNumber, pageSize);
        if (profilesByPage.length === 0) return res.status(404).send("Profiles with the given page were not found");
        return res.send(profilesByPage);
    }

    const allProfiles = await Profile.find();
    res.send(allProfiles);
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Get the profile by id
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: The profile was not found
 */
router.get("/:id", async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send("The profile with the given ID was not found");
    res.send(profile);
});

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: The profile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Bad request
 */
router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let profile = new Profile({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar,
    });
    profile = await profile.save();

    res.send(profile);
});

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Update the profile by the id
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: The profile was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Bad request
 *       404:
 *         description: The profile was not found
 */
router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const profile = await Profile.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar,
    });

    if (!profile) return res.status(404).send("The profile with the given ID was not found");
    res.send(profile);
});

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Remove the profile by id
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: The profile was not found
 */
router.delete("/:id", [auth, admin], async (req, res) => {
    const profile = await Profile.findByIdAndRemove(req.params.id);
    if (!profile) return res.status(404).send("The profile with the given ID was not found");
    res.send(profile);
});

module.exports = router;
