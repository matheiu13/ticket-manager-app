"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import createSupabaseServerClient from "@/utils/supabase/server";

export async function login(formData: FormData) {
  console.log(formData);

  const supabase = createSupabaseServerClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function signup(formData: FormData) {
  console.log(formData);
  const supabase = createSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getUser();
}
