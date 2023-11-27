### Salvar Portador

```curl

curl --location 'http://localhost:8000/salvarPortador' \
--header 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVzcG9uc2F2ZWwiLCJub21lIjoibHVjYXMiLCJpZCI6MSwiaWF0IjoxNzAxMDQzMzAwLCJleHAiOjE3MTgzMjMzMDB9.jvrblc28K-HNU1GPNLROU0PuNcas-9iYNmMbBrK6BKY' \
--header 'Content-Type: application/json' \
--data '{
    "nm_portador":  "Miguel",
    "dt_nascimento": "2000-08-08",
    "nm_escola": "Escola teste",
    "hr_escola": "12:00:00",
    "ds_medicacoes": "Medicações ...",
    "ds_diagnostico":"Diagnóstico com sindrome ...",
    "ds_historico": "Histórico teste"
}'
```

### Login Responsável

```curl

curl --location 'http://localhost:8000/loginResponsavel' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "lucas@gmail.com",
    "senha": "321321"
}'
```

Response:

```json
{
  "message": "logado",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVzcG9uc2F2ZWwiLCJub21lIjoibHVjYXMiLCJpZCI6MSwiaWF0IjoxNzAxMDQzMzAwLCJleHAiOjE3MTgzMjMzMDB9.jvrblc28K-HNU1GPNLROU0PuNcas-9iYNmMbBrK6BKY"
}
```

### Listar Profissionais

```curl

curl --location 'http://localhost:8000/listarProfissionais'

```

Response

```json
{
  "data": [
    {
      "cd_profissional": 1,
      "nm_profissional": "mateus",
      "nm_email": "mateus@gmail.com",
      "nm_senha": "123123",
      "nr_telefone": "123123",
      "dt_nascimento": "2002-09-09T03:00:00.000Z",
      "nr_cpf": "123123",
      "nr_rg": "123123",
      "sg_genero": "M",
      "nr_cep": "111000",
      "nm_rua": "rua teste",
      "nm_bairro": "bairro teste",
      "sg_uf": "SP",
      "nm_cidade": "cidade teste",
      "nr_registro_profissional": "123",
      "nm_formacao_academica": "asduashdiouash",
      "nm_instituicao_ensino": "aosdiuhasiu",
      "dt_conclusao": "2002-09-09T03:00:00.000Z",
      "ds_experiencia": "asdasd"
    }
  ]
}
```
