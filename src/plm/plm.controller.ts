import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsFilter } from './input/param.plm';
import { PlmService } from './plm.service';

@Controller('plm')
export class PlmController {
  private readonly logger = new Logger(PlmController.name);
  constructor(private readonly service: PlmService) {}

  @Get('projects')
  @UseInterceptors(ClassSerializerInterceptor)
  read(@Query() params: ProjectsFilter) {
    this.logger.debug([params]);
    if (Object.keys(params).length === 0)
      return this.service.getOrderByCreatedAt();

    return this.service.getWithParams(params);
  }

  @Get('projects/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  readWithId(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get('fake-projects')
  getFakeProjects() {
    this.logger.log('Hit, getProjects()');
    return [
      {
        id: 'id' + Math.floor(Math.random() * 1000000),
        projectCode: 'prCode' + Math.floor(Math.random() * 1000000000),
        projectName: 'projectUpdate',
        projectState: 'state',
        projectType: 'type',
        prodGroupCode: 'group',
        prodCode: 'prod' + Math.floor(Math.random() * 10),
        devType: 'devtype',
        devPlNameKo: '한국어',
        devPlNameEn: 'english',
        summary: 'dummy',
        devPlId: 'devPlId',
        etc: 'etc',
      },
    ];
  }

  @Get('directly')
  async getDirectly() {
    this.logger.log('Hit, getDirectly()');
    try {
      const { data } = await this.service.fetchProjects();
      this.logger.debug(`data.length: ${data.length}`);
      this.service.save(data);
      return {
        message: `data.length: ${data.length}`,
      };
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }
}
