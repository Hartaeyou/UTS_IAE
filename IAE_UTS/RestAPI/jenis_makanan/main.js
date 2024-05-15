const express = require('express');
const axios = require('axios');

const app = express();



app.get('/', async (req, res) => {
    const {data} = await axios.get(`http://localhost:3000/api/v1/posts`);

    res.json(data);
});

app.listen(3001, () => {
    console.log(`server started on port 3001`);
});