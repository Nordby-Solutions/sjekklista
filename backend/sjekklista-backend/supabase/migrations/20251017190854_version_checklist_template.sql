alter table "public"."checklist_template" add column "description" text;

alter table "public"."checklist_template" add column "version_id" integer not null default 1;

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


