import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProjectsFilter } from './input/param.plm';

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

  getOrderByCreatedAt() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 50,
    });
  }

  getWithParams(filter: ProjectsFilter) {
    this.logger.log('Hit, getWithParams()');
    const prodCode = !!filter.prodCode ? filter.prodCode : '';
    const projectCode = !!filter.projectCode ? filter.projectCode : '';
    const projectName = !!filter.projectName ? filter.projectName : '';
    return this.repository.find({
      where: {
        prodCode: Like(`%${prodCode}%`),
        projectCode: Like(`%${projectCode}%`),
        projectName: Like(`%${projectName}%`),
      },
      order: {
        createdAt: 'DESC',
      },
      take: 50,
    });
  }

  getById(id: string) {
    return this.repository.findOneBy({ id });
  }
}
