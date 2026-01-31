create table trips(
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references userrs(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  location text not null,
  distance_km numeric(10,2) not null check(distance_km>0),
  passengers integer not null check(passengers>0),
  tripCost numeric(10,2),
  isCompleted boolean default false,
  created_at timestamp default now()
)