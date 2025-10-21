// tests/helpers/testUser.ts

import { supabase } from "../lib/supabase";

export interface TestUser {
  id: string;
  email: string;
  token: string;
}

const TEST_USER_EMAIL = "test@example.com";
const TEST_USER_PASSWORD = "test1234.!";

export async function createTestUser(): Promise<TestUser> {
  // 1️⃣ Try to find an existing user
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  let user = existingUsers?.users?.find((u) => u.email === TEST_USER_EMAIL);

  // 2️⃣ Create if not found
  if (!user) {
    const { data: newUser } = await supabase.auth.admin.createUser({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
      email_confirm: true,
    });
    user = newUser.user!;
  }

  // 3️⃣ Sign in to get access token
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  });

  if (error || !session) {
    throw new Error(`Failed to sign in test user: ${error?.message}`);
  }

  return {
    id: user.id,
    email: user.email!,
    token: session.access_token!,
  };
}

export async function deleteTestUser(userId: string) {
  await supabase.auth.admin.deleteUser(userId);
}
