const express = require("express");
const postRoutes = require('./app/routes/post.routes')
const PORT = process.env.PORT || 8080;
const app = express();

app.use(postRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
