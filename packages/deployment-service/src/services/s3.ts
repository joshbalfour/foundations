import { S3 } from 'aws-sdk'

export const s3Client = new S3({
  region: process.env.REGION,
})
