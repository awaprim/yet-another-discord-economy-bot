CREATE TABLE users (
  id text primary key,
  coins int8,
  daily int8
);
CREATE TABLE shop (
  id text primary key,
  price int8,
  run text
);