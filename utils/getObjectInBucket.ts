import { s3 } from '@config/aws';

export const getObjectInBucket = async (
  Bucket: string,
  path: string,
  responseType = 'binary/octet-stream'
) => {
  const bucketParams = {
    Bucket,
    Key: decodeURIComponent(path),
    ResponseContentType: responseType,
    Expires: 60 * 60 * 48, // 2 days,
  };

  return s3.getSignedUrl('getObject', bucketParams);
};
