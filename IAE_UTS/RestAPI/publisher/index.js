const express = require('express');
const app = express();
const postsRouter = require('./routes/post.router')

require('dotenv').config()
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/api/v1/posts" , postsRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});