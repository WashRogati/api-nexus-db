import { Router } from 'express';
import dbInstance, { Database } from '../db/database';

const router = Router();

router.get('/minharotaget', async (req, res) => {
  try {
    const profissionais = await dbInstance.query(
      'SELECT * FROM profissionais;',
    );
    res.json({
      data: profissionais[0],
    });
  } catch (e: any) {
    console.log('err: ', e.message);
    res.status(400).json({
      message: 'Erro ao listar dados',
    });
  }
});

router.post('/minharotapost', async (req, res) => {
  try {
    const { name, age, last_name } = req.body;
    await dbInstance.insertOne('profissionais', {
      name: name,
      age: age,
      last_name: last_name,
    });
    res.json({ message: 'Registro inserido' });
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

export default router;
