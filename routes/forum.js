const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');

//Retrieve list of all the forums
router.get('/all_forums', async (req, res) => {
    const forums_data = await Forum.find().exec().then((forums) => {
        const response = {
            total_forums: forums.length,
            status_code: "200",
            message: "Forum added successfully",
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
router.post('/getforums', async (req, res) => {
    const forum = await Forum.findOne({ _id: req.body.id })
        .then((forumDetails) => {
            res.status(200).json({
                status_code: "200",
                message: "Forum added successfully",
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
router.post('/edit', async (req, res) => {
    const newDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        status: req.body.status,
        id: req.body.id
    };
    const previousDetails = await Forum.findById({ _id: req.body.id })
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
        if (newDetails.status == null || newDetails.status == "") {
            newDetails.status = temp.status
        }
    }

    const forum = await Forum.findByIdAndUpdate({ _id: req.body.id }, newDetails, { new: true })
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
        phone: req.body.phone,
        status: req.body.status,
        slotTime: req.body.slotTime
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