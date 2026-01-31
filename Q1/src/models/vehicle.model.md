create table vehicles(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  registration_number text not null unique,
  allowed_passengers integer not null check(allowed_passengers>0),
  isAvailable boolean default true,
  driver_id uuid references userrs(id) on delete set null,
  rate_per_km numeric(10,2) not null check(rate_per_km>0),
  owner_id uuid not null references userrs(id) on delete cascade,
  created_at timestamp default now()
)