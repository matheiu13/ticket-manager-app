"use server";

import createSupabaseServerClient from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function deleteForm(formData: any) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.log("User is not authenticated to delete a form.");
    return;
  }

  const { data, error } = await supabase.from("ticket").delete().eq("ticket_id", formData.ticketID);

  if (error) {
    console.error("Error deleting data: ", error);
    return;
  }

  revalidatePath("/home");

  return { message: "Success" };
}
