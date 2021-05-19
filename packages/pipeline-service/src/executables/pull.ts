import { PipelineModel, TaskModel } from '@/models'
import { ExecutableType } from './executable'

export const pull: ExecutableType = (task: TaskModel, pipeline: PipelineModel): Promise<boolean> => {
  console.log('executable', task, pipeline)

  return Promise.resolve(true)
}
