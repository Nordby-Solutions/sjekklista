-- ============================================
-- ✅ Subscriptions
-- ============================================

create table if not exists public.subscriptions (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    plan text not null default 'free',
    status text not null default 'active' check (status in ('active', 'canceled', 'past_due')),
    current_period_end timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- ✅ Workspaces
-- ============================================

create table if not exists public.workspaces (
    id uuid primary key default gen_random_uuid(),
    subscription_id uuid not null references public.subscriptions(id) on delete cascade,
    name text not null,
    description text,
    owner_id uuid not null references auth.users(id) on delete set null,
    created_at timestamptz default now()
);

-- ============================================
-- ✅ Workspace Members
-- ============================================

create table if not exists public.workspace_members (
    workspace_id uuid references public.workspaces(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    role text not null check (role in ('owner', 'admin', 'standard')),
    invited_at timestamptz default now(),
    joined_at timestamptz,
    primary key (workspace_id, user_id)
);

-- ============================================
-- ✅ Touch trigger for updated_at
-- ============================================

create or replace function public.touch_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger trg_touch_subscription
before update on public.subscriptions
for each row execute function public.touch_updated_at();

-- ============================================
-- ✅ Checklist Templates
-- ============================================

create table if not exists public.checklist_template (
    id uuid primary key default gen_random_uuid(),
    description text null,
    version_id integer not null default 1,
    name varchar(100) not null,
    created_at timestamptz default now(),
    updated_at timestamptz default null,
    definition jsonb not null,
    workspace_id uuid not null references public.workspaces(id) on delete cascade
);

-- Enable RLS
alter table public.checklist_template enable row level security;

-- RLS Policies for Templates

-- Members can SELECT
create policy "Members can view templates"
on public.checklist_template
for select
using (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_template.workspace_id
        and wm.user_id = auth.uid()
    )
);

-- Standard, Admins, Owners can INSERT
create policy "Standard, admins, owners can insert templates"
on public.checklist_template
for insert
with check (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_template.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('standard', 'admin', 'owner')
    )
);

-- Standard, Admins, Owners can UPDATE
create policy "Standard, admins, owners can update templates"
on public.checklist_template
for update
using (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_template.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('standard', 'admin', 'owner')
    )
);

-- Admins and Owners can DELETE
create policy "Admins and owners can delete templates"
on public.checklist_template
for delete
using (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_template.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('admin', 'owner')
    )
);

-- ============================================
-- ✅ Checklist Registrations
-- ============================================

create table if not exists public.checklist_registration (
    id uuid primary key default gen_random_uuid(),
    title varchar(100) null,
    created_at timestamptz default now(),
    updated_at timestamptz default null,
    definition jsonb not null,
    workspace_id uuid not null references public.workspaces(id) on delete cascade,
    template_id uuid references public.checklist_template(id) on delete set null
);

-- Enable RLS
alter table public.checklist_registration enable row level security;

-- RLS Policies for Registrations

-- Members can SELECT
create policy "Standard can view registrations"
on public.checklist_registration
for select
using (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_registration.workspace_id
        and wm.user_id = auth.uid()
    )
);

-- Standard, Admins, Owners can INSERT
create policy "Standard, admins, owners can insert registrations"
on public.checklist_registration
for insert
with check (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_registration.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('standard', 'admin', 'owner')
    )
);

-- Standard, Admins, Owners can UPDATE
create policy "Standard, admins, owners can update registrations"
on public.checklist_registration
for update
using (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_registration.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('standard', 'admin', 'owner')
    )
);

-- Admins and Owners can DELETE
create policy "Admins and owners can delete registrations"
on public.checklist_registration
for delete
using (
    exists (
        select 1 from public.workspace_members wm
        where wm.workspace_id = checklist_registration.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('admin', 'owner')
    )
);
