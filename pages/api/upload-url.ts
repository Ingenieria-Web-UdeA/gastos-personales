import { NextApiRequest, NextApiResponse } from 'next/types';
import { s3 } from '@config/aws';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { filename, bucket } = req.query;

    const presignedPost = await s3.createPresignedPost({
      Bucket: bucket as string,
      Fields: {
        key: filename,
      },
      Expires: 60,
    });
    const finalURL = `https://${bucket}.s3.amazonaws.com/${presignedPost.fields.key}`;

    return res.status(200).json({ data: { presignedPost, finalURL } });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
