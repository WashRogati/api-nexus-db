import { Router } from 'express';

const router = Router();

router.get('/minharotaget', async (req, res) => {
  res.json({
    message: 'Hello, World!',
    res: 'sds',
  });
});

router.post('/minharotapost', async (req, res) => {
  try {
    res.json({});
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

export default router;
