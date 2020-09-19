const express = require('express')
const router = express.Router()
const User = require('../db.js').userModel()
const Post = require('../db.js').postModel() // Deleting posts from a deleted user
// Create a user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            email: req.body.email
        })
        res.json(newUser)
    } catch (error) {
        console.error('Problem creating the user', error)
        res.send('Sorry, internal error')
    }
})
// Show all the users
router.get('/all', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({users})
    } catch (error) {
        console.error('Problem collecting all the users', error)
        res.send('Sorry, internal error')
    }
})
// Show user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(user)
    } catch (error) {
        console.log('Error in finding by ID', error)
        res.send('Sorry, internal error')
    }
})
// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        await User.update({
            firstName: req.body.firstName,
            email: req.body.email
        }, 
        {
            where: {
                id: req.params.id
            }
        })
        res.json({ message: 'Success' })
    } catch (error) {
        console.log('Error in updating by ID', error)
        res.send('Sorry, internal error')
    }
})
// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        })
        await Post.destroy({
            where: {
                author: req.params.id
            }
        })
        res.json({ message: 'Success' })
    } catch (error) {
        console.log('Error in deleting by ID', error)
        res.send('Sorry, internal error')
    }
})
module.exports = router