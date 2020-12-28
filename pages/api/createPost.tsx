import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('incoming request:', req);
  return res.json({ something: 'here' });
};
