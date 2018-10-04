const router = require('express').Router({ mergeParams: true })
const { User, Idea } = require('../db/model')

// SHOW ALL


// CREATE
router.post('/', (req, res) => {
    const newIdea = new Idea()
    User.findById(req.params.userId)
        .then((user) => {
            user.ideas.push(newIdea)
            return user.save()
        })
        .then((user) => {
            res.send(user)
        })
})

//UPDATE
router.put('/:id', (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            const idea = user.ideas.id(req.params.id)
            const updatedIdea = req.body

            if (updatedIdea.title) {
                idea.title = updatedIdea.title
            }
            if (updatedIdea.description) {
                idea.description = updatedIdea.description
            }
            return user.save()
        })
        .then(user => {
            res.send(user)
        })
})

// DELETE
router.delete('/:id', (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            return user.update({ $pull: {ideas: { _id: req.params.id } } })
        })
        .then (user => {
            res.send(user)
        })
})

module.exports = router