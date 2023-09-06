import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlmService {
  private readonly logger = new Logger(PlmService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async getPlmProjects() {
    this.logger.log('run, getPlmProjects()');
    try {
      const { data } = await this.fetchProjects();
      this.logger.debug(data.length);
      this.save(data);
    } catch (err) {
      this.logger.error(err);
    }
  }

  fetchProjects() {
    this.logger.log('Hit, fetchPorjects()');
    return firstValueFrom(
      this.httpService
        .get<Project[]>(`${process.env.URL}`, {
          headers: {},
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }

  save(projects: Project[]) {
    this.logger.log('Hit, saveProjects()');
    this.repository.save(projects);
  }

  getAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 50,
    });
  }
}
