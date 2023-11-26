import { Router } from 'express';
import dbInstance, { Database } from '../db/database';

const router = Router();

router.get('/minharotaget', async (req, res) => {
  try {
    const profissionais = await dbInstance.query(
      'SELECT * FROM profissional;',
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
    await dbInstance.insertOne('profissional', {
      name: name,
      age: age,
      last_name: last_name,
    });
    res.json({ message: 'Registro inserido' });
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/salvarprofissional', async (req, res) => {
  try {
/*     const { name, age, last_name } = req.body; */
    await dbInstance.insertOne('profissional', req.body);
    res.json({ message: 'Registro inserido' });
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

/**
 * const profissional = {
        nm_profissional: "João",
        nm_email: "joao@gmail.com",
        nm_senha : "11232131",
        nr_telefone : "11234512349",
        dt_nascimento : "2005-02-02",
        nr_cpf: "123958302934",
        nm_documento: "RG",
        nr_documento: "19203485968",
        id_genero: 2,
        nr_cep: "11740000",
        nm_rua : "Rua thais",
        nm_bairro : "Vila Loty",
        nm_estado : "SP",
        nm_cidade : "Itanhaém",
        nr_registro_profissional : "12312331",
        nm_formacao_academica : "Psicologia",
        nm_instituicao_ensino : "Unisanta",
        dt_conclusao: "2023-12-23",
        ds_experiencia : "Faço psicologia"
    }
     */

export default router;
