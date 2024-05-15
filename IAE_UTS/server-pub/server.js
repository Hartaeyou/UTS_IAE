const express = require('express');
const bodyParser = require('body-parser');
const Producer = require('./producer');
const producer = new Producer();

const app = express();
app.use(bodyParser.json("application/json"));

app.post("/sendLog", async (req, res, next) => {
    try {
        const requestData = req.body;
        console.log("Your Data Has Sent");
        await producer.publishMessage(req.body); // Corrected this line
        res.status(200).send({ status: "success", message: "Log sent successfully" });
    } catch (error) {
        console.error("Error in /sendLog:", error);
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.use((req, res) => {
    res.status(404).send({ status: "error", message: "Not Found" });
});

app.listen(3000, () => {
    console.log("Server Started on port 3000");
});