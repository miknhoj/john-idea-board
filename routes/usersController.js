const router = require('express').Router()
const { User } = require('../db/model')

// SHOW ALL
// new way - aysnc and await
router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})
// old way - .then promise handler
// router.get('/', (req, res) => {
//     User.find()
//         .then((response) => {
//             res.send(response)
//         })
// })

// SHOW ONE
router.get('/:id', async (req, res) => {
    // const user = await User.find({_id:req.params.id})
    const user = await User.findById(req.params.id)
    res.send(user)
})
// NEW - don't need this anymore since forms being handled on front end

// CREATE
router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.send(user)
})

// UPDATE
router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(user)
})

// EDIT - don't need this anymore since forms being handled on front end
// DELETE
router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.sendStatus(200)
})

module.exports = router