"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TicketValues } from "../ticket/[id]/EditTicket";

export async function updateTicket(formData: TicketValues) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
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
