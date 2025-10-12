create table "checklist_registration" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(85) NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NULL,
  "definition" JSONB NOT NULL
);
