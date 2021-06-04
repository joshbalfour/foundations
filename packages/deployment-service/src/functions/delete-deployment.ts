import { httpHandler, NotFoundException, HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as service from '@/services/deployment'
import { ownership } from '@/utils'
import { resolveDeveloperId } from '@/utils/resolve-developer-id'
/**
 * Delete a deployment
 */
export const deleteDeployment = httpHandler({
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
    const developerId = await resolveDeveloperId(event)

    const deployment = await service.getByKey(event.pathParameters?.id as string)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, developerId)

    await service.deleteDeploymentModel(deployment)
  },
})
