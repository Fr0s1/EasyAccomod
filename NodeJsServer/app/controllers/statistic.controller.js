const db = require("../models");
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

exports.getPostsOrderByColumn = async (req, res) => {
    let columnName = req.params.column
    const results = await sequelize.query(`SELECT * FROM posts ORDER BY ${columnName} DESC`, { type: QueryTypes.SELECT })

    console.log(results)

    res.send(results)
}

exports.getPostsOrderByColumnInMonth = async (req, res) => {
    let data = req.params
    const results = await sequelize.query(`SELECT * FROM posts WHERE month(postTime)=${data.month} ORDER BY ${data.column} DESC`, { type: QueryTypes.SELECT })
    res.send(results)
}

exports.getNumberOfPostsInTimeRange = async (req, res) => {
    const result = await sequelize.query(`
    SELECT count(postID) as numberOfPosts, 
    CASE 
        WHEN hour(postTime) BETWEEN 0 and 1 THEN '12:00 AM - 2:00 AM' 
        WHEN hour(postTime) BETWEEN 1 and 2 THEN '1:00 AM - 3:00 AM' 
        WHEN hour(postTime) BETWEEN 2 and 3 THEN '2:00 AM - 4:00 AM' 
        WHEN hour(postTime) BETWEEN 3 and 4 THEN '3:00 AM - 5:00 AM' 
        WHEN hour(postTime) BETWEEN 4 and 5 THEN '4:00 AM - 6:00 AM' 
        WHEN hour(postTime) BETWEEN 5 and 6 THEN '5:00 AM - 7:00 AM' 
        WHEN hour(postTime) BETWEEN 6 and 7 THEN '6:00 AM - 8:00 AM' 
        WHEN hour(postTime) BETWEEN 7 and 8 THEN '7:00 AM - 9:00 AM' 
        WHEN hour(postTime) BETWEEN 8 and 9 THEN '8:00 AM - 10:00 AM' 
        WHEN hour(postTime) BETWEEN 9 and 10 THEN '9:00 AM - 11:00 AM' 
        WHEN hour(postTime) BETWEEN 10 and 11 THEN '10:00 AM - 11:00 AM' 
        WHEN hour(postTime) BETWEEN 11 and 12 THEN '11:00 AM - 1:00 PM' 
        WHEN hour(postTime) BETWEEN 12 and 13 THEN '12:00 PM - 2:00 PM' 
        WHEN hour(postTime) BETWEEN 13 and 14 THEN '1:00 PM - 3:00 PM' 
        WHEN hour(postTime) BETWEEN 14 and 15 THEN '2:00 PM - 4:00 PM' 
        WHEN hour(postTime) BETWEEN 15 and 16 THEN '3:00 PM - 5:00 PM' 
        WHEN hour(postTime) BETWEEN 16 and 17 THEN '4:00 PM - 6:00 PM' 
        WHEN hour(postTime) BETWEEN 17 and 18 THEN '5:00 PM - 7:00 PM' 
        WHEN hour(postTime) BETWEEN 18 and 19 THEN '6:00 PM - 8:00 PM' 
        WHEN hour(postTime) BETWEEN 19 and 20 THEN '7:00 PM - 9:00 PM' 
        WHEN hour(postTime) BETWEEN 20 and 21 THEN '8:00 PM - 10:00 PM' 
        WHEN hour(postTime) BETWEEN 21 and 22 THEN '9:00 PM - 11:00 PM' 
        WHEN hour(postTime) BETWEEN 22 and 23 THEN '10:00 PM - 12:00 PM' 
        WHEN hour(postTime) BETWEEN 23 and 0 THEN '11:00 PM - 12:00 AM' 
    END AS intervals 
    FROM posts 
    GROUP BY intervals
    ORDER BY numberOfPosts DESC
    `, { type: QueryTypes.SELECT })

    res.send(result)
}