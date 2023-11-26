import { Router } from 'express';
import dbInstance, { Database } from '../db/database';

const router = Router();

router.get('/minharotaget', async (req, res) => {
  const profissionais = await dbInstance.query('SELECT * FROM profissionais;');
  res.json({
    data: profissionais[0],
  });
});

router.post('/minharotapost', async (req, res) => {
  try {
    const { name } = req.body;
    await dbInstance.insertOne('profissionais', { name: name });
    res.json({ message: 'Registro inserido' });
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

export default router;
