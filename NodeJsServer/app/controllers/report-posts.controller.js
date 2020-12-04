const db = require('../models')

exports.addReport = async (req, res) => {
    const Account = db.accounts
    const Post = db.posts

    try {
        let data = req.body;

        let newReport = {
            content: data.content,
            PostPostID: data.postID,
            accountUsername: data.username
        }

        await Post.findByPk(newReport.PostPostID).then(post => Account.findByPk(newReport.accountUsername).then(account => post.addAccount(account, { through: { content: newReport.content } })))
        res.status(200).send({ message: 'Add report successfully' })
    } catch (err) {
        res.status(400).send({ error: 'Server error, check eager loading requirement' })
    }
}

exports.getReport = async (req, res) => {
    const conditions = req.query
    const ReportedPosts = db.reportedPosts

    try {
        let result = await ReportedPosts.findAll({
            where: conditions
        })

        console.log(result)
        res.status(200).send(result)
    } catch(err) {
        res.status(500).send({error: err})
    }
}