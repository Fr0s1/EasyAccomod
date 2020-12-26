const db = require('../models')
const ReportedPosts = db.reportedPosts

exports.addReport = async (req, res) => {
    try {
        let data = req.body;

        let newReport = {
            content: data.content,
            PostPostID: data.postID,
            accountUsername: data.username
        }

        await ReportedPosts.create(newReport)
        res.status(200).send({ message: 'Add report successfully' })
    } catch (err) {
        res.status(400).send({ error: 'Server error, check eager loading requirement' })
    }
}

exports.getReport = async (req, res) => {
    const conditions = req.query

    try {
        let result = await ReportedPosts.findAll({
            where: conditions
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

exports.deleteReport = async (req, res) => {
    const id = req.params.id

    try {
        let rowsDeleted = await ReportedPosts.destroy({
            where: { reportID: id }
        })

        if (rowsDeleted > 0) {
            res.send({ message: 'Deleted' })
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
}