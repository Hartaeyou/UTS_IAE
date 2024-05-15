const amqp = require('amqplib');
const express = require('express');
const app = express();

const allData = [];
    async function consumeMessages(){
    const conn = await amqp.connect('amqp://localhost')
    const channel = await conn.createChannel()

    await channel.assertExchange('logExchange', 'fanout')

    const q = await channel.assertQueue("KandangQueue")

    await channel.bindQueue(q.queue, "logExchange", "")
    channel.consume(q.queue, (msg)=>{
        const data = JSON.parse(msg.content.toString());
        allData.push(data.message);
        channel.ack(msg)
    })
}
consumeMessages()

app.get("/", async (req, res) => {
    try {
        res.json(allData);
        console.log("Your Data Has Been Added! Check Via Postman");
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    };
});

app.listen(3002, () => {
    console.log("Server Started on port 3002");
});