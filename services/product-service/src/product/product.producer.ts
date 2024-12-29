import { Inject } from '@nestjs/common/decorators';
import { ClientKafka } from '@nestjs/microservices';

export class ProductProducer {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  emit(event: string, data: any): void {
    this.kafkaClient.emit(event, JSON.stringify(data));
    console.log(`Event ${event} emitted with data: ${JSON.stringify(data)}`);
  }
}
