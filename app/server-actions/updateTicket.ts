"use server";

import { revalidatePath } from "next/cache";
import { TicketValues } from "../ticket/[id]/EditTicket";
import createSupabaseServerClient from "@/utils/supabase/server";

export async function updateTicket(formData: TicketValues) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.log("User is not authenticated to add a form.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("tickets")
      .update({
        ticket_name: formData.ticket_name,
        ticket_description: formData.ticket_description,
      })
      .eq("ticket_id", formData.ticket_id);
    if (error) {
      console.log("update failed ", error);
      
    }
  } catch (error) {
    console.log("Error updating ticket!");
  }
  revalidatePath("/ticket");
  return { message: "Success" };
}
