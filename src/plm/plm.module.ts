import { Module } from '@nestjs/common';
import { PlmService } from './plm.service';
import { HttpModule } from '@nestjs/axios';
import { PlmController } from './plm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [PlmService],
  controllers: [PlmController],
})
export class PlmModule {}
