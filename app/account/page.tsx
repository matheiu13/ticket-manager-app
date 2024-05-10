import AccountForm from "./AccountForm";
import createSupabaseServerClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { readUserSession } from "../(auth)/actions";
export default async function Account() {
  const { data } = await readUserSession();
  if (!data.user) {
    return redirect("/login?message=You must be logged in to do that.");
  }
  // if (!user) {
  //   redirect("/login?message=You must be logged in to do that.");
  // }

  return <AccountForm user={data.user} />;
}
