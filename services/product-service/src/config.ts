import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const PSQL_OPTION: TypeOrmModuleAsyncOptions = {
  useFactory() {
    return {
      type: 'postgres',
      url: process.env.POSTGRES_URI,
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};

export const KAFKA_OPTION: ClientProviderOptions = {
  name: 'KAFKA_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'product-service-group',
    },
  },
};
