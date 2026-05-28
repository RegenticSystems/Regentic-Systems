import { Kafka, Producer } from "kafkajs";

export class KafkaProducer {
  private producer: Producer;

  constructor(brokers: string[], clientId: string) {
    const kafka = new Kafka({ clientId, brokers });
    this.producer = kafka.producer();
  }

  async connect()    { await this.producer.connect();    }
  async disconnect() { await this.producer.disconnect(); }

  async send(topic: string, messages: { key?: string; value: any }[]) {
    await this.producer.send({
      topic,
      messages: messages.map((m) => ({
        key:   m.key,
        value: JSON.stringify(m.value),
      })),
    });
  }
}
