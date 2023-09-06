import { Controller, Get, Logger } from '@nestjs/common';
import { PlmService } from './plm.service';

@Controller('plm')
export class PlmController {
  private readonly logger = new Logger(PlmController.name);
  constructor(private readonly service: PlmService) {}

  @Get('projects')
  getProjects() {
    return this.service.getAll();
  }

  @Get('fake-projects')
  getFakeProjects() {
    this.logger.log('Hit, getProjects()');
    return [
      {
        id: 'id',
        projectCode: 'projectCode',
        projectName: 'projectName',
        projectState: 'state2sf',
        projectType: 'type',
        prodGroupCode: 'group',
        prodCode: 'prod',
        devType: 'devtype',
        devPlNameKo: '한국어',
        devPlNameEn: 'english',
        summary: 'dummy',
        devPlId: 'devPlId',
        etc: 'etc',
      },
      {
        id: 'id' + Math.floor(Math.random() * 1000000),
        projectCode: 'projectCode',
        projectName: 'projectUpdate',
        projectState: 'state',
        projectType: 'type',
        prodGroupCode: 'group',
        prodCode: 'prod',
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
      return this.service.save(data);
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }
}
