const allData = [];
const amqp = require('amqplib');
const express = require('express');
const app = express();

async function consumeMessages(){
const conn = await amqp.connect('amqp://localhost')
const channel = await conn.createChannel()

await channel.assertExchange('logExchange', 'fanout')

const q = await channel.assertQueue("MakananQueue")

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
  }
  catch (error) {
    res.status(500).send({ status: "error", message: error.message });
    console.log("Your Data Has Been Added! Check Via Postman");
  };
});

app.listen(3001, () => {
    console.log("Server Started on port 3001");
});

