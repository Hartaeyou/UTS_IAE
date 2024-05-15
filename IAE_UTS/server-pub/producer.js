
const amqp = require('amqplib');
const config = require('./config');

class Producer {
    constructor() {
        this.channel = null;
    }

    async createChannel() {
        const conn = await amqp.connect(config.rabbitMQ.url);
        this.channel = await conn.createChannel();
    }

    async publishMessage(message) {
        if (!this.channel) {
            await this.createChannel();
        }
        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, 'fanout', { durable: true });

        const content = {
            message: message,
            dateTime: new Date()
        };

        await this.channel.publish(exchangeName, '', Buffer.from(JSON.stringify(content)));
        // console.log(`Message sent: ${JSON.stringify(content)}`);
    }
}

module.exports = Producer;
