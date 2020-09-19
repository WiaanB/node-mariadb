const express = require('express')
const router = express.Router()
const Post = require('../db.js').postModel()
// Create a post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        })
        res.json(newPost)
    } catch (error) {
        console.error('Problem creating the post', error)
        res.send('Sorry, internal error')
    }
})
// Show all the posts
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts)
    } catch (error) {
        console.error('Problem collecting all the posts', error)
        res.send('Sorry, internal error')
    }
})
// Show post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(post)
    } catch (error) {
        console.log('Error in finding by ID', error)
        res.send('Sorry, internal error')
    }
})
// Show posts by User ID
router.get('/user/:id', async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                author: req.params.id
            }
        })
        res.json(posts)
    } catch (error) {
        console.log('Error in finding by User ID', error)
        res.send('Sorry, internal error')
    }
})
// Update a post by ID
router.put('/:id', async (req, res) => {
    try {
        await Post.update({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
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
// Delete a post by ID
router.delete('/:id', async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({ message: 'Success' })
    } catch (error) {
        console.log('Error in deleting by ID', error)
        res.send('Sorry, internal error')
    }
})
module.exports = router