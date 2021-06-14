const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');

//Retrieve list of all the forums
router.get('/all_forums', async (req, res) => {
    const forums_data = await Forum.find().exec().then((forums) => {
        const response = {
            total_forums: forums.length,
            forums: forums.map((forum) => {
                return (forum)
            })
        };
        res.status(200).json(response);
    }).catch((error) => {
        res.status(500).json({
            error: error
        });
    })
})

// Retrieve a forum on the basis of its id
router.get('/:id', async (req, res) => {
    const forum = await Forum.findOne({ _id: req.params.id })
        .then((forumDetails) => {
            res.status(200).json({
                forumDetails: forumDetails
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})

// Delete a forum
router.delete('/:id', async (req, res) => {
    Forum.findOneAndRemove({ _id: req.params.id })
        .then((forum) => {
            if (forum) {
                return res.status(200).json({
                    status_code: "200",
                    message: "Forum removed successfully"
                })
            } else {
                return res.status(404).json({
                    message: "Forum not found"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})

//Edit a forum
router.put('/edit/:id', async (req, res) => {
    const newDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    };
    const previousDetails = await Forum.findById({ _id: req.params.id })
        .then((details) => {
            temp = details;
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        });
    if (temp !== undefined) {
        if (newDetails.firstName == null || newDetails.firstName === "") {
            newDetails.firstName = temp.firstName;
        }
        if (newDetails.lastName == null || newDetails.lastName === "") {
            newDetails.lastName = temp.lastName;
        }
        if (newDetails.phone == null || newDetails.phone === "") {
            newDetails.phone = temp.phone;
        }
    }

    const forum = await Forum.findByIdAndUpdate({ _id: req.params.id }, newDetails, { new: true })
        .then((forumInfo) => {
            res.status(201).json({
                status_code: "200",
                message: "Forum updated successfully",
                forum: forumInfo
            });
        }).catch((error) => {
            res.status(500).json({
                error: error
            })
        });
})


// Add a forum
router.post('/add_forum', async (req, res) => {
    const forumDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    };
    const forum = await Forum.create(forumDetails).then((forumInfo) => {
        res.status(201).json({
            status_code: "200",
            message: "Forum added successfully",
            forum: forumInfo
        });
    }).catch((error) => {
        res.status(500).json({
            message: "All fields are required",
            status_code: "400",
        })
    });
})

module.exports = router;