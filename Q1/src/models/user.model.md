create table userrs(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  password text not null,
  role text not null check(role in('customer','owner','driver')),
  created_at timestamp default now()
)
