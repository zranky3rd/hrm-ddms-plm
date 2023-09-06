import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  constructor(project?: Partial<Project>) {
    Object.assign(this, project);
  }

  @PrimaryColumn({ length: 18 })
  id: string;
  @Column({ length: 50 })
  @Index()
  projectCode: string;
  @Column({ length: 500 })
  @Index()
  projectName: string;
  @Column({ length: 10 })
  projectState: string;
  @Column({ length: 10 })
  projectType: string;
  @Column({ length: 50 })
  @Index()
  prodGroupCode: string;
  @Column({ length: 50 })
  @Index()
  prodCode: string;
  @Column({ length: 10 })
  devType: string;
  @Column({ length: 20 })
  devPlNameKo: string;
  @Column({ length: 20 })
  devPlNameEn: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
