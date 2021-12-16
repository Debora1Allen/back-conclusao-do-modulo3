create table usuarios (
id serial primary key,
nome text not null,
nome_loja text not null,
email char(50) not null unique,
senha text not null
);

create table produtos(
id serial primary key,
 usuario_id  integer not null,
 nome text not null,
 quantidade  integer not null,
 categoria varchar(50) not null,
 preco integer not null,
 descricao text,
 imagem text,
 foreign key(usuario_id) references usuarios(id)
);