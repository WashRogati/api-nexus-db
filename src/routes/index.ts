import { Router } from 'express';
import dbInstance, { Database } from '../db/database';
import { TABLES } from '../db/config';
import SimpleJWT from '../jwt';

const router = Router();

router.get('/listarProfissionais', async (req, res) => {
  try {
    const profissionais = await dbInstance.query(
      `SELECT * FROM ${TABLES.profissionais};`,
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

router.post('/salvarprofissional', async (req, res) => {
  try {
    /*     const { name, age, last_name } = req.body; */
    await dbInstance.insertOne(TABLES.profissionais, req.body);
    res.json({ message: 'Registro inserido' });
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/salvarresponsavel', async (req, res) => {
  try {
    /*     const { name, age, last_name } = req.body; */
    await dbInstance.insertOne(TABLES.responsaveis, req.body);
    res.json({ message: 'Registro inserido' });
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/salvarPortador', async (req, res) => {
  try {
    const jwt = new SimpleJWT();
    const { access_token } = req.headers;

    if (typeof access_token == 'string') {
      const decoded = jwt.getPayload(access_token);
      console.log('decoded: ', decoded.payload);

      const data = { fk_cd_responsavel: decoded.payload?.id, ...req.body };
      await dbInstance.insertOne(TABLES.portadores, data);
      res.json({ message: 'Registro inserido' });
    } else {
      return res.status(400).json({ message: 'Token Inválido' });
    }
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/salvarConexao', async (req, res) => {
  try {
    const formatDate = (date: any) => {
      let d = new Date(date),
        month = '' + (d.getUTCMonth() + 1), // getUTCMonth() retorna um mês de 0-11
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

      // Adiciona um 0 à frente se o mês ou o dia for menor que 10
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    const currentDate = formatDate(new Date()); // Usa a função com a data atual

    const jwt = new SimpleJWT();
    const { access_token } = req.headers;

    if (typeof access_token == 'string') {
      const decoded = jwt.getPayload(access_token);
      console.log('decoded: ', decoded.payload);

      const data = {
        fk_cd_responsavel: decoded.payload?.id,
        dt_conexao: currentDate,
        ...req.body,
      };
      await dbInstance.insertOne(TABLES.conexoes, data);
      res.json({ message: 'Registro inserido' });
    } else {
      return res.status(400).json({ message: 'Token Inválido' });
    }
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/salvarAgendamento', async (req, res) => {
  try {
    const formatDate = (date: any) => {
      let d = new Date(date),
        month = '' + (d.getUTCMonth() + 1), // getUTCMonth() retorna um mês de 0-11
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

      // Adiciona um 0 à frente se o mês ou o dia for menor que 10
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    const currentDate = formatDate(new Date()); // Usa a função com a data atual

    const jwt = new SimpleJWT();
    const { access_token } = req.headers;

    if (typeof access_token == 'string') {
      const decoded = jwt.getPayload(access_token);
      console.log('decoded: ', decoded.payload);

      const portador = await dbInstance.query(
        `select cd_portadorTEA from ${TABLES.portadores} where fk_cd_responsavel = ${decoded.payload?.id};`,
      );

      if (portador[0].length > 0) {
        const data = {
          fk_cd_responsavel: decoded.payload?.id,
          fk_cd_portadorTEA: portador[0][0].cd_portadorTEA,
          st_agendamento: 'pendente',
          ...req.body,
        };
        await dbInstance.insertOne(TABLES.agendamentos, data);
        res.json({ message: 'Registro inserido' });
      } else {
        return res.status(400).json({ message: 'Portador não encontrado' });
      }
    } else {
      return res.status(400).json({ message: 'Token Inválido' });
    }
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/loginProfissional', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const profissionais = await dbInstance.query(
      `SELECT nm_profissional FROM ${TABLES.profissionais} where nm_email = '${email}' and nm_senha = '${senha}';`,
    );

    console.log('profissional: ', profissionais[0][0]);
    if (profissionais[0].length > 0) {
      const jwtHelper = new SimpleJWT();

      const token = jwtHelper.createJWT({
        type: 'profissional',
        nome: profissionais[0][0].nm_profissional,
      });

      res.json({ message: 'logado', access_token: token });
    } else {
      res.status(401).json({ message: 'email ou senha inválidos' });
    }
  } catch (e: any) {
    console.log('err: ', e.message);
  }
});

router.post('/loginResponsavel', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const responsaveis = await dbInstance.query(
      `SELECT nm_responsavel, cd_responsavel FROM ${TABLES.responsaveis} where nm_email = '${email}' and nm_senha = '${senha}';`,
    );

    console.log('responsavel: ', responsaveis[0]);
    if (responsaveis[0].length > 0) {
      const jwtHelper = new SimpleJWT();

      const token = jwtHelper.createJWT({
        type: 'responsavel',
        nome: responsaveis[0][0].nm_responsavel,
        id: responsaveis[0][0].cd_responsavel,
      });

      res.json({ message: 'logado', access_token: token });
    } else {
      res.status(401).json({ message: 'email ou senha inválidos' });
    }
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
