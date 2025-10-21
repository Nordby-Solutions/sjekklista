create table "public"."checklist_registration" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(100),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "definition" jsonb not null,
    "workspace_id" uuid not null,
    "template_id" uuid
);


alter table "public"."checklist_registration" enable row level security;

create table "public"."checklist_template" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(100) not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "definition" jsonb not null,
    "workspace_id" uuid not null
);


alter table "public"."checklist_template" enable row level security;

create table "public"."subscriptions" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid not null,
    "plan" text not null default 'free'::text,
    "status" text not null default 'active'::text,
    "current_period_end" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."workspace_members" (
    "workspace_id" uuid not null,
    "user_id" uuid not null,
    "role" text not null,
    "invited_at" timestamp with time zone default now(),
    "joined_at" timestamp with time zone
);


create table "public"."workspaces" (
    "id" uuid not null default gen_random_uuid(),
    "subscription_id" uuid not null,
    "name" text not null,
    "description" text,
    "owner_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


CREATE UNIQUE INDEX checklist_registration_pkey ON public.checklist_registration USING btree (id);

CREATE UNIQUE INDEX checklist_template_pkey ON public.checklist_template USING btree (id);

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (id);

CREATE UNIQUE INDEX workspace_members_pkey ON public.workspace_members USING btree (workspace_id, user_id);

CREATE UNIQUE INDEX workspaces_pkey ON public.workspaces USING btree (id);

alter table "public"."checklist_registration" add constraint "checklist_registration_pkey" PRIMARY KEY using index "checklist_registration_pkey";

alter table "public"."checklist_template" add constraint "checklist_template_pkey" PRIMARY KEY using index "checklist_template_pkey";

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";

alter table "public"."workspace_members" add constraint "workspace_members_pkey" PRIMARY KEY using index "workspace_members_pkey";

alter table "public"."workspaces" add constraint "workspaces_pkey" PRIMARY KEY using index "workspaces_pkey";

alter table "public"."checklist_registration" add constraint "checklist_registration_template_id_fkey" FOREIGN KEY (template_id) REFERENCES checklist_template(id) ON DELETE SET NULL not valid;

alter table "public"."checklist_registration" validate constraint "checklist_registration_template_id_fkey";

alter table "public"."checklist_registration" add constraint "checklist_registration_workspace_id_fkey" FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE not valid;

alter table "public"."checklist_registration" validate constraint "checklist_registration_workspace_id_fkey";

alter table "public"."checklist_template" add constraint "checklist_template_workspace_id_fkey" FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE not valid;

alter table "public"."checklist_template" validate constraint "checklist_template_workspace_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_owner_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'canceled'::text, 'past_due'::text]))) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_status_check";

alter table "public"."workspace_members" add constraint "workspace_members_role_check" CHECK ((role = ANY (ARRAY['owner'::text, 'admin'::text, 'standard'::text]))) not valid;

alter table "public"."workspace_members" validate constraint "workspace_members_role_check";

alter table "public"."workspace_members" add constraint "workspace_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."workspace_members" validate constraint "workspace_members_user_id_fkey";

alter table "public"."workspace_members" add constraint "workspace_members_workspace_id_fkey" FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE not valid;

alter table "public"."workspace_members" validate constraint "workspace_members_workspace_id_fkey";

alter table "public"."workspaces" add constraint "workspaces_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."workspaces" validate constraint "workspaces_owner_id_fkey";

alter table "public"."workspaces" add constraint "workspaces_subscription_id_fkey" FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE not valid;

alter table "public"."workspaces" validate constraint "workspaces_subscription_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
    new.updated_at = now();
    return new;
end;
$function$
;

grant delete on table "public"."checklist_registration" to "anon";

grant insert on table "public"."checklist_registration" to "anon";

grant references on table "public"."checklist_registration" to "anon";

grant select on table "public"."checklist_registration" to "anon";

grant trigger on table "public"."checklist_registration" to "anon";

grant truncate on table "public"."checklist_registration" to "anon";

grant update on table "public"."checklist_registration" to "anon";

grant delete on table "public"."checklist_registration" to "authenticated";

grant insert on table "public"."checklist_registration" to "authenticated";

grant references on table "public"."checklist_registration" to "authenticated";

grant select on table "public"."checklist_registration" to "authenticated";

grant trigger on table "public"."checklist_registration" to "authenticated";

grant truncate on table "public"."checklist_registration" to "authenticated";

grant update on table "public"."checklist_registration" to "authenticated";

grant delete on table "public"."checklist_registration" to "service_role";

grant insert on table "public"."checklist_registration" to "service_role";

grant references on table "public"."checklist_registration" to "service_role";

grant select on table "public"."checklist_registration" to "service_role";

grant trigger on table "public"."checklist_registration" to "service_role";

grant truncate on table "public"."checklist_registration" to "service_role";

grant update on table "public"."checklist_registration" to "service_role";

grant delete on table "public"."checklist_template" to "anon";

grant insert on table "public"."checklist_template" to "anon";

grant references on table "public"."checklist_template" to "anon";

grant select on table "public"."checklist_template" to "anon";

grant trigger on table "public"."checklist_template" to "anon";

grant truncate on table "public"."checklist_template" to "anon";

grant update on table "public"."checklist_template" to "anon";

grant delete on table "public"."checklist_template" to "authenticated";

grant insert on table "public"."checklist_template" to "authenticated";

grant references on table "public"."checklist_template" to "authenticated";

grant select on table "public"."checklist_template" to "authenticated";

grant trigger on table "public"."checklist_template" to "authenticated";

grant truncate on table "public"."checklist_template" to "authenticated";

grant update on table "public"."checklist_template" to "authenticated";

grant delete on table "public"."checklist_template" to "service_role";

grant insert on table "public"."checklist_template" to "service_role";

grant references on table "public"."checklist_template" to "service_role";

grant select on table "public"."checklist_template" to "service_role";

grant trigger on table "public"."checklist_template" to "service_role";

grant truncate on table "public"."checklist_template" to "service_role";

grant update on table "public"."checklist_template" to "service_role";

grant delete on table "public"."subscriptions" to "anon";

grant insert on table "public"."subscriptions" to "anon";

grant references on table "public"."subscriptions" to "anon";

grant select on table "public"."subscriptions" to "anon";

grant trigger on table "public"."subscriptions" to "anon";

grant truncate on table "public"."subscriptions" to "anon";

grant update on table "public"."subscriptions" to "anon";

grant delete on table "public"."subscriptions" to "authenticated";

grant insert on table "public"."subscriptions" to "authenticated";

grant references on table "public"."subscriptions" to "authenticated";

grant select on table "public"."subscriptions" to "authenticated";

grant trigger on table "public"."subscriptions" to "authenticated";

grant truncate on table "public"."subscriptions" to "authenticated";

grant update on table "public"."subscriptions" to "authenticated";

grant delete on table "public"."subscriptions" to "service_role";

grant insert on table "public"."subscriptions" to "service_role";

grant references on table "public"."subscriptions" to "service_role";

grant select on table "public"."subscriptions" to "service_role";

grant trigger on table "public"."subscriptions" to "service_role";

grant truncate on table "public"."subscriptions" to "service_role";

grant update on table "public"."subscriptions" to "service_role";

grant delete on table "public"."workspace_members" to "anon";

grant insert on table "public"."workspace_members" to "anon";

grant references on table "public"."workspace_members" to "anon";

grant select on table "public"."workspace_members" to "anon";

grant trigger on table "public"."workspace_members" to "anon";

grant truncate on table "public"."workspace_members" to "anon";

grant update on table "public"."workspace_members" to "anon";

grant delete on table "public"."workspace_members" to "authenticated";

grant insert on table "public"."workspace_members" to "authenticated";

grant references on table "public"."workspace_members" to "authenticated";

grant select on table "public"."workspace_members" to "authenticated";

grant trigger on table "public"."workspace_members" to "authenticated";

grant truncate on table "public"."workspace_members" to "authenticated";

grant update on table "public"."workspace_members" to "authenticated";

grant delete on table "public"."workspace_members" to "service_role";

grant insert on table "public"."workspace_members" to "service_role";

grant references on table "public"."workspace_members" to "service_role";

grant select on table "public"."workspace_members" to "service_role";

grant trigger on table "public"."workspace_members" to "service_role";

grant truncate on table "public"."workspace_members" to "service_role";

grant update on table "public"."workspace_members" to "service_role";

grant delete on table "public"."workspaces" to "anon";

grant insert on table "public"."workspaces" to "anon";

grant references on table "public"."workspaces" to "anon";

grant select on table "public"."workspaces" to "anon";

grant trigger on table "public"."workspaces" to "anon";

grant truncate on table "public"."workspaces" to "anon";

grant update on table "public"."workspaces" to "anon";

grant delete on table "public"."workspaces" to "authenticated";

grant insert on table "public"."workspaces" to "authenticated";

grant references on table "public"."workspaces" to "authenticated";

grant select on table "public"."workspaces" to "authenticated";

grant trigger on table "public"."workspaces" to "authenticated";

grant truncate on table "public"."workspaces" to "authenticated";

grant update on table "public"."workspaces" to "authenticated";

grant delete on table "public"."workspaces" to "service_role";

grant insert on table "public"."workspaces" to "service_role";

grant references on table "public"."workspaces" to "service_role";

grant select on table "public"."workspaces" to "service_role";

grant trigger on table "public"."workspaces" to "service_role";

grant truncate on table "public"."workspaces" to "service_role";

grant update on table "public"."workspaces" to "service_role";

create policy "Admins and owners can delete registrations"
on "public"."checklist_registration"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_registration.workspace_id) AND (wm.user_id = auth.uid()) AND (wm.role = ANY (ARRAY['admin'::text, 'owner'::text]))))));


create policy "Standard can view registrations"
on "public"."checklist_registration"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_registration.workspace_id) AND (wm.user_id = auth.uid())))));


create policy "Standard, admins, owners can insert registrations"
on "public"."checklist_registration"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_registration.workspace_id) AND (wm.user_id = auth.uid()) AND (wm.role = ANY (ARRAY['standard'::text, 'admin'::text, 'owner'::text]))))));


create policy "Standard, admins, owners can update registrations"
on "public"."checklist_registration"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_registration.workspace_id) AND (wm.user_id = auth.uid()) AND (wm.role = ANY (ARRAY['standard'::text, 'admin'::text, 'owner'::text]))))));


create policy "Admins and owners can delete templates"
on "public"."checklist_template"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_template.workspace_id) AND (wm.user_id = auth.uid()) AND (wm.role = ANY (ARRAY['admin'::text, 'owner'::text]))))));


create policy "Members can view templates"
on "public"."checklist_template"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_template.workspace_id) AND (wm.user_id = auth.uid())))));


create policy "Standard, admins, owners can insert templates"
on "public"."checklist_template"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_template.workspace_id) AND (wm.user_id = auth.uid()) AND (wm.role = ANY (ARRAY['standard'::text, 'admin'::text, 'owner'::text]))))));


create policy "Standard, admins, owners can update templates"
on "public"."checklist_template"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM workspace_members wm
  WHERE ((wm.workspace_id = checklist_template.workspace_id) AND (wm.user_id = auth.uid()) AND (wm.role = ANY (ARRAY['standard'::text, 'admin'::text, 'owner'::text]))))));


CREATE TRIGGER trg_touch_subscription BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION touch_updated_at();


