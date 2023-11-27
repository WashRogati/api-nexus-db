```sql

create database tcc;
use tcc;



create table profissionais(
    cd_profissional int primary key auto_increment,
    nm_profissional varchar(30) not null,
    nm_email varchar(60) not null,
    nm_senha varchar(30) not null,
    nr_telefone varchar(11) not null,
    dt_nascimento date not null,
    nr_cpf char(11) not null,
    nr_rg varchar(11) not null,
    sg_genero char(1) not null,
    nr_cep varchar(8) not null,
    nm_rua varchar(128) not null,
    nm_bairro varchar(90) not null,
    sg_uf char(12) not null,
    nm_cidade varchar(90) not null,
    nr_registro_profissional varchar(6) not null,
    nm_formacao_academica varchar(60) not null,
    nm_instituicao_ensino varchar(90) not null,
    dt_conclusao date not null,
    ds_experiencia tinytext not null
);


create table responsaveis(
    cd_responsavel int primary key auto_increment,
    nm_responsavel varchar(60) not null,
    nm_email varchar(128) not null,
    nm_senha varchar(30) not null,
    nr_telefone varchar(11) not null,
    dt_nascimento date not null,
    nr_cpf char(11) not null,
    nr_rg varchar(11) not null,
    sg_genero char(1) not null,
    nr_cep varchar(8) not null,
    nm_rua varchar(128) not null,
    nm_bairro varchar(90) not null,
    sg_uf char(12) not null,
    nm_cidade varchar(90) not null,
    id_conexao bit default false null
);



create table portadorTEA(
    cd_portadorTEA int primary key auto_increment,
    nm_portador varchar(60) not null,
    dt_nascimento date not null,
    nm_escola varchar(90),
    hr_escola time,
    ds_medicacoes varchar(100),
    ds_diagnostico tinytext,
    ds_historico tinytext,
    fk_cd_responsavel int,
    foreign key (fk_cd_responsavel) references responsaveis(cd_responsavel)
);


create table conexoes(
    cd_conexao int primary key auto_increment,
    fk_cd_profissional int,
    fk_cd_responsavel int,
    dt_conexao datetime,
    foreign key (fk_cd_responsavel) references responsaveis(cd_responsavel),
    foreign key (fk_cd_profissional) references profissionais(cd_profissional)
);

create table solicitarAgendamento(
    cd_solicitacao int primary key auto_increment,
    fk_cd_responsavel int,
    fk_cd_profissional int,
    hr_duracao time,
    dt_consulta datetime not null,
    ds_consulta tinytext not null,
    foreign key (fk_cd_responsavel) references responsaveis(cd_responsavel),
    foreign key (fk_cd_profissional) references profissionais(cd_profissional)
);


create table agendamentos(
    cd_agendamento int primary key auto_increment,
    hr_duracao time not null,
    dt_consulta datetime,
    ds_consulta tinytext not null,
    fk_cd_profissional int,
    fk_cd_responsavel int,
    fk_cd_portadorTEA int,
    st_agendamento enum('confirmado','pendente','cancelado'),
    foreign key (fk_cd_responsavel) references responsaveis(cd_responsavel),
    foreign key (fk_cd_profissional) references profissionais(cd_profissional),
    foreign key (fk_cd_portadorTEA) references portadorTEA(cd_portadorTEA)
);

create table exercicios(
    cd_exercicios int primary key auto_increment,
    nm_exercicios varchar(25) not null,
    nm_categoria varchar(15) not null,
    ds_exercicios varchar(60) not null,
    ds_instrucoes varchar(60) not null
);

CREATE TABLE emocoes (
    cd_carta INT PRIMARY KEY AUTO_INCREMENT,
    nm_emocao VARCHAR(20) NOT NULL,
    ds_emocao VARCHAR(80) NOT NULL,
    nm_categoria VARCHAR(15) NOT NULL
);
```
