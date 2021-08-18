import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  TreeParent,
  Tree,
} from 'typeorm'
import {
  PipelineRunnerModelInterface,
  DeploymentStatus,
  AppTypeEnum,
  PipelineModelInterface,
  PackageManagerEnum,
  TaskModelInterface,
  TaskRunnerFunctions,
} from '@reapit/foundations-ts-definitions'
import { Type } from 'class-transformer'

abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @CreateDateColumn()
  created?: string

  @UpdateDateColumn()
  modified?: string
}

@Entity('pipeline_runners')
export class PipelineRunnerEntity extends AbstractEntity implements PipelineRunnerModelInterface {
  @Column({ default: DeploymentStatus.PENDING, type: 'varchar' })
  buildStatus?: DeploymentStatus

  @Column({
    nullable: true,
  })
  S3Location?: string

  @OneToMany(() => TaskEntity, (task) => task.pipelineRunner, {
    eager: true,
  })
  tasks?: TaskEntity[]

  @Type(() => PipelineEntity)
  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.runners, {
    cascade: false,
  })
  pipeline?: PipelineEntity
}

@Entity('pipelines')
export class PipelineEntity extends AbstractEntity implements PipelineModelInterface {
  @Column()
  name?: string

  @Column({
    default: AppTypeEnum.REACT,
    type: 'varchar',
  })
  appType?: AppTypeEnum

  @Column()
  buildCommand?: string = 'build'

  @Column({
    default: PackageManagerEnum.NPM,
    type: 'varchar',
  })
  packageManager?: PackageManagerEnum

  @Column()
  repository?: string

  @OneToMany(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.pipeline)
  runners?: PipelineRunnerEntity[]

  @Column()
  developerId?: string

  @Column()
  outDir?: string = 'build'

  @Column()
  clientId?: string

  get uniqueRepoName(): string {
    return `${this.developerId}/${this.repository?.split('/').pop()}`
  }
}

@Entity('tasks')
@Tree('adjacency-list')
export class TaskEntity extends AbstractEntity implements TaskModelInterface {
  @ManyToOne(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.tasks)
  pipelineRunner?: PipelineRunnerEntity

  @Column({
    type: 'varchar',
  })
  functionName?: TaskRunnerFunctions

  @TreeParent()
  parent?: TaskEntity

  @Column({ default: DeploymentStatus.PENDING, type: 'varchar' })
  status?: DeploymentStatus
}

@Entity('releases')
export class ReleaseEntity extends AbstractEntity {
  @Column()
  zipLocation?: string

  @Column()
  version?: string

  @Column()
  currentlyDeployed?: boolean

  @Column()
  projectName?: string

  @Column()
  developerId?: string
}
