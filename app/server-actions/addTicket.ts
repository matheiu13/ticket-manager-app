"use server";
import createSupabaseServerClient from "@/utils/supabase/server";
import { TicketValues } from "../components/AddTicket/AddTicket";
import { revalidatePath } from "next/cache";

export async function addTicket(formData: TicketValues) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.log("User is not authenticated to delete a form.");
    return;
  }

  const { data, error } = await supabase.from("tickets").insert({
    ticket_name: formData.ticketName,
    ticket_description: formData.ticketDescription,
  });
  if (error) {
    console.error("Error inserting data: ", error);
  }
  revalidatePath("/home");

  return { message: "Success" };
}
