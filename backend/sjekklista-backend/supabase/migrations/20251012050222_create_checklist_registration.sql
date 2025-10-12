create table "public"."checklist_registration" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(85) not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "definition" jsonb not null
);


CREATE UNIQUE INDEX checklist_registration_pkey ON public.checklist_registration USING btree (id);

alter table "public"."checklist_registration" add constraint "checklist_registration_pkey" PRIMARY KEY using index "checklist_registration_pkey";

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


