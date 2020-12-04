const db = require("../models");
const Comment = db.comments
const Post = db.posts

exports.addComment = async (req, res) => {
    let data = req.body;

    let comment = {
        content: data.content,
        accountUsername: data.accountUsername,
        PostPostID: data.PostPostID
    }

    try {
        let result = await Comment.create(comment)

        res.send(result)

    } catch (err) {
        res.send({ error: err })
    }
}

exports.getComments = async (req, res) => {
    let conditions = req.query

    try {
        let result = await Post.findAll({
            include: {
                model: Comment,
                where: conditions
            }
        })

        res.send(result)
    } catch (err) {
        res.send({ message: err })
    }
}

exports.updateComment = async (req, res) => {
    let _id = req.params.id

    try {
        let result = await Comment.update(req.body, {
            where: {
                commentID: _id
            }
        })

        if (result[0] > 0) {
            res.status(200).send({ message: 'Updated comment successfully' })
        } else {
            res.status(400).send({ message: 'No comment exists with given id' })
        }
        console.log(result)
    } catch (err) {
        res.send({ error: err })
    }
}

exports.deleteComment = async (req, res) => {
    let _id = req.params.id;

    try {
        let result = await Comment.destroy({
            where: {
                commentID: _id
            }
        })

        res.send({ message: result + ' comments deleted'})
    } catch (err) {
        res.send({error: err})
    }
}