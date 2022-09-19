import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1',
  signatureVersion: 'v4',
});

const s3 = new aws.S3();

export { s3 };
