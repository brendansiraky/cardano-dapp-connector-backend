import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { KnexModule } from 'nest-knexjs';
import { POSTGRES_HOST } from 'config';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: POSTGRES_HOST,
          database: 'cardano_dapp_connector',
          user: 'postgres',
          password: 'postgres',
        },
      },
    }),
    AuthModule, 
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
