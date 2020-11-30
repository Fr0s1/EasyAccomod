const db = require("../models");
const Comment = db.comments
const Post = db.posts
const Account = db.accounts
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
exports.deleteComment = async (req, res) => {

}