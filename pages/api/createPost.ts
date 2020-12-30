import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  console.log('incoming request:', req);
  return res.json({ something: 'here' });
};
