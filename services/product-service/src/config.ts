import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

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
