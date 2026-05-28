import { Kafka, Consumer, EachMessagePayload } from "kafkajs";

export class KafkaConsumer {
  private consumer: Consumer;

  constructor(brokers: string[], groupId: string) {
    const kafka = new Kafka({ clientId: groupId, brokers });
    this.consumer = kafka.consumer({ groupId });
  }

  async connect()                        { await this.consumer.connect();                          }
  async subscribe(topic: string, fromBeginning = false) {
    await this.consumer.subscribe({ topic, fromBeginning });
  }
  async disconnect()                     { await this.consumer.disconnect();                        }

  async run(onMessage: (payload: EachMessagePayload) => Promise<void>) {
    await this.consumer.run({
      eachMessage: async (msg) => {
        const value = msg.message.value?.toString();
        try {
          const parsed = value ? JSON.parse(value) : null;
          await onMessage({ ...msg, value: parsed } as any);
        } catch (e) {
          console.error("Failed to parse Kafka message", e);
        }
      },
    });
  }
}
