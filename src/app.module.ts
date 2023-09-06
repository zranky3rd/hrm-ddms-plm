import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlmModule } from './plm/plm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    ScheduleModule.forRoot(),
    PlmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
